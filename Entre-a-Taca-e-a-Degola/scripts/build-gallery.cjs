const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');
const out = path.resolve('episodes/EP01-Gremio-Vasco-2026/entrega/telas-v3');

(async () => {
  fs.mkdirSync(out, {recursive: true});
  await esbuild.build({absWorkingDir: path.resolve('.'), entryPoints: [path.resolve('src/gallery-player.tsx')], tsconfigRaw: {compilerOptions: {jsx: 'react-jsx', target: 'ES2022'}}, outfile: path.join(out, 'gallery-player.js'), bundle: true, minify: true, define: {'process.env.NODE_ENV': '"production"'}, platform: 'browser', target: 'es2022', jsx: 'automatic'});
  const assetPaths = [
    ...['Regular', 'SemiBold', 'Bold'].map(n => `fonts/Poppins-${n}.ttf`),
    'brand/watermark.png', 'brand/signature.png',
    ...Array.from({length: 8}, (_, i) => `episodes/EP01/foto-${String(i + 1).padStart(2, '0')}.${i === 7 ? 'jpg' : 'png'}`),
    ...['gremio','vasco','palmeiras','internacional','corinthians','remo','chapecoense','mirassol','atletico','boca'].map(n => `episodes/EP01/escudos/${n}.png`),
  ];
  const assets = assetPaths.map(name => ({name, src: `data:${name.endsWith('ttf') ? 'font/ttf' : name.endsWith('jpg') ? 'image/jpeg' : 'image/png'};base64,${fs.readFileSync(path.resolve('public', name)).toString('base64')}`}));
  const files = fs.readdirSync(out).filter(n => /^\d\d-/.test(n) && !n.includes('-360'));
  fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EP01 · Revisão V3</title><style>*{box-sizing:border-box}body{margin:0;background:#020c1f;color:#eeeef0;font:16px system-ui,sans-serif;padding:32px}header,section{max-width:1400px;margin:auto}h1{font-size:30px;margin-bottom:12px}h2{font-size:24px}p{color:#bac5d6;line-height:1.6}a{color:#ff527f}.interactive{display:flex;gap:48px;align-items:flex-start;margin:35px 0 60px;padding:25px;background:#0b1a30;border-radius:12px}.viewer{width:360px;max-width:100%;flex-shrink:0}.choose{max-width:550px}label{display:block;margin:22px 0 8px}select{font-size:17px;background:#eeeef0;color:#020c1f;padding:12px;width:100%;border:0;border-radius:6px}.note{font-size:14px}main{max-width:1400px;margin:25px auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}figure{margin:0}figure img{width:100%;display:block;border-radius:5px}figcaption{padding:12px 0 24px}@media(max-width:720px){body{padding:16px}.interactive{flex-direction:column;padding:16px;gap:15px}.viewer{width:100%;max-width:360px;margin:auto}}</style><header><h1>Entre a Taça e a Degola · EP01 · V3</h1><p>Grêmio e Vasco: leões de mata-mata? · Revisão para aprovação</p></header><section id="player"></section><section><h2>As 11 telas</h2><p>Clique para abrir cada PNG completo.</p></section><main>${files.map((n,i) => `<figure><a href="${encodeURI(n)}" target="_blank"><img src="${encodeURI(n)}" alt="Tela ${i+1}" loading="lazy"></a><figcaption>${i+1}. ${n.replace(/^\d\d-/,'').replace('.png','').replaceAll('-',' ')}</figcaption></figure>`).join('')}</main><script>window.remotion_staticFiles=${JSON.stringify(assets)};</script><script src="gallery-player.js"></script></html>`);
  const old = path.resolve('episodes/EP01-Gremio-Vasco-2026/entrega/telas-v1/index.html');
  // Preserve V1 screen files. The previous entry URL now points to the latest review.
  if (fs.existsSync(old) && !fs.existsSync(old.replace('index.html', 'galeria-v1.html'))) fs.copyFileSync(old, old.replace('index.html', 'galeria-v1.html'));
  fs.writeFileSync(old, '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=../telas-v3/index.html"><title>Revisão V3</title><a href="../telas-v3/index.html">Abrir telas V3 atualizadas</a></html>');
  const previous = path.resolve('episodes/EP01-Gremio-Vasco-2026/entrega/telas-v2/index.html');
  if (fs.existsSync(previous) && !fs.existsSync(previous.replace('index.html', 'galeria-v2.html'))) fs.copyFileSync(previous, previous.replace('index.html', 'galeria-v2.html'));
  fs.writeFileSync(previous, '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=../telas-v3/index.html"><title>Revisão V3</title><a href="../telas-v3/index.html">Abrir telas V3 atualizadas</a></html>');
  console.log('Galeria V3 criada com Player Remotion e assets locais incorporados.');
})();

