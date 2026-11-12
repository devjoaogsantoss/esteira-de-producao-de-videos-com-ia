import fs from 'node:fs';
import sharp from 'sharp';
const out='entrega/v2',parts=[];
parts.push({input:await sharp('entrega/v1/Capa-Raphinha.png').resize(360,640).toBuffer(),left:10,top:45});
parts.push({input:await sharp(`${out}/Capa-Raphinha-V2.png`).resize(360,640).toBuffer(),left:390,top:45});
parts.push({input:Buffer.from('<svg width="760" height="45"><text x="15" y="28" font-family="Arial" font-size="20" fill="#EEEEF0">V1 · CAPA</text><text x="395" y="28" font-family="Arial" font-size="20" fill="#FF0244">V2 · QUADRO DE 1,7s</text></svg>'),left:0,top:0});
await sharp({create:{width:760,height:700,channels:3,background:'#101c2d'}}).composite(parts).png().toFile(`${out}/Comparacao-Capas.png`);
const folds=[];
for(const [i,frame] of [179,183,187,191,197].entries()){
 folds.push({input:await sharp(`review/v2/frame-${frame}-360.png`).toBuffer(),left:10+i*380,top:45});
 folds.push({input:Buffer.from(`<svg width="360" height="40"><text x="12" y="28" font-family="Arial" font-size="20" fill="#EEEEF0">${(frame/30).toFixed(2)} s</text></svg>`),left:10+i*380,top:0});
}
await sharp({create:{width:1900,height:700,channels:3,background:'#101c2d'}}).composite(folds).png().toFile('review/v2/Papel-Estados.png');
const html=fs.readFileSync('entrega/v1/ASSISTIR-V1.html','utf8').replaceAll('Sportsmatch-Raphinha-V1.mp4','Sportsmatch-Raphinha-V2.mp4').replaceAll('Capa-Raphinha.png','Capa-Raphinha-V2.png').replaceAll('· V1','· V2').replaceAll('MP4 da V1','MP4 da V2').replaceAll('2 minutos · narração, trilha e motion gráfico.','2 minutos · capa cartoon, fotos em movimento e transições de papel.');
fs.writeFileSync(`${out}/ASSISTIR-V2.html`,html);
console.log('Visualizador V2, comparação e estados do papel preparados.');
