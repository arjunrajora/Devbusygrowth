const fs = require('fs');
const path = require('path');

const sourcePath = 'C:/Users/lenovo/.gemini/antigravity/brain/870064d2-181d-4a20-9e68-68c3ab2df007/.user_uploaded/media_1789486344897.jpg';
const destDir = path.join(__dirname, '../public/assets/images');
const destPath = path.join(destDir, 'payment-qr.jpg');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(sourcePath, destPath);

const stats = fs.statSync(destPath);
console.log(`Copied QR image to ${destPath}`);
console.log(`File size: ${stats.size} bytes`);

// Read JPEG dimensions
const buf = fs.readFileSync(destPath);
let i = 0;
if (buf[0] === 0xFF && buf[1] === 0xD8) {
  i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xFF) break;
    const marker = buf[i + 1];
    if (marker === 0xC0 || marker === 0xC2) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      console.log(`JPEG dimensions: ${width}x${height}`);
      break;
    }
    const len = buf.readUInt16BE(i + 2);
    i += 2 + len;
  }
}
