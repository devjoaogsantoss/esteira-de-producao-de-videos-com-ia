import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import sharp from 'sharp';
const output='entrega/etapa-2';
const selected=process.argv.slice(2);
const names=['01-Capa','02-Gancho','03-Temporada','04-Timeline-1','05-Timeline-2','06-Timeline-3','07-Timeline-4','08-Selecao','09-Grafico','10-Amostras','11-Xavi','12-Flick','13-Contexto','14-Fechamento','15-Assinatura'];
fs.mkdirSync(output,{recursive:true});
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('build-stills')});
const browser=await openBrowser('chrome');
try {
 const compositions=(await getCompositions(serveUrl,{puppeteerInstance:browser})).filter(c=>c.durationInFrames===1);
 for(let i=0;i<compositions.length;i++){
   if(selected.length&&!selected.includes(compositions[i].id))continue;
   await renderStill({serveUrl,composition:compositions[i],puppeteerInstance:browser,output:`${output}/${names[i]}.png`});
   await sharp(`${output}/${names[i]}.png`).resize(360,640).toFile(`${output}/${names[i]}-360.png`);
   console.log(`Exportado ${names[i]}: 1080x1920 e 360x640.`);
 }
 fs.writeFileSync(`${output}/manifesto.json`,JSON.stringify(compositions.map((c,i)=>({id:c.id,file:`${names[i]}.png`,width:c.width,height:c.height})),null,2));
} finally {await browser.close({silent:true});}
for(let page=0;page<3;page++) {
 const pieces=[];
 for(let j=0;j<5;j++){
   const i=page*5+j;
   pieces.push({input:await sharp(`${output}/${names[i]}-360.png`).toBuffer(),left:j*380+10,top:55});
   pieces.push({input:Buffer.from(`<svg width="360" height="45"><text x="8" y="30" font-family="Arial" font-size="19" fill="#EEEEF0">${names[i].replaceAll('-',' · ')}</text></svg>`),left:j*380+10,top:0});
 }
 await sharp({create:{width:1900,height:710,channels:3,background:'#101c2d'}}).composite(pieces).png().toFile(`${output}/Prancha-${page+1}.png`);
}
console.log('Pranchas prontas.');
