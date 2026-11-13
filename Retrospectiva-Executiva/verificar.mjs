import fs from 'node:fs';
import {createCanvas,DOMMatrix,ImageData,Path2D} from '@napi-rs/canvas';
globalThis.DOMMatrix=DOMMatrix;globalThis.ImageData=ImageData;globalThis.Path2D=Path2D;
const {getDocument}=await import('pdfjs-dist/legacy/build/pdf.mjs');
const doc=await getDocument({data:new Uint8Array(fs.readFileSync(new URL('./Retrospectiva-Executiva.pdf',import.meta.url)))}).promise;
const canvas=createCanvas(960*2,540*4),ctx=canvas.getContext('2d');let summary=[];
for(let i=1;i<=doc.numPages;i++){let page=await doc.getPage(i),v=page.getViewport({scale:1}),c=createCanvas(v.width,v.height);await page.render({canvasContext:c.getContext('2d'),viewport:v}).promise;ctx.drawImage(c,((i-1)%2)*960,Math.floor((i-1)/2)*540);let t=await page.getTextContent();summary.push({page:i,items:t.items.length,last:t.items.slice(-3).map(x=>x.str),outside:t.items.filter(x=>x.transform[4]<0||x.transform[4]>960||x.transform[5]<0||x.transform[5]>540).map(x=>x.str)});}
fs.writeFileSync(new URL('./conferencia-paginas.png',import.meta.url),canvas.toBuffer('image/png'));fs.writeFileSync(new URL('./verificacao-pdf.json',import.meta.url),JSON.stringify(summary,null,2));console.log(JSON.stringify(summary));
