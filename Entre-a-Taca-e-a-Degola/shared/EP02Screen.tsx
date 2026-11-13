import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {Notebook, WrittenLine} from './Paper';
import {SignatureEnding} from './SignatureEnding';
import {EP02Progress} from './EP02Progress';
import {EP02Z4Timeline} from './EP02Z4Timeline';

for (const [weight, name] of [[400,'Regular'],[600,'SemiBold'],[700,'Bold']] as const) loadFont({family:'Poppins',url:staticFile(`fonts/Poppins-${name}.ttf`),weight:String(weight),format:'truetype'});
const C={navy:'#020C1F',pink:'#FF0244',paper:'#EEEEF0',muted:'#BAC5D6'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const ep02Names=['Capa','Campeao-Invicto','Copa-81-8','Tabela-no-Titulo','Comparacao-Final','30-de-38-no-Z4','Queda-36-Rodada','Taca-e-Queda','Perguntas','Encerramento'];
export const ep02Labels=['Capa · a taça veio, a queda também','Campeão invicto · conquista','81,8% na Copa do Brasil','Em paralelo ao título · tabela','Aproveitamento · comparação final','30 de 38 rodadas no Z4','36ª rodada · queda confirmada','Síntese · taça e queda','Perguntas · escrita no caderno','Encerramento · bolas e assinatura'];
type Props={screen:number;animated?:boolean;filmMode?:boolean};
type Motion={animated?:boolean};
const photo=(i:number)=>staticFile(`episodes/EP02/foto-${String(i).padStart(2,'0')}.png`);
const crest=(name:string)=>staticFile(`episodes/EP02/escudos/${name}.png`);
const Crest=({name='palmeiras',size=95}:{name?:string;size?:number})=><Img src={crest(name)} style={{width:size,height:size,objectFit:'contain',flexShrink:0}}/>;
const Card=({children,style={}}:{children:React.ReactNode;style?:React.CSSProperties})=><div style={{position:'relative',boxSizing:'border-box',background:C.paper,color:C.navy,padding:32,borderTop:`6px solid ${C.pink}`,boxShadow:'0 12px 0 #0003',...style}}>{children}</div>;
const Tag=({children}:{children:React.ReactNode})=><div style={{fontSize:28,fontWeight:600,color:C.pink,marginBottom:20}}>{children}</div>;
const Reveal=({at,animated=false,children}:{at:number;animated?:boolean;children:React.ReactNode})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <div style={{opacity:animated?interpolate(f,[at*fps,(at+.3)*fps],[0,1],clamp):1,translate:animated?`0px ${interpolate(f,[at*fps,(at+.45)*fps],[24,0],clamp)}px`:'0px 0px'}}>{children}</div>;
};

const Cover=()=> <>
 <div style={{position:'absolute',left:90,top:318,width:810,fontSize:49,fontWeight:700}}>PALMEIRAS <span style={{color:C.pink}}>/ 2012</span></div>
 <div style={{position:'absolute',left:90,top:402,width:810}}><Notebook height={465} style={{rotate:'-.45deg'}}><div style={{fontWeight:700,letterSpacing:-3,lineHeight:1.04}}><div style={{fontSize:94}}>A TAÇA VEIO.</div><div style={{fontSize:116,marginTop:13}}>A QUEDA</div><div style={{fontSize:126,color:C.pink}}>TAMBÉM.</div></div></Notebook></div>
 <div style={{position:'absolute',left:90,top:910,width:810,fontSize:32,fontWeight:600}}>Dois extremos. No mesmo ano.</div>
 <div style={{position:'absolute',left:90,top:978,width:810,display:'flex',gap:24}}>
  <Card style={{width:393,padding:'24px 25px'}}><div style={{fontSize:27,fontWeight:600}}>COPA DO BRASIL</div><div style={{fontSize:42,fontWeight:700,marginTop:12}}>INVICTO</div><div style={{fontSize:70,fontWeight:700,color:C.pink,lineHeight:1.2}}>81,8%</div></Card>
  <Card style={{width:393,padding:'24px 25px'}}><div style={{fontSize:27,fontWeight:600}}>BRASILEIRÃO</div><div style={{fontSize:40,fontWeight:700,marginTop:12}}>REBAIXADO</div><div style={{fontSize:70,fontWeight:700,color:C.pink,lineHeight:1.2}}>29,8%</div></Card>
 </div>
 <div style={{position:'absolute',left:90,top:1260,width:810,fontSize:28,color:C.muted}}>Aproveitamento nas competições de 2012.</div>
 <div style={{position:'absolute',left:90,top:1325,width:810,display:'flex',alignItems:'center',gap:22}}><Crest size={75}/><div style={{fontSize:40,fontWeight:700}}>30 de 38 rodadas no Z4</div></div>
</>;

const CupWin=({animated=false}:Motion)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const p=animated?interpolate(f,[.35*fps,2.8*fps],[0,1],clamp):1;
 return <Card><Tag>PALMEIRAS / COPA DO BRASIL 2012</Tag><div style={{height:235,position:'relative'}}>
  <div style={{position:'absolute',left:45,top:75,width:590,height:4,background:'#BDC5D0'}}/><div style={{position:'absolute',left:45,top:75,width:590*p,height:4,background:C.pink}}/>
  <div style={{position:'absolute',left:15+530*p,top:28,width:100,height:100,borderRadius:'50%',background:C.paper,display:'flex',alignItems:'center',justifyContent:'center',border:`2px solid ${C.pink}`}}><Crest size={84}/></div>
  <div style={{position:'absolute',top:150,left:0,fontSize:30,fontWeight:600}}>COPA DO BRASIL</div><div style={{position:'absolute',top:150,right:0,fontSize:30,fontWeight:700,color:C.pink}}>CONQUISTA</div>
 </div><Reveal animated={animated} at={2.8}><div style={{fontSize:73,fontWeight:700,lineHeight:1.1}}>CAMPEÃO</div></Reveal><div style={{display:'flex',alignItems:'center',gap:26,marginTop:26,paddingTop:24,borderTop:'2px solid #B9C2CF'}}><b style={{fontSize:128,lineHeight:1,color:C.pink}}>0</b><div style={{fontSize:43,fontWeight:600,lineHeight:1.2}}>DERROTAS<br/><span style={{fontSize:30,fontWeight:400}}>na campanha do título</span></div></div></Card>;
};

const Utilization=({compare=false,animated=false}:Motion&{compare?:boolean})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const rows=compare?[{name:'Copa do Brasil',value:81.8,label:'81,8%',pink:false},{name:'Brasileirão · ao final',value:29.8,label:'29,8%',pink:true}]:[{name:'Copa do Brasil',value:81.8,label:'81,8%',pink:true}];
 return <Card><Tag>APROVEITAMENTO / TEMPORADA 2012</Tag>{rows.map((r,i)=>{
  const p=animated?interpolate(f,[(.4+i*1.65)*fps,(1.9+i*1.65)*fps],[0,1],clamp):1;
  return <div key={r.name} style={{marginTop:i?25:10}}><div style={{fontSize:compare?32:36,fontWeight:600}}>{r.name}</div><div style={{fontSize:compare?74:138,lineHeight:1.25,fontWeight:700,opacity:animated?interpolate(f,[(.4+i*1.65)*fps,(.7+i*1.65)*fps],[0,1],clamp):1,color:r.pink?C.pink:C.navy}}>{r.label}</div><div style={{height:compare?36:65,background:'#CFD5DD'}}><div style={{width:r.value*p+'%',height:'100%',background:r.pink?C.pink:C.navy,border:r.pink?`3px solid ${C.navy}`:'none',boxSizing:'border-box'}}/></div></div>;
 })}<div style={{display:'flex',justifyContent:'space-between',fontSize:28,marginTop:12}}><span>0%</span><span>100%</span></div><div style={{display:'flex',alignItems:'center',gap:24,marginTop:compare?24:40,paddingTop:18,borderTop:'1px solid #B7C1CF'}}><Crest size={compare?64:92}/><div style={{fontSize:compare?29:39,fontWeight:600,lineHeight:1.3}}>{compare?'Campeão na copa. Rebaixado na liga.':<>Campeão invicto.<br/>Nenhuma partida perdida.</>}</div></div></Card>;
};

const titleTable=[{pos:17,club:'sport',name:'Sport',points:6,games:7},{pos:18,club:'palmeiras',name:'Palmeiras',points:5,games:7},{pos:19,club:'figueirense',name:'Figueirense',points:5,games:7},{pos:20,club:'atletico-go',name:'Atlético-GO',points:1,games:7}];
const LeagueAtTitle=({animated=false}:Motion)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const p=animated?interpolate(f,[.65*fps,2.5*fps],[0,1],clamp):1;
 return <Card><Tag>EM PARALELO AO TÍTULO / BRASILEIRÃO</Tag>
  <div style={{display:'grid',gridTemplateColumns:'85px 1fr 88px 88px',fontSize:25,color:'#586477',padding:'0 12px 16px'}}><span>POS.</span><span>CLUBE</span><span style={{textAlign:'center'}}>PTS</span><span style={{textAlign:'center'}}>JOGOS</span></div>
  <div style={{position:'relative'}}>{titleTable.map((r,i)=><div key={r.club} style={{position:'relative',height:88,padding:'12px',boxSizing:'border-box',display:'grid',gridTemplateColumns:'85px 1fr 88px 88px',alignItems:'center',borderTop:'1px solid #B7C0CD',background:r.club==='palmeiras'?C.navy:'transparent',color:r.club==='palmeiras'?C.paper:C.navy,translate:r.club==='palmeiras'?`${interpolate(p,[0,1],[75,0])}px 0px`:'0px 0px',opacity:r.club==='palmeiras'?p:1}}><b style={{fontSize:36}}>{r.pos}º</b><div style={{display:'flex',alignItems:'center',gap:15}}><Crest name={r.club} size={59}/><b style={{fontSize:30}}>{r.name}</b></div><b style={{fontSize:40,textAlign:'center'}}>{r.points}</b><span style={{fontSize:31,textAlign:'center'}}>{r.games}</span></div>)}</div><div style={{marginTop:24,fontSize:30,fontWeight:600,color:C.pink}}>Palmeiras: 5 pontos em 7 jogos</div>
 </Card>;
};

const Relegation=({animated=false}:Motion)=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const p=animated?interpolate(f,[.6*fps,2.8*fps],[0,1],clamp):1;
 return <Card><Tag>BRASILEIRÃO 2012</Tag><div style={{fontSize:100,fontWeight:700,lineHeight:1.1}}>36ª <span style={{fontSize:44}}>RODADA</span></div><div style={{marginTop:40,display:'flex',alignItems:'center',justifyContent:'space-between'}}><Crest name="flamengo" size={133}/><b style={{fontSize:112}}>1 <span style={{color:C.pink,fontSize:70}}>×</span> 1</b><Crest size={133}/></div><div style={{display:'flex',justifyContent:'space-between',fontSize:29,fontWeight:700,marginTop:16}}><span>FLAMENGO</span><span>PALMEIRAS</span></div><div style={{position:'relative',marginTop:48,height:78}}><div style={{position:'absolute',left:0,right:0,top:24,height:4,background:'#BEC7D2'}}/><div style={{position:'absolute',left:0,top:24,height:4,width:`${p*94}%`,background:C.pink}}/><div style={{position:'absolute',left:`${p*94}%`,top:-4,width:56,height:56,borderRadius:'50%',background:C.paper,border:`2px solid ${C.pink}`,display:'flex',alignItems:'center',justifyContent:'center'}}><Crest size={43}/></div><div style={{position:'absolute',top:49,left:0,fontSize:25}}>1ª</div><div style={{position:'absolute',top:49,right:0,fontSize:25}}>36ª</div></div><Reveal animated={animated} at={2.8}><div style={{background:C.pink,color:C.paper,padding:'20px 18px',fontSize:44,fontWeight:700,textAlign:'center'}}>QUEDA CONFIRMADA</div></Reveal></Card>;
};

const Summary=({animated=false}:Motion)=><><Reveal animated={animated} at={.2}><Notebook height={260} style={{rotate:'-.4deg'}}><WrittenLine text="A TAÇA VEIO." size={85} start={.3} duration={1.1} animated={animated}/><div style={{fontSize:37,fontWeight:600,marginTop:22}}>Campeão invicto da Copa do Brasil.</div></Notebook></Reveal><div style={{height:40}}/><Reveal animated={animated} at={1.65}><Notebook height={290} style={{rotate:'.5deg'}}><WrittenLine text="A QUEDA" size={103} start={1.85} duration={.7} animated={animated}/><WrittenLine text="TAMBÉM." size={111} start={2.55} duration={.8} color={C.pink} animated={animated}/></Notebook></Reveal></>;

const Questions=({animated=false}:Motion)=><>
 <div style={{position:'absolute',left:90,top:325,width:810}}><Notebook height={360} style={{rotate:'-.45deg'}}><WrittenLine text="COMO VOCÊ" size={87} start={.1} duration={.65} animated={animated}/><WrittenLine text="LEMBRA DAQUELE" size={69} start={.75} duration={.7} animated={animated}/><WrittenLine text="PALMEIRAS?" size={93} start={1.45} duration={.8} color={C.pink} animated={animated}/></Notebook></div>
 <div style={{position:'absolute',left:90,top:724,width:810,display:'flex',alignItems:'center',gap:25}}><Crest size={77}/><div style={{fontSize:35,fontWeight:600}}>2012 · dois extremos</div></div>
 <div style={{position:'absolute',left:90,top:838,width:810}}><Notebook height={392} style={{rotate:'.45deg'}}><WrittenLine text="O TÍTULO" size={83} start={2.6} duration={.6} animated={animated}/><WrittenLine text="AMENIZOU A DOR" size={64} start={3.2} duration={1} animated={animated}/><WrittenLine text="DO REBAIXAMENTO?" size={59} start={4.2} duration={1.1} color={C.pink} animated={animated}/></Notebook></div>
 <div style={{position:'absolute',left:90,top:1278,width:810}}><Reveal animated={animated} at={5.5}><div style={{fontSize:36,fontWeight:700}}>Campeão invicto e rebaixado?</div><div style={{fontSize:32,color:C.pink,marginTop:16}}>Conta nos comentários.</div></Reveal></div>
</>;

const headings=[[],['SEM PERDER','NENHUMA','PARTIDA.'],['NA COPA,','LÁ EM CIMA.'],['A TAÇA VEIO.','O Z4 JÁ','ESTAVA LÁ.'],['MESMO CLUBE.','DOIS EXTREMOS.'],['NO Z4,','QUASE O ANO','INTEIRO.'],['O EMPATE.','A QUEDA.'],['UM ANO.','DUAS MARCAS.']];
const photoMap=[4,4,6,5,2,1,3,4,2];
export const EP02Screen=({screen:s,animated=false,filmMode=false}:Props)=><AbsoluteFill style={{background:C.navy,color:C.paper,fontFamily:'Poppins'}}>
 {s!==9&&<>{s===0?<div style={{position:'absolute',width:1080,height:1120,display:'flex',overflow:'hidden'}}><Img src={photo(4)} style={{width:540,height:'100%',objectFit:'cover',objectPosition:'53% 20%'}}/><Img src={photo(3)} style={{width:540,height:'100%',objectFit:'cover',objectPosition:'75% 30%'}}/></div>:<Img src={photo(photoMap[s])} style={{position:'absolute',width:1080,height:1120,objectFit:'cover',objectPosition:s===2?'35% 35%':s===6?'70% 50%':'50% 30%'}}/>}<AbsoluteFill style={{background:'linear-gradient(180deg,#020C1F12,#020C1F88 23%,#020C1Feb 55%,#020C1F 74%)'}}/><Img src={staticFile('brand/watermark.png')} style={{position:'absolute',left:745,top:85,width:155,height:155,objectFit:'contain',opacity:.25}}/><div style={{position:'absolute',left:90,top:247,fontSize:28,fontWeight:600,color:C.pink}}>ENTRE A TAÇA E A DEGOLA / EP02</div>
 {s===0?<Cover/>:s===8?<Questions animated={animated}/>:<><div style={{position:'absolute',left:90,top:325,width:810,fontSize:s===4?90:96,fontWeight:700,lineHeight:1.06,letterSpacing:-2}}>{headings[s].map((line,i)=><div key={line} style={{color:i===headings[s].length-1?C.pink:C.paper}}>{line}</div>)}<div style={{width:115,height:6,background:C.pink,marginTop:25}}/></div><div style={{position:'absolute',left:90,top:s===5?680:s===1||s===3?700:650,width:810}}>{s===1&&<CupWin animated={animated}/>}{s===2&&<Utilization animated={animated}/>}{s===3&&<LeagueAtTitle animated={animated}/>}{s===4&&<Utilization compare animated={animated}/>}{s===5&&<EP02Z4Timeline animated={animated}/>}{s===6&&<Relegation animated={animated}/>}{s===7&&<Summary animated={animated}/>}</div></>}
 <div style={{position:'absolute',left:90,top:1450,width:810,fontSize:28,color:C.muted}}>Dados e análise: @sportsmatch.br</div>{!filmMode&&<EP02Progress previewScreen={s} still={!animated}/>}</>}
 {s===9&&<SignatureEnding animated={animated}/>}
</AbsoluteFill>;
