const fs=require('fs'),path=require('path'),sharp=require('sharp');
const {bundle}=require('@remotion/bundler');const {selectComposition,renderStill}=require('@remotion/renderer');
const names=['Capa','Campeao-Invicto','Copa-81-8','Tabela-no-Titulo','Comparacao-Final','30-de-38-no-Z4','Queda-36-Rodada','Taca-e-Queda','Perguntas','Encerramento'];
(async()=>{
 const out=path.resolve('episodes/EP02-Palmeiras-2012/entrega/telas-v1');fs.mkdirSync(out,{recursive:true});
 const url=await bundle({entryPoint:path.resolve('src/index.ts')});const comp=await selectComposition({serveUrl:url,id:'EP02-Telas-Aprovacao'});
 for(let i=0;i<names.length;i++){
  if(process.argv.length>2&&!process.argv.slice(2).map(Number).includes(i))continue;
  const props={screen:i,animated:false},file=path.join(out,`${String(i+1).padStart(2,'0')}-${names[i]}.png`);
  await renderStill({serveUrl:url,composition:{...comp,props},inputProps:props,output:file});
  await sharp(file).resize(360,640).toFile(file.replace('.png','-360.png'));console.log(names[i]);
 }
 const tiles=await Promise.all(names.map(async(n,i)=>{const caption=Buffer.from(`<svg width="360" height="30"><rect width="360" height="30" fill="#101c30"/><text x="10" y="22" fill="white" font-size="17">${i+1}. ${n}</text></svg>`);return sharp(path.join(out,`${String(i+1).padStart(2,'0')}-${n}-360.png`)).extend({top:30,bottom:10,left:10,right:10,background:'#101c30'}).composite([{input:caption,left:10,top:0}]).toBuffer();}));
 await sharp({create:{width:1520,height:2040,channels:3,background:'#101c30'}}).composite(tiles.map((input,i)=>({input,left:i%4*380,top:Math.floor(i/4)*680}))).png().toFile(path.join(out,'Painel-Telas-EP02.png'));
})();
