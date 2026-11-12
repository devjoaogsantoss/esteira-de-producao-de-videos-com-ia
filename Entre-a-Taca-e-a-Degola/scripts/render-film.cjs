const fs = require('fs');
const path = require('path');
const {bundle} = require('@remotion/bundler');
const {selectComposition, renderMedia, renderStill} = require('@remotion/renderer');

(async () => {
  const preview = process.argv.includes('--trecho');
  const framesOnly = process.argv.includes('--quadros');
  const out = path.resolve('episodes/EP01-Gremio-Vasco-2026/entrega/final');
  fs.mkdirSync(out, {recursive: true});
  const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), outDir: path.resolve('build-ep01')});
  const composition = await selectComposition({serveUrl, id: 'Entre-a-Taca-e-a-Degola-EP01'});
  if (framesOnly) {
    const sharp = require('sharp');
    const seconds = [0, 8.8, 10.8, 13.4, 17.8, 21.9, 24.8, 29.9, 35.1, 39.7, 43.4, 49.6, 52.8, 54.6, 56.95, 58.2, 59.66];
    const tiles = [];
    for (let i = 0; i < seconds.length; i++) {
      const file = path.resolve(`review/filme-${String(i + 1).padStart(2, '0')}-${seconds[i]}s.png`);
      await renderStill({serveUrl, composition, output: file, frame: Math.min(composition.durationInFrames - 1, Math.round(seconds[i] * 30)), scale: 1 / 3});
      const label = Buffer.from(`<svg width="360" height="30"><rect width="360" height="30" fill="#101c30"/><text x="12" y="22" fill="white" font-size="18">${seconds[i]}s</text></svg>`);
      tiles.push(await sharp(file).extend({top: 30, bottom: 10, left: 10, right: 10, background: '#101c30'}).composite([{input: label, left: 10, top: 0}]).toBuffer());
    }
    await sharp({create: {width: 380 * 4, height: 680 * Math.ceil(tiles.length / 4), channels: 3, background: '#101c30'}}).composite(tiles.map((input, i) => ({input, left: i % 4 * 380, top: Math.floor(i / 4) * 680}))).png().toFile('review/EP01-Quadros-Filme.png');
    console.log('Quadros da montagem exportados.');
    return;
  }
  let last = -1;
  const filename = preview ? 'EP01-Trecho-Revisao.mp4' : 'Entre-a-Taca-e-a-Degola-EP01-FINAL.mp4';
  await renderMedia({serveUrl, composition, codec: 'h264', crf: 18, pixelFormat: 'yuv420p', audioCodec: 'aac', audioBitrate: '320k', concurrency: 2, scale: preview ? .5 : 1, ...(preview ? {frameRange: [240, 764]} : {}), outputLocation: path.join(out, filename), onProgress: ({progress}) => {const n = Math.floor(progress * 20); if (n > last) {console.log(`${preview ? 'Trecho' : 'Final'}: ${n * 5}%`); last = n;}}});
  console.log(path.join(out, filename));
})().catch(e => {console.error(e); process.exit(1);});
