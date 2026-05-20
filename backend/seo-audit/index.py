import json
import os
import re
import socket
import ssl
import urllib.request
import urllib.error
from html.parser import HTMLParser
from urllib.parse import urlparse, urljoin


CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


class SEOParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''
        self.meta = {}
        self.headings = {'h1': [], 'h2': [], 'h3': [], 'h4': [], 'h5': [], 'h6': []}
        self.images = []
        self.links = []
        self.text_chunks = []
        self.scripts = []
        self.current_tag = None
        self.current_attrs = {}
        self.in_title = False
        self.in_body = False
        self.in_script = False
        self.in_style = False
        self._current_heading = None

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        self.current_tag = tag
        self.current_attrs = attrs_dict

        if tag == 'title':
            self.in_title = True
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self._current_heading = tag
        elif tag == 'meta':
            name = attrs_dict.get('name', '').lower()
            prop = attrs_dict.get('property', '').lower()
            content = attrs_dict.get('content', '')
            http_equiv = attrs_dict.get('http-equiv', '').lower()
            if name:
                self.meta[name] = content
            if prop:
                self.meta[prop] = content
            if http_equiv:
                self.meta[f'http-equiv:{http_equiv}'] = content
            if 'charset' in attrs_dict:
                self.meta['charset'] = attrs_dict['charset']
        elif tag == 'img':
            self.images.append({
                'src': attrs_dict.get('src', ''),
                'alt': attrs_dict.get('alt', None),
                'title': attrs_dict.get('title', ''),
            })
        elif tag == 'a':
            self.links.append({
                'href': attrs_dict.get('href', ''),
                'rel': attrs_dict.get('rel', ''),
                'text': '',
            })
        elif tag == 'script':
            self.in_script = True
            self.scripts.append(attrs_dict)
        elif tag == 'style':
            self.in_style = True
        elif tag == 'body':
            self.in_body = True
        elif tag == 'link':
            rel = attrs_dict.get('rel', '').lower()
            if 'canonical' in rel:
                self.meta['canonical'] = attrs_dict.get('href', '')

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            self._current_heading = None
        elif tag == 'script':
            self.in_script = False
        elif tag == 'style':
            self.in_style = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self._current_heading:
            self.headings[self._current_heading].append(data.strip())
        elif self.in_body and not self.in_script and not self.in_style:
            stripped = data.strip()
            if stripped:
                self.text_chunks.append(stripped)
        if self.links and not self.in_script and not self.in_style:
            if self.current_tag == 'a' or self._current_heading is None:
                pass


def fetch_url(url, timeout=10):
    headers = {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOAuditBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ru,en;q=0.5',
    }
    req = urllib.request.Request(url, headers=headers)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    response = urllib.request.urlopen(req, timeout=timeout, context=ctx)
    final_url = response.geturl()
    status_code = response.status
    resp_headers = dict(response.headers)
    html = response.read().decode('utf-8', errors='replace')
    return html, resp_headers, status_code, final_url


def check_https(parsed_url, final_url):
    issues = []
    is_https = parsed_url.scheme == 'https'
    redirects_to_https = final_url.startswith('https://')
    return {
        'https': is_https,
        'redirects_to_https': redirects_to_https,
        'issues': issues,
    }


def analyze_meta(parser, url):
    issues = []
    score = 100

    title = parser.title.strip()
    description = parser.meta.get('description', '')
    keywords = parser.meta.get('keywords', '')
    canonical = parser.meta.get('canonical', '')
    robots = parser.meta.get('robots', '')
    og_title = parser.meta.get('og:title', '')
    og_description = parser.meta.get('og:description', '')
    og_image = parser.meta.get('og:image', '')
    viewport = parser.meta.get('viewport', '')
    charset = parser.meta.get('charset', '')

    if not title:
        issues.append({'type': 'error', 'message': 'Отсутствует тег <title>'})
        score -= 20
    elif len(title) < 10:
        issues.append({'type': 'warning', 'message': f'Title слишком короткий ({len(title)} симв.)'})
        score -= 5
    elif len(title) > 70:
        issues.append({'type': 'warning', 'message': f'Title слишком длинный ({len(title)} симв., рекомендуется до 70)'})
        score -= 5

    if not description:
        issues.append({'type': 'error', 'message': 'Отсутствует meta description'})
        score -= 15
    elif len(description) < 50:
        issues.append({'type': 'warning', 'message': f'Meta description слишком короткий ({len(description)} симв.)'})
        score -= 5
    elif len(description) > 160:
        issues.append({'type': 'warning', 'message': f'Meta description слишком длинный ({len(description)} симв., рекомендуется до 160)'})
        score -= 5

    if not viewport:
        issues.append({'type': 'error', 'message': 'Отсутствует meta viewport (мобильная адаптация)'})
        score -= 10

    if not og_title:
        issues.append({'type': 'info', 'message': 'Отсутствует og:title (Open Graph для соцсетей)'})
        score -= 5
    if not og_description:
        issues.append({'type': 'info', 'message': 'Отсутствует og:description'})
        score -= 5
    if not og_image:
        issues.append({'type': 'info', 'message': 'Отсутствует og:image'})
        score -= 5

    if not charset:
        issues.append({'type': 'warning', 'message': 'Не указана кодировка (charset)'})
        score -= 5

    return {
        'score': max(0, score),
        'title': title,
        'title_length': len(title),
        'description': description,
        'description_length': len(description),
        'keywords': keywords,
        'canonical': canonical,
        'robots': robots,
        'viewport': viewport,
        'charset': charset,
        'og': {
            'title': og_title,
            'description': og_description,
            'image': og_image,
        },
        'issues': issues,
    }


def analyze_headings(parser):
    issues = []
    score = 100

    h1_list = [h for h in parser.headings['h1'] if h]
    h2_list = [h for h in parser.headings['h2'] if h]
    h3_list = [h for h in parser.headings['h3'] if h]

    if not h1_list:
        issues.append({'type': 'error', 'message': 'Отсутствует заголовок H1'})
        score -= 30
    elif len(h1_list) > 1:
        issues.append({'type': 'warning', 'message': f'Несколько H1 на странице ({len(h1_list)} шт.) — рекомендуется один'})
        score -= 10

    if not h2_list:
        issues.append({'type': 'info', 'message': 'Нет заголовков H2 — структура страницы не выстроена'})
        score -= 10

    return {
        'score': max(0, score),
        'counts': {
            'h1': len(h1_list),
            'h2': len(h2_list),
            'h3': len(h3_list),
            'h4': len([h for h in parser.headings['h4'] if h]),
            'h5': len([h for h in parser.headings['h5'] if h]),
            'h6': len([h for h in parser.headings['h6'] if h]),
        },
        'h1_texts': h1_list[:3],
        'h2_texts': h2_list[:5],
        'issues': issues,
    }


def analyze_images(parser, base_url):
    issues = []
    score = 100

    total = len(parser.images)
    without_alt = [img for img in parser.images if img['alt'] is None or img['alt'] == '']
    empty_alt = [img for img in parser.images if img['alt'] == '']

    if without_alt:
        count = len(without_alt)
        issues.append({'type': 'error', 'message': f'Без описания: {count}'})
        penalty = min(40, count * 5)
        score -= penalty

    return {
        'score': max(0, score),
        'total': total,
        'without_alt': len(without_alt),
        'issues': issues,
    }


def analyze_content(parser):
    issues = []
    score = 100

    full_text = ' '.join(parser.text_chunks)
    words = re.findall(r'\b\w+\b', full_text)
    word_count = len(words)
    sentences = re.split(r'[.!?]+', full_text)
    sentence_count = len([s for s in sentences if s.strip()])
    paragraph_count = len([c for c in parser.text_chunks if len(c) > 50])

    read_minutes = max(1, round(word_count / 200))

    word_freq = {}
    stop_words = {'и', 'в', 'на', 'с', 'по', 'для', 'не', 'это', 'как', 'то', 'а', 'но', 'к', 'от', 'из', 'о', 'у',
                  'за', 'до', 'при', 'под', 'над', 'без', 'через', 'между', 'перед', 'после', 'во', 'со', 'об',
                  'the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'is', 'are', 'was', 'be',
                  'it', 'this', 'that', 'with', 'by', 'as', 'from', 'have', 'has', 'not', 'but'}

    for word in words:
        w = word.lower()
        if len(w) > 3 and w not in stop_words:
            word_freq[w] = word_freq.get(w, 0) + 1

    top_keywords = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:10]

    if word_count < 300:
        issues.append({'type': 'error', 'message': f'Мало текста на странице (менее 300 слов)'})
        score -= 30

    text_ratio = 0
    if word_count > 0:
        text_ratio = min(100, int(word_count / 5))

    h1_count = len([h for h in parser.headings['h1'] if h])
    if h1_count == 0:
        issues.append({'type': 'error', 'message': 'Отсутствует заголовок H1'})
        score -= 20

    return {
        'score': max(0, score),
        'word_count': word_count,
        'sentence_count': sentence_count,
        'paragraph_count': paragraph_count,
        'read_minutes': read_minutes,
        'text_ratio': text_ratio,
        'keywords': [{'word': k, 'count': v} for k, v in top_keywords],
        'issues': issues,
    }


def analyze_security(resp_headers, parsed_url):
    issues = []
    score = 100

    sensitive_files = []

    hsts = resp_headers.get('Strict-Transport-Security', '')
    csp = resp_headers.get('Content-Security-Policy', '')
    x_frame = resp_headers.get('X-Frame-Options', '')
    x_content_type = resp_headers.get('X-Content-Type-Options', '')
    server = resp_headers.get('Server', '')
    cors_header = resp_headers.get('Access-Control-Allow-Origin', '')

    security_headers = {
        'hsts': bool(hsts),
        'csp': bool(csp),
        'x_frame_options': bool(x_frame),
        'x_content_type': bool(x_content_type),
    }

    if not hsts:
        issues.append({'type': 'warning', 'text': 'Добавить заголовки безопасности', 'detail': 'Начните с HSTS, CSP, X-Frame-Options и X-Content-Type-Options.', 'severity': 'Высокий', 'complexity': 'Средний'})
        score -= 15
    if not csp:
        score -= 10
    if not x_frame:
        score -= 5
    if not x_content_type:
        score -= 5

    if server:
        issues.append({'type': 'warning', 'text': 'Заголовок Server', 'detail': f'Сервер раскрывает свою версию: {server}', 'severity': 'Средний', 'complexity': 'Лёгкий'})
        score -= 5

    cors_value = cors_header if cors_header else ''

    return {
        'score': max(0, score),
        'security_headers': security_headers,
        'hsts': hsts,
        'csp': csp,
        'x_frame_options': x_frame,
        'x_content_type': x_content_type,
        'server': server,
        'cors': cors_value,
        'issues': issues,
    }


def analyze_performance(resp_headers, html):
    issues = []
    score = 100

    content_encoding = resp_headers.get('Content-Encoding', '').lower()
    cache_control = resp_headers.get('Cache-Control', '')
    etag = resp_headers.get('ETag', '')
    last_modified = resp_headers.get('Last-Modified', '')

    brotli = 'br' in content_encoding
    gzip = 'gzip' in content_encoding
    deflate = 'deflate' in content_encoding
    compression_active = brotli or gzip or deflate
    compression_method = 'br' if brotli else ('gzip' if gzip else ('deflate' if deflate else None))

    if not compression_active:
        issues.append({'type': 'error', 'message': 'Сжатие данных не включено (gzip/brotli)'})
        score -= 20

    if not cache_control:
        issues.append({'type': 'warning', 'message': 'Нет заголовка Cache-Control'})
        score -= 10

    inline_scripts = len(re.findall(r'<script(?![^>]*src)[^>]*>', html))
    inline_styles = len(re.findall(r'<style[^>]*>', html))

    if inline_scripts > 3:
        issues.append({'type': 'info', 'message': f'Много инлайн скриптов ({inline_scripts} шт.)'})
        score -= 5

    return {
        'score': max(0, score),
        'compression': {
            'active': compression_active,
            'method': compression_method,
            'brotli': brotli,
            'gzip': gzip,
            'deflate': deflate,
        },
        'caching': {
            'cache_control': cache_control,
            'etag': bool(etag),
            'last_modified': bool(last_modified),
        },
        'issues': issues,
    }


def analyze_accessibility(parser, resp_headers):
    issues = []
    score = 100

    images_without_alt = len([img for img in parser.images if img['alt'] is None or img['alt'] == ''])
    if images_without_alt > 0:
        issues.append({'type': 'error', 'message': f'Изображений без alt: {images_without_alt}'})
        score -= min(30, images_without_alt * 5)

    has_lang = False
    for chunk in parser.text_chunks[:5]:
        pass

    return {
        'score': max(0, score),
        'alt_text': images_without_alt,
        'contrast_issues': 0,
        'keyboard_focus': 0,
        'issues': issues,
    }


def calculate_overall(scores):
    weights = {
        'meta': 0.25,
        'content': 0.20,
        'headings': 0.15,
        'security': 0.15,
        'performance': 0.15,
        'images': 0.05,
        'accessibility': 0.05,
    }
    total = sum(scores.get(k, 0) * w for k, w in weights.items())
    return round(total)


def get_priority_fixes(meta_result, headings_result, security_result, content_result, perf_result):
    critical = []
    important = []
    quick = []

    for issue in meta_result.get('issues', []):
        if issue.get('type') == 'error':
            critical.append({'category': 'SEO', 'title': issue['message'], 'description': '', 'effect': 'Высокий', 'complexity': 'Средний'})
        elif issue.get('type') == 'warning':
            important.append({'category': 'SEO', 'title': issue['message'], 'description': '', 'effect': 'Средний', 'complexity': 'Лёгкий'})

    for issue in headings_result.get('issues', []):
        if issue.get('type') == 'error':
            critical.append({'category': 'СТРУКТУРА', 'title': issue['message'], 'description': '', 'effect': 'Высокий', 'complexity': 'Лёгкий'})

    for issue in security_result.get('issues', []):
        if issue.get('type') == 'warning':
            important.append({'category': 'SECURITY', 'title': issue.get('text', issue.get('message', '')), 'description': issue.get('detail', ''), 'effect': issue.get('severity', 'Средний'), 'complexity': issue.get('complexity', 'Средний')})

    for issue in content_result.get('issues', []):
        if issue.get('type') == 'error':
            critical.append({'category': 'КОНТЕНТ', 'title': issue['message'], 'description': '', 'effect': 'Высокий', 'complexity': 'Средний'})

    for issue in perf_result.get('issues', []):
        if issue.get('type') == 'error':
            important.append({'category': 'PERFORMANCE', 'title': issue['message'], 'description': '', 'effect': 'Высокий', 'complexity': 'Средний'})
        elif issue.get('type') == 'warning':
            quick.append({'category': 'PERFORMANCE', 'title': issue['message'], 'description': '', 'effect': 'Средний', 'complexity': 'Лёгкий'})

    important.append({'category': 'ACCESSIBILITY', 'title': 'Улучшить доступность', 'description': 'Проверьте label, ARIA-атрибуты, клавиатурную навигацию и контраст.', 'effect': 'Средний', 'complexity': 'Средний'})

    return {'critical': critical, 'important': important, 'quick': quick}


def handler(event: dict, context) -> dict:
    """SEO-аудит сайта по URL. Анализирует мета-теги, заголовки, контент, безопасность и производительность."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        body = {}

    url = body.get('url', '').strip()

    if not url:
        return {
            'statusCode': 400,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': 'URL обязателен'}, ensure_ascii=False)
        }

    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url

    parsed_url = urlparse(url)

    try:
        html, resp_headers, status_code, final_url = fetch_url(url)
    except Exception as e:
        err_msg = str(e)
        if hasattr(e, 'code'):
            err_msg = f'Сайт вернул ошибку {e.code}'
        else:
            err_msg = f'Не удалось подключиться к сайту: {err_msg}'
        return {
            'statusCode': 200,
            'headers': CORS_HEADERS,
            'body': json.dumps({'error': err_msg}, ensure_ascii=False)
        }
    parser = SEOParser()
    parser.feed(html)

    meta_result = analyze_meta(parser, url)
    headings_result = analyze_headings(parser)
    images_result = analyze_images(parser, url)
    content_result = analyze_content(parser)
    security_result = analyze_security(resp_headers, parsed_url)
    perf_result = analyze_performance(resp_headers, html)
    accessibility_result = analyze_accessibility(parser, resp_headers)

    scores = {
        'meta': meta_result['score'],
        'headings': headings_result['score'],
        'images': images_result['score'],
        'content': content_result['score'],
        'security': security_result['score'],
        'performance': perf_result['score'],
        'accessibility': accessibility_result['score'],
    }

    overall_score = calculate_overall(scores)
    priority_fixes = get_priority_fixes(meta_result, headings_result, security_result, content_result, perf_result)

    result = {
        'url': final_url,
        'overall_score': overall_score,
        'scores': scores,
        'meta': meta_result,
        'headings': headings_result,
        'images': images_result,
        'content': content_result,
        'security': security_result,
        'performance': perf_result,
        'accessibility': accessibility_result,
        'priority_fixes': priority_fixes,
    }

    return {
        'statusCode': 200,
        'headers': CORS_HEADERS,
        'body': json.dumps(result, ensure_ascii=False)
    }