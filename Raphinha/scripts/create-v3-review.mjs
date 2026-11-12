import fs from 'node:fs';
let html=fs.readFileSync('entrega/v2/ASSISTIR-V2.html','utf8').replaceAll('Sportsmatch-Raphinha-V2.mp4','Sportsmatch-Raphinha-V3.mp4').replaceAll('Capa-Raphinha-V2.png','Capa-Raphinha-V3.png').replaceAll('· V2','· V3').replaceAll('MP4 da V2','MP4 da V3').replaceAll('2 minutos · capa cartoon, fotos em movimento e transições de papel.','2min03s · nova narração com o trecho de Ancelotti.');
for(const [oldTime,newTime] of [[9,8.8],[21.2,20.6],[53.2,52.1],[71.7,69.9],[79.4,77.7],[93.2,91.8],[100.7,104.4],[118,121]])html=html.replace(`data-time="${oldTime}"`,`data-time="${newTime}"`);
fs.writeFileSync('entrega/v3/ASSISTIR-V3.html',html);
fs.copyFileSync('review/v3/frame-52.png','entrega/v3/Capa-Raphinha-V3.png');
fs.copyFileSync('review/v3/frame-2910.png','entrega/v3/Quadro-Ancelotti-V3.png');
fs.copyFileSync('public/audio/narracao-v3-original.mp3','entrega/v3/Narracao-atualizada-original.mp3');
console.log('Visualizador e materiais da V3 preparados.');
