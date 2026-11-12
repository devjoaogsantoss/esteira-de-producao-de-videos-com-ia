import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {openBrowser} from '@remotion/renderer';
const browser=await openBrowser('chrome');
try{
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.setViewport({width:1280,height:900,deviceScaleFactor:1});
 await page.goto({url:pathToFileURL(path.resolve('entrega/etapa-2/REVISAR-TELAS.html')).href,timeout:30000});
 const result=await page.evaluate(async()=>{
  const imgs=[...document.querySelectorAll('.thumb img')];
  await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode()}));
  document.querySelector('[data-index="0"]').click();
  const opened=document.getElementById('viewer').open;
  document.getElementById('next').click();
  const nextWorks=document.getElementById('counter').textContent==='02 / 15';
  document.getElementById('size').click();
  const phoneWorks=document.getElementById('viewer').classList.contains('phone');
  document.getElementById('close').click();
  return {count:imgs.length,allImagesLoaded:imgs.every(i=>i.complete&&i.naturalWidth===360),opened,nextWorks,phoneWorks,closed:!document.getElementById('viewer').open};
 });
 if(Object.values(result).some(v=>v===false)||result.count!==15)throw new Error(JSON.stringify(result));
 fs.writeFileSync('review/galeria-verificacao.json',JSON.stringify(result,null,2));
 const {value}=await page._client().send('Page.captureScreenshot',{format:'png'});
 fs.writeFileSync('review/galeria-desktop.png',Buffer.from(value.data,'base64'));
 console.log(JSON.stringify(result));
}finally{await browser.close({silent:true});}
