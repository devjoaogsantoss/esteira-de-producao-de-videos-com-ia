import fs from 'node:fs';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {openBrowser,selectComposition,renderStill} from '@remotion/renderer';
import sharp from 'sharp';
const out='entrega/revisao-grafica';
fs.mkdirSync(out,{recursive:true});
console.log('Preparando estudos estáticos de título e diagramas.');
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),outDir:path.resolve('build-graphic')});
fs.writeFileSync('review/revisao-grafica/bundle-path.txt',serveUrl);
const browser=await openBrowser('chrome');
try{
 for(const [id,file] of [['Estudo-Titulo-A','01-Titulo-A'],['Estudo-Titulo-B','02-Titulo-B'],['Estudo-Acesso-Direto','03-Acesso-Direto'],['Estudo-Playoff','04-Playoff']]){
  const composition=await selectComposition({serveUrl,id,puppeteerInstance:browser});
  await renderStill({serveUrl,composition,puppeteerInstance:browser,output:`${out}/${file}.png`});
  await sharp(`${out}/${file}.png`).resize(360,640).toFile(`${out}/${file}-360.png`);
  console.log(`${file}: 1080px e 360px exportados.`);
 }
}finally{await browser.close({silent:true});}
const inputs=['review/revisao-grafica/original-23.7.png',`${out}/01-Titulo-A.png`,`${out}/02-Titulo-B.png`];
const labels=['ATUAL · 88 PX','A · 110 PX','B · LINHAS CURTAS'];
const parts=[];
for(let i=0;i<3;i++){
 parts.push({input:await sharp(inputs[i]).resize(360,640).toBuffer(),left:i*380+10,top:62});
 parts.push({input:Buffer.from(`<svg width="360" height="50"><text x="8" y="33" font-family="Arial" font-size="21" fill="#eeeeF0">${labels[i]}</text></svg>`),left:i*380+10,top:0});
}
await sharp({create:{width:1140,height:714,channels:3,background:'#020c1f'}}).composite(parts).png().toFile(`${out}/Comparacao-Titulos.png`);
console.log('Comparação de títulos exportada.');
