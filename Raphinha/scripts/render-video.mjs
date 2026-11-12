import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import sharp from 'sharp';
const mode=process.argv[2]??'proof',dir='review/v1',out='entrega/v1';
fs.mkdirSync(dir,{recursive:true});fs.mkdirSync(out,{recursive:true});
const sourceFiles=fs.readdirSync('src').filter(f=>/\.(tsx?|json)$/.test(f)).map(f=>`src/${f}`);
const fingerprint=crypto.createHash('sha256').update(sourceFiles.map(f=>fs.readFileSync(f)).reduce((a,b)=>Buffer.concat([a,b]),Buffer.alloc(0))).digest('hex');
let serveUrl;const cached=fs.existsSync(`${dir}/bundle.json`)?JSON.parse(fs.readFileSync(`${dir}/bundle.json`)):null;
if(cached?.fingerprint===fingerprint&&fs.existsSync(cached.serveUrl))serveUrl=cached.serveUrl;
else{serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('build-video')});fs.writeFileSync(`${dir}/bundle.json`,JSON.stringify({serveUrl,fingerprint}));}
const browser=await openBrowser('chrome');
const audits=[];let label='';
if(mode==='proof'){
 const original=browser.newPage.bind(browser);
 browser.newPage=async args=>{const page=await original(args),close=page.close.bind(page);page.close=async opts=>{
  try{const result=await page.evaluate(()=>{
   const visible=el=>{let p=el,a=1;while(p&&p!==document){const s=getComputedStyle(p);if(s.display==='none'||s.visibility==='hidden')return false;a*=Number(s.opacity);p=p.parentElement;}return a>.25;};
   const safe=[...document.querySelectorAll('[data-safe]')].filter(visible).map(el=>{const r=el.getBoundingClientRect();return {text:el.textContent.slice(0,120),x:r.x,y:r.y,right:r.right,bottom:r.bottom,overflow:el.scrollWidth>el.clientWidth+2,violation:r.x<89||r.right>901||r.y<239||r.bottom>1501};});
   const images=[...document.querySelectorAll('img')].map(i=>i.complete&&i.naturalWidth>0);
   return {safe,imagesLoaded:images.every(Boolean),fontLoaded:document.fonts.check('700 40px Poppins')};
  });if(result.safe.length)audits.push({frame:label,...result});}catch{}
  return close(opts);};return page;};
}
try{
 const composition=await selectComposition({serveUrl,id:'Raphinha-V1',puppeteerInstance:browser});
 if(mode==='proof'){
  const frames=[0,150,215,330,430,600,650,690,735,770,810,870,920,960,1020,1080,1160,1300,1370,1550,1640,1740,1850,2050,2200,2340,2440,2520,2620,2700,2775,2840,2970,3040,3080,3120,3200,3500,3550,3575,3599];
  for(const frame of frames){label=frame;await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:`${dir}/frame-${frame}.png`});await sharp(`${dir}/frame-${frame}.png`).resize(360,640).toFile(`${dir}/frame-${frame}-360.png`);console.log(`Quadro ${frame} / ${(frame/30).toFixed(2)}s`);}
  const problems=audits.flatMap(a=>a.safe.filter(s=>s.violation||s.overflow).map(s=>({frame:a.frame,...s})));
  fs.writeFileSync(`${dir}/layout-audit.json`,JSON.stringify(audits,null,2));fs.writeFileSync(`${dir}/layout-findings.json`,JSON.stringify(problems,null,2));
  const important=[0,330,810,960,1160,1740,2200,2620,2840,3120,3500,3599];
  for(let p=0;p<2;p++){
   const parts=[];for(let j=0;j<6;j++){const frame=important[p*6+j];parts.push({input:await sharp(`${dir}/frame-${frame}-360.png`).toBuffer(),left:j*380+10,top:45});parts.push({input:Buffer.from(`<svg width="360" height="40"><text x="8" y="27" fill="#EEEEF0" font-family="Arial" font-size="20">${(frame/30).toFixed(1)} s</text></svg>`),left:j*380+10,top:0});}
   await sharp({create:{width:2280,height:700,channels:3,background:'#101c2d'}}).composite(parts).png().toFile(`${dir}/Prancha-Movimento-${p+1}.png`);
  }
  console.log(`Revisão: ${audits.length} estados; ${problems.length} alertas de layout.`);
  console.log('Renderizando trecho representativo de timeline e transição.');
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,frameRange:[630,1379],codec:'h264',crf:19,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'256k',concurrency:2,outputLocation:`${out}/Trecho-Timeline-V1.mp4`,onProgress:progress('Trecho')});
 }else if(mode==='full'){
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,codec:'h264',crf:18,pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'320k',concurrency:2,outputLocation:`${out}/Sportsmatch-Raphinha-V1.mp4`,onProgress:progress('V1')});
 }else throw new Error('Modo: proof ou full.');
}finally{await browser.close({silent:true});}
function progress(name){let last=-1;return({progress,renderedFrames})=>{const p=Math.floor(progress*20);if(p>last){console.log(`${name}: ${p*5}% · ${renderedFrames} quadros`);last=p;}};}
