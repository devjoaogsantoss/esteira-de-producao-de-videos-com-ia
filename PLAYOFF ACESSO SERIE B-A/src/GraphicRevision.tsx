import React from 'react';
import {AbsoluteFill, Img, interpolate, Easing, staticFile, useCurrentFrame} from 'remotion';
import pulse from './music-pulse.json';

export const GC={navy:'#020C1F',pink:'#FF0244',white:'#EEEEF0',line:'#3A4B65',muted:'#BEC8D6',panel:'#0B1A30'};
export const gx=(name:string)=>staticFile(`assets/final-2026/${name}.png`);
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const ease=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:Easing.bezier(.22,1,.36,1)});
export const Base:React.FC<{children:React.ReactNode}>=({children})=><AbsoluteFill style={{fontFamily:'Poppins',background:GC.navy,color:GC.white}}>{children}</AbsoluteFill>;

export const PhotoPlate:React.FC<{name:string;frame?:number;split?:boolean;focus?:string;opacity?:number}>=({name,frame=0,split=false,focus='50% 30%',opacity=1})=><div style={{position:'absolute',inset:'0 0 auto 0',height:1260,overflow:'hidden',opacity}}>
 <Img src={gx(name)} style={{width:split?'50%':'100%',height:'100%',objectFit:'cover',objectPosition:focus,scale:interpolate(frame,[0,450],[1.01,1.075],clamp),translate:`${interpolate(frame,[0,450],[0,-16],clamp)}px 0px`}}/>
 {split&&<Img src={gx('vila-photo')} style={{position:'absolute',left:'50%',width:'50%',height:'100%',objectFit:'cover',objectPosition:'50% 30%',scale:interpolate(frame,[0,450],[1.01,1.075],clamp)}}/>}
 <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(2,12,31,.08),rgba(2,12,31,.5) 28%,rgba(2,12,31,.85) 62%,#020C1F 100%)'}}/>
 <div style={{position:'absolute',left:65,top:280,width:890,height:385,backdropFilter:'blur(3px)',maskImage:'linear-gradient(transparent,black 16%,black 84%,transparent)'}}/>
</div>;
export const Watermark:React.FC=()=> <Img src={gx('watermark')} style={{position:'absolute',left:744,top:86,width:156,height:156,opacity:.23,objectFit:'contain'}}/>;
export const EyebrowG:React.FC=()=> <div data-safe style={{position:'absolute',left:90,top:247,fontSize:28,fontWeight:600,color:GC.pink,letterSpacing:.7}}>GUIA DO ACESSO / SÉRIE B 2026</div>;
export const CreditG:React.FC<{children:React.ReactNode;top?:number}>=({children,top=1454})=><div data-safe style={{position:'absolute',left:90,top,width:810,fontSize:28,lineHeight:1.35,color:GC.muted}}>{children}</div>;

type TitleLine={text:string;pink?:boolean;size?:number;introSize?:number};
export const HeroG:React.FC<{lines:TitleLine[];frame?:number;still?:boolean;top?:number;introTop?:number}>=({lines,frame=50,still=false,top=305,introTop=395})=>{
 const p=still?1:ease(frame,24,39);
 return <div style={{position:'absolute',left:90,width:810,top:still?top:interpolate(p,[0,1],[introTop,top]),opacity:still?1:ease(frame,0,7),fontWeight:700,lineHeight:1.03,letterSpacing:-2.3}}>
 {lines.map((line,i)=><div key={i} data-safe style={{fontSize:still?(line.size??104):interpolate(p,[0,1],[line.introSize??Math.min(115,(line.size??104)+8),line.size??104]),color:line.pink?GC.pink:GC.white,whiteSpace:'nowrap'}}>{line.text}</div>)}
 <div style={{marginTop:23,height:5,width:still?114:114*ease(frame,28,42),background:GC.pink}}/>
 </div>
};
export const FadeG:React.FC<{frame:number;at:number;children:React.ReactNode;style?:React.CSSProperties}>=({frame,at,children,style})=><div style={{...style,opacity:(typeof style?.opacity==='number'?style.opacity:1)*ease(frame,at,at+10),translate:`0px ${interpolate(ease(frame,at,at+13),[0,1],[18,0])}px`}}>{children}</div>;
export const CrestG:React.FC<{name:string;height?:number}>=({name,height=140})=><Img src={gx(name)} style={{width:160,height,objectFit:'contain'}}/>;

export const SlotG:React.FC<{x:number;y:number;width?:number;height?:number;winner?:boolean;direct?:boolean;opacity?:number;contentOpacity?:number;winnerBottom?:boolean}>=({x,y,width=385,height=160,winner=false,direct=false,opacity=1,contentOpacity=1,winnerBottom=false})=><div data-safe style={{position:'absolute',left:x,top:y,width,height,boxSizing:'border-box',border:`2px solid ${GC.pink}`,borderRadius:20,background:GC.navy,opacity,textAlign:'center',display:'flex',flexDirection:winnerBottom?'column-reverse':'column',alignItems:'center',justifyContent:height>200?'flex-start':'center',paddingTop:height>200?20:0,gap:8}}>
 <div style={{fontSize:30,fontWeight:600,color:GC.pink,opacity:winner?0:contentOpacity}}>{direct?'VAGA DIRETA':'1 VAGA'}</div>
 <div style={{fontSize:40,fontWeight:700,opacity:contentOpacity}}>SÉRIE A 2027</div>
</div>;
const AccessBoundary:React.FC<{frame:number;opacity?:number}>=({frame,opacity=1})=><div style={{position:'absolute',left:90,top:1034,width:810,opacity}}>
 <div style={{height:3,background:GC.pink,width:810*ease(frame,165,181)}}/>
 <div style={{position:'absolute',left:325,top:-21,padding:'0 6px',background:GC.navy,fontSize:28,color:GC.pink,fontWeight:600}}>ACESSO ↑</div>
</div>;

export const DirectDiagramG:React.FC<{globalFrame:number;still?:boolean;compact?:number;hideHeading?:boolean}>=({globalFrame,still=false,compact=0,hideHeading=false})=>{
 const f=still?295:globalFrame;
 const move=ease(f,248,272); // “sobem direto”: 8.26–9.20s in the approved audio.
 return <>
 <FadeG frame={f} at={157} style={{position:'absolute',top:635,left:90,opacity:hideHeading?0:1}}><div data-safe style={{fontSize:40,fontWeight:600}}>Após as <span style={{color:GC.pink}}>38 rodadas</span></div></FadeG>
 {[90,515].map((x,i)=><FadeG key={x} frame={f} at={186+i*5}><SlotG x={x} y={interpolate(compact,[0,1],[710,655])} height={interpolate(compact,[0,1],[300,80])} direct contentOpacity={1-ease(compact,0,.4)}/></FadeG>)}
 <AccessBoundary frame={f} opacity={1-compact}/>
 {[90,515].map((x,i)=><FadeG key={x} frame={f} at={219+i*9}><div data-safe style={{position:'absolute',left:x+interpolate(compact,[0,1],[62,20]),top:interpolate(compact,[0,1],[interpolate(move,[0,1],[1120,853]),666]),width:interpolate(compact,[0,1],[261,70]),height:interpolate(compact,[0,1],[145,60]),borderRadius:18,background:GC.white,color:GC.navy,textAlign:'center',paddingTop:compact*6,boxSizing:'border-box',boxShadow:'0 8px 26px #0004',overflow:'hidden'}}>
 <div style={{fontSize:interpolate(compact,[0,1],[92,45]),lineHeight:1,fontWeight:700}}>{i+1}º</div><div style={{fontSize:32,lineHeight:1.2,fontWeight:600,opacity:1-ease(compact,0,.4),display:compact>.4?'none':'block'}}>{i===0?'CAMPEÃO':'VICE'}</div>
 </div></FadeG>)}
 {[90,515].map(x=><div key={x} data-safe style={{position:'absolute',left:x+109,top:674,fontSize:28,color:GC.muted,opacity:compact}}>ACESSO DIRETO</div>)}
 <FadeG frame={f} at={274} style={{position:'absolute',left:90,top:1160,width:810,opacity:1-compact}}><div data-safe style={{fontSize:44,fontWeight:600}}>Dois acessos <span style={{color:GC.pink}}>diretos.</span></div></FadeG>
 </>
};

export const ReturnArrowsG:React.FC<{x:number;y:number;width?:number;opacity?:number;spread?:number}>=({x,y,width=150,opacity=1,spread=43})=><svg style={{position:'absolute',left:x,top:y,overflow:'visible',opacity}} width={width} height={spread+39} viewBox={`0 0 ${width} ${spread+39}`}>
 <g fill="none" stroke={GC.muted} strokeWidth="2.5"><path d={`M8 18H${width-9}m-9 -6l9 6-9 6`}/><path d={`M${width-8} ${18+spread}H9m9 -6l-9 6 9 6`}/></g>
 <g fill={GC.white} fontFamily="Poppins" fontSize="28" fontWeight="600"><text x={width/2} y="8" textAnchor="middle">IDA</text><text x={width/2} y={52+spread} textAnchor="middle">VOLTA</text></g>
</svg>;

export const PlayoffDiagramG:React.FC<{globalFrame:number;still?:boolean;showDirectSummary?:boolean}>=({globalFrame,still=false,showDirectSummary=true})=>{
 const f=still?512:globalFrame;
 const travel=ease(f,474,499); // “cada vencedor”: 15.80–16.64s.
 return <>
 {showDirectSummary&&<div data-safe style={{position:'absolute',top:655,left:90,width:810,display:'flex',gap:40}}>{['1º','2º'].map(p=><div key={p} style={{width:385,height:80,display:'flex',alignItems:'center',justifyContent:'center',gap:18,borderRadius:15,border:`1px solid ${GC.line}`,background:GC.panel}}><b style={{fontSize:45}}>{p}</b><span style={{fontSize:28,color:GC.muted}}>ACESSO DIRETO</span></div>)}</div>}
 <FadeG frame={f} at={309} style={{position:'absolute',left:90,top:757}}><div data-safe style={{fontSize:32,color:GC.pink,fontWeight:600}}>OUTRAS DUAS VAGAS • PLAYOFFS</div></FadeG>
 {[90,515].map((x,i)=><React.Fragment key={x}>
 <FadeG frame={f} at={310+i*5}><SlotG x={x} y={820} winner={travel>.02} winnerBottom/></FadeG>
 <svg style={{position:'absolute',left:x+192.5,top:980,overflow:'visible'}} width="1" height="170"><path d="M0 170V0m-7 10L0 0l7 10" fill="none" stroke={GC.pink} strokeWidth="3" opacity={ease(f,333+i*55,346+i*55)}/></svg>
 <FadeG frame={f} at={333+i*55}><div data-safe style={{position:'absolute',left:x,top:1150,width:385,height:235,border:`2px solid ${GC.line}`,borderRadius:22,background:GC.panel}}>
 <div style={{position:'absolute',left:28,top:14,fontSize:94,fontWeight:700}}>{i===0?'3º':'4º'}</div>
 <div style={{position:'absolute',right:28,top:14,fontSize:94,fontWeight:700}}>{i===0?'6º':'5º'}</div>
 <div style={{position:'absolute',left:167,top:40,fontSize:50,fontWeight:700,color:GC.pink}}>×</div>
 <ReturnArrowsG x={116} y={132} opacity={ease(f,425,436)}/>
 </div></FadeG>
 <div data-safe style={{position:'absolute',left:x+56,top:interpolate(travel,[0,1],[1089,913]),width:273,height:46,borderRadius:12,background:GC.white,color:GC.navy,fontWeight:700,fontSize:31,textAlign:'center',lineHeight:'46px',opacity:ease(f,474,480)}}>VENCEDOR</div>
 </React.Fragment>)}
 </>
};

export const SharedPlaceG:React.FC<{globalFrame:number;still?:boolean}>=({globalFrame,still=false})=>{
 const f=still?710:globalFrame;const approach=ease(f,667,680);
 return <>
 <FadeG frame={f} at={635}><SlotG x={270} y={705} width={450} height={155} direct/></FadeG>
 <svg style={{position:'absolute',left:0,top:0}} width="1080" height="1430"><g fill="none" stroke={GC.pink} strokeWidth="3" opacity={ease(f,655,666)}><path d="M270 1000V920H495V860"/><path d="M720 1000V920H495"/><path d="M488 870l7-10 7 10"/></g></svg>
 {[{x:90,name:'juventude-badge',label:'JUVENTUDE',sign:1},{x:515,name:'vila',label:'VILA NOVA',sign:-1}].map(t=><FadeG key={t.name} frame={f} at={638}><div data-safe style={{position:'absolute',left:t.x+8+interpolate(approach,[0,1],[0,t.sign*16]),top:1000,width:369,height:246,boxSizing:'border-box',border:`2px solid ${GC.line}`,borderRadius:22,background:GC.panel,textAlign:'center',paddingTop:22}}><CrestG name={t.name} height={150}/><div style={{fontSize:38,fontWeight:700,marginTop:12}}>{t.label}</div></div></FadeG>)}
 <FadeG frame={f} at={680} style={{position:'absolute',left:90,top:1290,width:810}}><div data-safe style={{fontSize:40,lineHeight:1.3}}>Neste cenário, Juventude<br/>ocupa a segunda posição.</div></FadeG>
 </>
};

export const RevisionTimeline:React.FC<{frame?:number}>=({frame})=>{
 const current=useCurrentFrame();const f=frame??current;const e=pulse[Math.min(f,pulse.length-1)]??0;
 return <div style={{position:'absolute',left:90,top:1560,width:810}}>
 <div style={{display:'flex',justifyContent:'space-between',fontSize:28,color:'#9BA9BA',marginBottom:15}}><span>INSTAPLAYSSS / SPORTSMATCH</span><span style={{color:GC.pink}}>{Math.min(100,Math.round(f/1493*100))}%</span></div>
 <div style={{height:20,display:'flex',alignItems:'center',justifyContent:'space-between'}}>{Array.from({length:78},(_,i)=><div key={i} style={{width:5,borderRadius:4,height:6+e*(6+i%5),background:i/77<=f/1493?GC.pink:GC.line,opacity:.8}}/>)}</div>
 <div style={{position:'absolute',left:f/1493*804,top:57,width:7,height:7,borderRadius:'50%',background:GC.white,scale:1+e*.12}}/>
 </div>
};

export const TitleStudyG:React.FC<{variant:'A'|'B'}>=({variant})=><Base>
 <PhotoPlate name="juventude" split/><Watermark/><EyebrowG/>
 {variant==='A'?<div data-safe style={{position:'absolute',left:90,top:305,width:810,fontSize:110,lineHeight:1.06,letterSpacing:-2.8,fontWeight:700}}><div>UMA VAGA</div><div style={{color:GC.pink}}>DIRETA EM JOGO.</div></div>:<HeroG still top={305} lines={[{text:'UMA VAGA',size:110},{text:'DIRETA',size:115,pink:true},{text:'EM JOGO.',size:110}]}/>}
 <SharedPlaceG globalFrame={710} still/>
 <CreditG top={1410}>Disputa: CBF • 07/11/2026<br/>Posição: cenário fornecido</CreditG><RevisionTimeline frame={710}/>
</Base>;
export const DirectStudyG:React.FC=()=> <Base><PhotoPlate name="cbf"/><Watermark/><EyebrowG/><HeroG still lines={[{text:'O ACESSO',size:110},{text:'MUDOU.',size:115,pink:true}]}/><DirectDiagramG globalFrame={276} still/><CreditG>Formato: ge • 05/02/2026</CreditG><RevisionTimeline frame={276}/></Base>;
export const PlayoffStudyG:React.FC=()=> <Base><PhotoPlate name="fortaleza-photo"/><Watermark/><EyebrowG/><HeroG still lines={[{text:'COMO',size:100},{text:'FUNCIONAM',size:100},{text:'OS PLAYOFFS?',size:104,pink:true}]}/><PlayoffDiagramG globalFrame={512} still/><CreditG>Formato: ge • 05/02/2026</CreditG><RevisionTimeline frame={512}/></Base>;
