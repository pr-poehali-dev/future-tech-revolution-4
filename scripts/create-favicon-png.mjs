// Создаём PNG favicon для Яндекса используя SVG + Vite transform
// Запускается один раз: node scripts/create-favicon-png.mjs

import { writeFileSync } from 'fs';

// Минимальный корректный 16x16 PNG (фиолетовый пиксель) в виде base64
// Это просто заглушка - реальный favicon.svg уже есть
// Яндекс ищет /favicon.ico - создадим его как ICO-файл с правильными заголовками

// ICO формат: 1 изображение 16x16, 32-bit RGBA
// Минимальный валидный ICO файл (16x16, одноцветный фиолетовый #7c3aed)
const icoData = Buffer.from([
  // ICO Header
  0x00, 0x00, // Reserved
  0x01, 0x00, // Type: ICO
  0x01, 0x00, // Count: 1 image
  // Directory Entry
  0x10,       // Width: 16
  0x10,       // Height: 16
  0x00,       // Color count: 0 (32-bit)
  0x00,       // Reserved
  0x01, 0x00, // Planes: 1
  0x20, 0x00, // Bit count: 32
  0x68, 0x04, 0x00, 0x00, // Size of image data: 1128 bytes
  0x16, 0x00, 0x00, 0x00, // Offset to image data: 22 bytes
  // BITMAPINFOHEADER (40 bytes)
  0x28, 0x00, 0x00, 0x00, // Header size: 40
  0x10, 0x00, 0x00, 0x00, // Width: 16
  0x20, 0x00, 0x00, 0x00, // Height: 32 (doubled for ICO format)
  0x01, 0x00,             // Planes: 1
  0x20, 0x00,             // Bit count: 32
  0x00, 0x00, 0x00, 0x00, // Compression: none
  0x00, 0x04, 0x00, 0x00, // Image size: 1024
  0x00, 0x00, 0x00, 0x00, // X pixels per meter
  0x00, 0x00, 0x00, 0x00, // Y pixels per meter
  0x00, 0x00, 0x00, 0x00, // Colors used
  0x00, 0x00, 0x00, 0x00, // Colors important
]);

// Pixel data: 16x16 pixels, each 4 bytes BGRA
// Color: #7c3aed (purple) = R:124, G:58, B:237, A:255
// In BGRA: B:237, G:58, R:124, A:255 = 0xED, 0x3A, 0x7C, 0xFF
const pixelRow = Buffer.alloc(16 * 4);
for (let i = 0; i < 16; i++) {
  pixelRow[i * 4 + 0] = 0xED; // B
  pixelRow[i * 4 + 1] = 0x3A; // G
  pixelRow[i * 4 + 2] = 0x7C; // R
  pixelRow[i * 4 + 3] = 0xFF; // A
}

const pixels = Buffer.concat(Array(16).fill(pixelRow));

// AND mask: 16x16 pixels / 8 bits per byte, padded to 4-byte boundary
// 0x00 = fully opaque
const andMask = Buffer.alloc(16 * 4, 0x00);

const fullIco = Buffer.concat([icoData, pixels, andMask]);
writeFileSync('public/favicon.ico', fullIco);
console.log('favicon.ico created:', fullIco.length, 'bytes');
