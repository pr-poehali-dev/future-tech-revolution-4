import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const SEO_AUDIT_URL = func2url["seo-audit"];

interface AuditResult {
  url: string;
  overall_score: number;
  scores: {
    meta: number;
    headings: number;
    images: number;
    content: number;
    security: number;
    performance: number;
    accessibility: number;
  };
  meta: {
    score: number;
    title: string;
    title_length: number;
    description: string;
    description_length: number;
    keywords: string;
    canonical: string;
    robots: string;
    viewport: string;
    charset: string;
    og: { title: string; description: string; image: string };
    issues: Array<{ type: string; message: string }>;
  };
  headings: {
    score: number;
    counts: Record<string, number>;
    h1_texts: string[];
    issues: Array<{ type: string; message: string }>;
  };
  images: {
    score: number;
    total: number;
    without_alt: number;
    issues: Array<{ type: string; message: string }>;
  };
  content: {
    score: number;
    word_count: number;
    sentence_count: number;
    paragraph_count: number;
    read_minutes: number;
    text_ratio: number;
    keywords: Array<{ word: string; count: number }>;
    issues: Array<{ type: string; message: string }>;
  };
  security: {
    score: number;
    security_headers: Record<string, boolean>;
    hsts: string;
    csp: string;
    x_frame_options: string;
    x_content_type: string;
    server: string;
    cors: string;
    issues: Array<{ type: string; text?: string; detail?: string; message?: string; severity?: string; complexity?: string }>;
  };
  performance: {
    score: number;
    compression: { active: boolean; method: string | null; brotli: boolean; gzip: boolean; deflate: boolean };
    caching: { cache_control: string; etag: boolean; last_modified: boolean };
    issues: Array<{ type: string; message: string }>;
  };
  accessibility: {
    score: number;
    alt_text: number;
    contrast_issues: number;
    keyboard_focus: number;
    issues: Array<{ type: string; message: string }>;
  };
  priority_fixes: {
    critical: Array<{ category: string; title: string; description: string; effect: string; complexity: string }>;
    important: Array<{ category: string; title: string; description: string; effect: string; complexity: string }>;
    quick: Array<{ category: string; title: string; description: string; effect: string; complexity: string }>;
  };
}

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circ = 2 * Math.PI * radius;
  const fill = (score / 100) * circ;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth={6} fill="none" className="text-muted/30" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        stroke={color} strokeWidth={6} fill="none"
        strokeDasharray={circ}
        strokeDashoffset={circ - fill}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text
        x="50%" y="50%"
        textAnchor="middle" dominantBaseline="central"
        className="rotate-90"
        style={{ fontSize: size * 0.22, fontWeight: 700, fill: color, transform: `rotate(90deg)`, transformOrigin: "50% 50%", transformBox: "fill-box" }}
      >
        {score}
      </text>
    </svg>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const cls = score >= 75 ? "text-green-400" : score >= 50 ? "text-amber-400" : "text-red-400";
  return (
    <span className={`text-2xl font-bold ${cls}`}>
      {score}<span className="text-sm font-normal text-muted-foreground">/100</span>
    </span>
  );
}

function SectionCard({ icon, title, subtitle, score, children }: {
  icon: string; title: string; subtitle: string; score: number; children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">{icon}</div>
          <div>
            <div className="font-semibold text-foreground">{title}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{subtitle}</div>
          </div>
        </div>
        <ScoreBadge score={score} />
      </div>
      {children}
    </div>
  );
}

function IssueRow({ type, message }: { type: string; message: string }) {
  const colors: Record<string, string> = {
    error: "text-red-400",
    warning: "text-amber-400",
    info: "text-blue-400",
  };
  return (
    <div className={`flex items-start gap-2 text-sm ${colors[type] || "text-muted-foreground"}`}>
      <span className="mt-0.5">•</span>
      <span>{message}</span>
    </div>
  );
}

function MetaTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm text-foreground break-all">{value || <span className="text-muted-foreground italic">не указано</span>}</span>
    </div>
  );
}

function PriorityColumn({ title, color, items }: {
  title: string; color: string;
  items: Array<{ category: string; title: string; description: string; effect: string; complexity: string }>;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${color}`}>{title}</span>
        <span className="text-muted-foreground text-sm">{items.length}</span>
      </div>
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground text-center">
            Явных приоритетных исправлений не найдено.
          </div>
        ) : items.map((item, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-3 space-y-1.5">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</div>
            <div className="text-sm font-semibold text-foreground">{item.title}</div>
            {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
            <div className="flex gap-2 mt-1 flex-wrap">
              {item.effect && (
                <span className="text-xs border border-border rounded px-2 py-0.5 text-muted-foreground">
                  Эффект: <span className="text-foreground font-medium">{item.effect}</span>
                </span>
              )}
              {item.complexity && (
                <span className="text-xs border border-border rounded px-2 py-0.5 text-muted-foreground">
                  Сложность: <span className="text-foreground font-medium">{item.complexity}</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompressionMethod({ label, active }: { label: string; active: boolean }) {
  return (
    <div className={`flex-1 text-center border rounded-lg py-3 ${active ? "border-primary bg-primary/5" : "border-border"}`}>
      <div className={`text-xs font-mono uppercase tracking-wider mb-1 ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</div>
      <div className={`text-sm font-bold ${active ? "text-primary" : "text-muted-foreground"}`}>{active ? "YES" : "NO"}</div>
    </div>
  );
}

export default function SeoAudit() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const handleAudit = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(SEO_AUDIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Не удалось выполнить запрос. Проверьте подключение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">Rich<span className="text-foreground">SMM</span></Link>
          <div className="flex items-center gap-2">
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">SEO Аудит</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mb-4">
            <Icon name="BarChart2" size={14} />
            Бесплатный инструмент
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">SEO-аудит сайта</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Введите адрес сайта — мы проверим мета-теги, контент, безопасность и производительность
          </p>
        </div>

        {/* URL Input */}
        <div className="flex gap-2 mb-10 max-w-2xl mx-auto">
          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAudit()}
            className="flex-1 h-12 text-base"
          />
          <Button onClick={handleAudit} disabled={loading} className="h-12 px-6">
            {loading ? (
              <><Icon name="Loader2" size={16} className="animate-spin mr-2" />Анализирую...</>
            ) : (
              <><Icon name="Search" size={16} className="mr-2" />Проверить</>
            )}
          </Button>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-sm text-destructive flex items-center gap-2">
            <Icon name="AlertCircle" size={16} />
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="Loader2" size={40} className="animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg font-medium">Анализируем сайт...</p>
            <p className="text-sm mt-1">Это займёт 5–15 секунд</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Overall score */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreRing score={result.overall_score} size={120} />
                <div className="flex-1 text-center md:text-left">
                  <div className="text-2xl font-bold mb-1">Общий балл: {result.overall_score}/100</div>
                  <div className="text-muted-foreground text-sm mb-4 break-all">{result.url}</div>
                  <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                    {Object.entries(result.scores).map(([key, val]) => {
                      const labels: Record<string, string> = {
                        meta: "Meta", headings: "H1-H6", images: "Изобр.", content: "Контент",
                        security: "Безоп.", performance: "Произв.", accessibility: "Дост."
                      };
                      const color = val >= 75 ? "text-green-400" : val >= 50 ? "text-amber-400" : "text-red-400";
                      return (
                        <div key={key} className="bg-muted/30 rounded-lg p-2 text-center">
                          <div className={`text-lg font-bold ${color}`}>{val}</div>
                          <div className="text-xs text-muted-foreground">{labels[key]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Priority fixes */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">REPORT</div>
              <h2 className="text-lg font-bold mb-4">Приоритетные улучшения</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <PriorityColumn title="Критично" color="text-red-400 border-red-400/40" items={result.priority_fixes.critical} />
                <PriorityColumn title="Важно" color="text-amber-400 border-amber-400/40" items={result.priority_fixes.important} />
                <PriorityColumn title="Быстро" color="text-green-400 border-green-400/40" items={result.priority_fixes.quick} />
              </div>
            </div>

            {/* Meta */}
            <SectionCard icon="🏷️" title="Meta теги" subtitle="SEO мета-данные" score={result.meta.score}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <MetaTag label={`Title (${result.meta.title_length} симв.)`} value={result.meta.title} />
                  <MetaTag label={`Description (${result.meta.description_length} симв.)`} value={result.meta.description} />
                  <MetaTag label="Canonical" value={result.meta.canonical} />
                  <MetaTag label="Robots" value={result.meta.robots} />
                  <MetaTag label="Viewport" value={result.meta.viewport} />
                  <MetaTag label="Charset" value={result.meta.charset} />
                </div>
                <div className="space-y-3">
                  <MetaTag label="OG Title" value={result.meta.og.title} />
                  <MetaTag label="OG Description" value={result.meta.og.description} />
                  <MetaTag label="OG Image" value={result.meta.og.image} />
                </div>
              </div>
              {result.meta.issues.length > 0 && (
                <div className="border-t border-border pt-3 space-y-1.5 mt-2">
                  {result.meta.issues.map((iss, i) => <IssueRow key={i} {...iss} />)}
                </div>
              )}
            </SectionCard>

            {/* Headings */}
            <SectionCard icon="📑" title="Структура заголовков" subtitle="H1–H6" score={result.headings.score}>
              <div className="flex gap-3 flex-wrap">
                {Object.entries(result.headings.counts).map(([tag, count]) => (
                  <div key={tag} className="bg-muted/30 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-lg font-bold text-foreground">{count}</div>
                    <div className="text-xs text-muted-foreground uppercase">{tag}</div>
                  </div>
                ))}
              </div>
              {result.headings.h1_texts.length > 0 && (
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">H1 тексты</div>
                  {result.headings.h1_texts.map((t, i) => (
                    <div key={i} className="text-sm text-foreground bg-muted/20 rounded px-2 py-1">{t}</div>
                  ))}
                </div>
              )}
              {result.headings.issues.length > 0 && (
                <div className="border-t border-border pt-3 space-y-1.5">
                  {result.headings.issues.map((iss, i) => <IssueRow key={i} {...iss} />)}
                </div>
              )}
            </SectionCard>

            {/* Content */}
            <SectionCard icon="📄" title="Анализ контента" subtitle="Текстовая оптимизация" score={result.content.score}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { val: result.content.word_count, label: "СЛОВ" },
                  { val: result.content.sentence_count, label: "ПРЕДЛОЖ." },
                  { val: result.content.paragraph_count, label: "ПАРАГР." },
                  { val: `~${result.content.read_minutes}`, label: "МИН. ЧТЕН.", highlight: true },
                ].map((item, i) => (
                  <div key={i} className={`rounded-lg p-3 text-center border ${item.highlight ? "border-primary/30 bg-primary/5" : "border-border bg-muted/20"}`}>
                    <div className={`text-2xl font-bold ${item.highlight ? "text-primary" : "text-foreground"}`}>{item.val}</div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>ТЕКСТ / HTML</span>
                    <span className={result.content.text_ratio < 20 ? "text-amber-400" : "text-foreground"}>{result.content.text_ratio}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{ width: `${result.content.text_ratio}%` }}
                    />
                  </div>
                </div>
                {result.content.keywords.length > 0 && (
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">КЛЮЧЕВЫЕ СЛОВА</div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.content.keywords.slice(0, 6).map((kw, i) => (
                        <span key={i} className="text-xs bg-muted/40 rounded px-2 py-0.5 text-foreground">
                          {kw.word} <span className="text-muted-foreground">×{kw.count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {result.content.issues.length > 0 && (
                <div className="border-t border-border pt-3 space-y-1.5">
                  {result.content.issues.map((iss, i) => <IssueRow key={i} {...iss} />)}
                </div>
              )}
            </SectionCard>

            {/* Performance / Compression */}
            <SectionCard icon="⚡" title="Сжатие данных" subtitle="Оптимизация трафика" score={result.performance.score}>
              {result.performance.compression.active ? (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-400" />
                  <div>
                    <div className="text-sm font-semibold text-green-400">Сжатие активно</div>
                    <div className="text-xs text-muted-foreground">Метод: {result.performance.compression.method}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  <Icon name="XCircle" size={16} className="text-red-400" />
                  <div className="text-sm font-semibold text-red-400">Сжатие не включено</div>
                </div>
              )}
              <div className="flex gap-3">
                <CompressionMethod label="BROTLI" active={result.performance.compression.brotli} />
                <CompressionMethod label="GZIP" active={result.performance.compression.gzip} />
                <CompressionMethod label="DEFLATE" active={result.performance.compression.deflate} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">КЭШИРОВАНИЕ</div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: "Cache-Control", val: result.performance.caching.cache_control },
                    { label: "ETag", val: result.performance.caching.etag ? "✓" : "—" },
                    { label: "Last-Modified", val: result.performance.caching.last_modified ? "✓" : "—" },
                  ].map((item, i) => (
                    <div key={i} className="bg-muted/30 rounded px-3 py-2 text-sm">
                      <span className="text-muted-foreground">{item.label}: </span>
                      <span className="text-foreground">{item.val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Security */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SectionCard icon="🛡️" title="Безопасность" subtitle="Анализ защиты" score={result.security.score}>
                <div className="space-y-2">
                  {[
                    { label: "HSTS", val: result.security.hsts },
                    { label: "CSP", val: result.security.csp },
                    { label: "X-Frame-Options", val: result.security.x_frame_options },
                    { label: "X-Content-Type-Options", val: result.security.x_content_type },
                    { label: "Server", val: result.security.server },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Icon
                        name={item.val ? "CheckCircle2" : "XCircle"}
                        size={15}
                        className={`mt-0.5 flex-shrink-0 ${item.val ? "text-green-400" : "text-red-400"}`}
                      />
                      <span className="text-muted-foreground flex-1">{item.label}</span>
                      {item.val && <span className="text-xs text-muted-foreground font-mono truncate max-w-[120px]">{item.val}</span>}
                    </div>
                  ))}
                </div>
                {result.security.issues.length > 0 && (
                  <div className="border-t border-border pt-3 space-y-1.5">
                    {result.security.issues.map((iss, i) => (
                      <IssueRow key={i} type={iss.type} message={iss.text || iss.message || ""} />
                    ))}
                  </div>
                )}
              </SectionCard>

              <SectionCard icon="🌐" title="CORS" subtitle="Кросс-доменные запросы" score={100}>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5 inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-xs font-semibold text-green-400">НАСТРОЕН</span>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">ACCESS-CONTROL-ALLOW-ORIGIN</div>
                  <div className="font-mono text-sm bg-muted/30 rounded px-3 py-2 text-foreground">
                    {result.security.cors || "*"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/20 rounded-lg p-3">
                  CORS определяет, какие домены могут обращаться к ресурсам сервера. Правильная настройка важна для безопасности API и работы веб-приложений.
                </div>
              </SectionCard>
            </div>

            {/* Accessibility */}
            <SectionCard icon="♿" title="Доступность" subtitle="Accessibility (A11Y)" score={result.accessibility.score}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "АЛТ ТЕКСТ", val: `Без описания: ${result.accessibility.alt_text}`, warn: result.accessibility.alt_text > 0 },
                  { label: "КОНТРАСТ", val: `Проблем: ${result.accessibility.contrast_issues}`, warn: false },
                  { label: "КЛАВИАТУРА", val: `Фокус: ${result.accessibility.keyboard_focus} эл.`, warn: false },
                ].map((item, i) => (
                  <div key={i} className={`rounded-lg p-3 border ${item.warn ? "border-red-400/30 bg-red-400/5" : "border-border bg-muted/20"}`}>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{item.label}</div>
                    <div className={`text-sm font-medium ${item.warn ? "text-red-400" : "text-foreground"}`}>{item.val}</div>
                  </div>
                ))}
              </div>
              {result.accessibility.issues.length > 0 && (
                <div className="border-t border-border pt-3 space-y-1.5">
                  {result.accessibility.issues.map((iss, i) => <IssueRow key={i} {...iss} />)}
                </div>
              )}
            </SectionCard>

            {/* Images */}
            <SectionCard icon="🖼️" title="Изображения" subtitle="Alt теги и оптимизация" score={result.images.score}>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-foreground">{result.images.total}</div>
                  <div className="text-xs text-muted-foreground">ВСЕГО</div>
                </div>
                <div className={`rounded-lg p-3 text-center ${result.images.without_alt > 0 ? "bg-red-400/10 border border-red-400/20" : "bg-green-400/10 border border-green-400/20"}`}>
                  <div className={`text-2xl font-bold ${result.images.without_alt > 0 ? "text-red-400" : "text-green-400"}`}>{result.images.without_alt}</div>
                  <div className="text-xs text-muted-foreground">БЕЗ ALT</div>
                </div>
              </div>
              {result.images.issues.length > 0 && (
                <div className="border-t border-border pt-3 space-y-1.5">
                  {result.images.issues.map((iss, i) => <IssueRow key={i} {...iss} />)}
                </div>
              )}
            </SectionCard>

            {/* CTA */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-2">Нужна помощь с SEO?</h3>
              <p className="text-muted-foreground text-sm mb-4">Мы поможем исправить найденные проблемы и вывести сайт в топ поисковиков</p>
              <Link to="/#contact">
                <Button>Связаться с нами</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
