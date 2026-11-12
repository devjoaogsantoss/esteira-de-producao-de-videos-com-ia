import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('build')});
const browser=await openBrowser('chrome');
const composition=await selectComposition({serveUrl,id:'SerieB2026-Revisao',puppeteerInstance:browser});
const timing=JSON.parse(fs.readFileSync('src/timing.json','utf8'));
const frames=[0,23,timing.starts[1]+30,timing.starts[2]-5,timing.starts[2]+60,timing.starts[3]-5,timing.starts[4]-6,timing.starts[5]-6,timing.starts[6]-5,timing.starts[6]+55,timing.starts[6]+140,timing.starts[7]-30,timing.starts[7]+14,timing.duration-1];
for(const frame of frames){await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,output:`review/frame-${frame}.png`});console.log(`Reviewed frame ${frame}`);}
const cover=await selectComposition({serveUrl,id:'Capa-SerieB2026',puppeteerInstance:browser});
await renderStill({serveUrl,composition:cover,puppeteerInstance:browser,output:'entrega/Capa-SerieB2026.png'});
// Open Studio in bundled browser as well, and verify it actually presents the project.
const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
await page.goto({url:'http://localhost:3000/SerieB2026-Revisao',timeout:60000});
const studio=await page.evaluate(()=>({title:document.title,text:document.body.innerText.slice(0,3000)}));
fs.writeFileSync('review/studio.json',JSON.stringify(studio,null,2));
await browser.close({silent:true});
const composites=[];
for(let i=0;i<frames.length;i++)composites.push({input:await sharp(`review/frame-${frames[i]}.png`).resize(270,480).toBuffer(),left:(i%7)*270,top:Math.floor(i/7)*480});
await sharp({create:{width:1890,height:960,channels:3,background:'#020c1f'}}).composite(composites).jpeg().toFile('review/contact-sheet.jpg');
console.log('Cover and review frames saved.');
