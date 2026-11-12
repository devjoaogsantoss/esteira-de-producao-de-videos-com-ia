const {openBrowser} = require('@remotion/renderer');
const fs = require('fs');
const path = require('path');
const {pathToFileURL} = require('url');
const out = path.resolve('episodes/EP01-Gremio-Vasco-2026/entrega/telas-v3');

(async () => {
  const browser = await openBrowser('chrome');
  const errors = [];
  const page = await browser.newPage({context: () => null, logLevel: 'error', indent: false, pageIndex: 0, onBrowserLog: l => {if (l.type === 'error') errors.push(l.text);}, onLog: () => {}});
  try {
    await page.setViewport({width: 1120, height: 1000, deviceScaleFactor: 1});
    await page.goto({url: pathToFileURL(path.join(out, 'index.html')).href, timeout: 30000});
    await page.evaluate(async () => {await document.fonts.ready; await new Promise(resolve => setTimeout(resolve, 1000));});
    console.log(JSON.stringify(await page.evaluate(() => ({title: document.title, select: document.querySelector('select')?.options.length, buttons: [...document.querySelectorAll('button')].map(b => ({title: b.title, aria: b.getAttribute('aria-label')})), images: [...document.querySelectorAll('.viewer img')].map(i => ({complete: i.complete, width: i.naturalWidth})), fonts: [...document.fonts].map(f => ({family: f.family, weight: f.weight, status: f.status}))}))));
    const shot = await page._client().send('Page.captureScreenshot', {format: 'png'});
    fs.writeFileSync(path.join(out, 'Galeria-Navegador.png'), Buffer.from(shot.value.data, 'base64'));
    for (const screen of process.argv.length > 2 ? process.argv.slice(2).map(Number) : [1, 2, 3, 4, 5, 6, 7, 8]) {
      await page.evaluate((s) => {const select = document.querySelector('select'); select.value = String(s); select.dispatchEvent(new Event('change', {bubbles: true}));}, screen);
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 180)));
      await page.evaluate(() => document.querySelector('button[title="Play video"]').click());
      if (screen === 10) {
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 300)));
        const first = await page._client().send('Page.captureScreenshot', {format: 'png'});
        fs.writeFileSync(path.join(out, 'Encerramento-Bolas-01.png'), Buffer.from(first.value.data, 'base64'));
        const before = await page.evaluate(() => [...document.querySelectorAll('[data-ending-ball]')].map(n => ({top: n.style.top, opacity: n.style.opacity})));
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 280)));
        const second = await page._client().send('Page.captureScreenshot', {format: 'png'});
        fs.writeFileSync(path.join(out, 'Encerramento-Bolas-02.png'), Buffer.from(second.value.data, 'base64'));
        const after = await page.evaluate(() => [...document.querySelectorAll('[data-ending-ball]')].map(n => ({top: n.style.top, opacity: n.style.opacity})));
        console.log('Bolas:', JSON.stringify({before, after}));
        fs.writeFileSync(path.join(out, 'bounce-check.json'), JSON.stringify({before, after}, null, 2));
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 600)));
      } else {
        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1400)));
      }
      const mid = await page._client().send('Page.captureScreenshot', {format: 'png'});
      fs.writeFileSync(path.join(out, `Movimento-Tela-${screen + 1}-Intermediario.png`), Buffer.from(mid.value.data, 'base64'));
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3400)));
      await page.evaluate(() => document.querySelector('button[title="Pause video"]').click());
      const end = await page._client().send('Page.captureScreenshot', {format: 'png'});
      fs.writeFileSync(path.join(out, `Movimento-Tela-${screen + 1}-Final.png`), Buffer.from(end.value.data, 'base64'));
      console.log('Reproduzida tela', screen + 1);
    }
    await page.goto({url: 'http://localhost:3021/EP01-Estudo-Movimento', timeout: 30000});
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1800)));
    console.log('Studio:', JSON.stringify(await page.evaluate(() => ({title: document.title, text: document.body.innerText.slice(0, 450), images: [...document.images].filter(i => i.complete && i.naturalWidth > 0).length}))));
    const studio = await page._client().send('Page.captureScreenshot', {format: 'png'});
    fs.writeFileSync(path.join(out, 'Studio-Navegador.png'), Buffer.from(studio.value.data, 'base64'));
    fs.writeFileSync(path.join(out, 'browser-check.json'), JSON.stringify({errors, checked: ['local HTML opened', 'fonts', 'player loaded', 'Studio preview loaded']}, null, 2));
  } finally {await browser.close({silent: true});}
})().catch(e => {console.error(e); process.exit(1);});

