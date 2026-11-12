import fs from 'node:fs';
import {openBrowser} from '@remotion/renderer';
const id=process.argv[2]??'Raphinha-V1',dir=process.argv[3]??'review/v1',variant=id.endsWith('V3')?'v3':id.endsWith('V2')?'v2':'v1';
const browser=await openBrowser('chrome');
try{
 const page=await browser.newPage({context:()=>null,logLevel:'error',indent:false,pageIndex:0,onBrowserLog:null,onLog:()=>{}});
 await page.setViewport({width:1500,height:1050,deviceScaleFactor:1});
 await page.goto({url:`http://localhost:3001/${id}`,timeout:60000});
 for(let i=0;i<60;i++){
  if(await page.evaluate(()=>document.querySelector('[data-artboard]')!==null))break;
  await new Promise(r=>setTimeout(r,500));
 }
 await page.evaluate(()=>document.fonts.ready);
 await new Promise(r=>setTimeout(r,1200));
 const result=await page.evaluate(()=>({loaded:!!document.querySelector('[data-artboard]'),title:document.title,hasCover:document.body.textContent.includes('DE RAPHINHA:'),fontLoaded:document.fonts.check('700 40px Poppins'),images:[...document.querySelectorAll('[data-artboard] img')].map(i=>i.complete&&i.naturalWidth>0)}));
 if(!result.loaded||!result.hasCover||!result.fontLoaded)throw new Error(JSON.stringify(result));
 const {value}=await page._client().send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`${dir}/studio-${variant}.png`,Buffer.from(value.data,'base64'));
 fs.writeFileSync(`${dir}/studio-verificacao.json`,JSON.stringify(result,null,2));
 console.log(JSON.stringify(result));
}finally{await browser.close({silent:true});}
