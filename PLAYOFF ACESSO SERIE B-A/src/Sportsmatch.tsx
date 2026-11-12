import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {loadFont} from '@remotion/fonts';
import timing from './timing.json';
import pulse from './music-pulse.json';
import reveals from './reveals.json';

for (const [weight,file] of [[400,'Regular'],[600,'SemiBold'],[700,'Bold']] as const) loadFont({family:'Poppins',url:staticFile(`fonts/Poppins-${file}.ttf`),weight:String(weight)});
const C={navy:'#020C1F',pink:'#FF0244',white:'#EEEEF0',line:'#304056'};
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const asset=(name:string)=>staticFile(`assets/final-2026/${name}.png`);
const P:React.CSSProperties={fontFamily:'Poppins',color:C.white};

const Photo:React.FC<{name:string;position?:string;still?:boolean;split?:boolean}>=({name,position='50% 35%',still=false,split=false})=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{height:1150,overflow:'hidden'}}>
  <Img src={asset(name)} style={{width:split?'55%':'100%',height:'100%',objectFit:'cover',objectPosition:position,scale:still?1:interpolate(f,[0,450],[1.02,1.095],clamp),translate:still?'0px 0px':`${interpolate(f,[0,450],[0,-14],clamp)}px 0px`}} />
  {split&&<Img src={asset('vila-photo')} style={{position:'absolute',left:'50%',width:'50%',height:'100%',objectFit:'cover',objectPosition:'50% 30%',scale:interpolate(f,[0,450],[1.02,1.08],clamp)}}/>}
  <AbsoluteFill style={{background:'linear-gradient(180deg,rgba(2,12,31,.1) 0%,rgba(2,12,31,.24) 25%,rgba(2,12,31,.68) 57%,#020C1F 100%)'}}/>
  <div style={{position:'absolute',left:0,right:0,top:230,height:390,backdropFilter:'blur(3px)',background:'linear-gradient(180deg,transparent,rgba(2,12,31,.25),transparent)',maskImage:'linear-gradient(transparent,black 20%,black 80%,transparent)'}}/>
 </AbsoluteFill>
};
const Mark:React.FC=()=> <Img src={asset('watermark')} style={{position:'absolute',width:155,height:155,objectFit:'contain',left:745,top:90,opacity:.25}}/>;
const Eyebrow:React.FC<{children?:React.ReactNode}>=({children='GUIA DO ACESSO / SÉRIE B 2026'})=><div style={{fontSize:27,fontWeight:600,letterSpacing:1.3,color:C.pink}}>{children}</div>;
const Credit:React.FC<{children:React.ReactNode}>=({children})=><div style={{position:'absolute',left:90,top:1460,fontSize:26,color:'#bac3cf'}}>{children}</div>;
const Reveal:React.FC<{at?:number;children:React.ReactNode;style?:React.CSSProperties}>=({at=24,children,style})=>{
 const f=useCurrentFrame();return <div style={{...style,opacity:interpolate(f,[at,at+11],[0,1],clamp),translate:`0px ${interpolate(f,[at,at+14],[30,0],clamp)}px`}}>{children}</div>
};
const Title:React.FC<{first:string;accent:string;size?:number}>=({first,accent,size=88})=>{
 const f=useCurrentFrame();return <div style={{position:'absolute',left:90,top:interpolate(f,[0,20,34],[420,420,330],clamp),width:810,fontWeight:700,fontSize:size,lineHeight:1.06,letterSpacing:-2.8,scale:interpolate(f,[0,20,34],[1.05,1.05,1],clamp),transformOrigin:'left top',opacity:interpolate(f,[0,8],[0,1],clamp)}}>
 <div>{first}</div><div style={{color:C.pink}}>{accent}</div>
 <div style={{height:5,width:interpolate(f,[25,44],[0,108],clamp),background:C.pink,marginTop:30}}/>
 </div>
};
const Panel:React.FC<{children:React.ReactNode;style?:React.CSSProperties}>=({children,style})=><div style={{background:'rgba(11,26,47,.96)',border:'2px solid #304056',borderRadius:24,padding:'28px 32px',...style}}>{children}</div>;
const Badge:React.FC<{name:string;size?:number}>=({name,size=105})=><Img src={asset(name)} style={{width:size,height:size,objectFit:'contain'}}/>;
const SceneShell:React.FC<{photo:string;title:string;accent:string;children:React.ReactNode;credit:string;position?:string;split?:boolean}>=({photo,title,accent,children,credit,position,split})=><AbsoluteFill style={{...P,background:C.navy}}>
 <Photo name={photo} position={position} split={split}/><Mark/>
 <div style={{position:'absolute',left:90,top:253}}><Eyebrow/></div>
 <Title first={title} accent={accent}/>{children}<Credit>{credit}</Credit>
</AbsoluteFill>;

export const Cover:React.FC=()=> <AbsoluteFill style={{...P,background:C.navy}}>
 <Photo name="trophy" still position="58% 25%"/><Mark/>
 <div style={{position:'absolute',left:90,top:255}}><Eyebrow>INSTAPLAYSSS / SPORTSMATCH</Eyebrow></div>
 <div style={{position:'absolute',top:430,left:90,width:810,fontSize:76,lineHeight:1.12,fontWeight:700,letterSpacing:-2}}>
  <div>TUDO O QUE VOCÊ</div><div>PRECISA SABER</div><div style={{fontSize:39,fontWeight:600,letterSpacing:1,marginTop:40,marginBottom:30}}>SOBRE A RETA FINAL DA</div>
  <div style={{fontSize:110,lineHeight:1.04,color:C.pink}}>SÉRIE B</div><div style={{fontSize:164,lineHeight:1.1,color:C.pink}}>2026</div>
 </div>
 <div style={{position:'absolute',top:1240,left:90,fontSize:40,lineHeight:1.4}}>Duas vagas diretas.<br/>Duas decididas nos playoffs.</div>
 <Img src={asset('signature')} style={{position:'absolute',width:400,left:90,top:1515}}/>
</AbsoluteFill>;

const NewFormat:React.FC=()=> <SceneShell photo="cbf" title="O ACESSO" accent="MUDOU." credit="Formato: ge • 05/02/2026">
 <Reveal at={reveals.formatDirect} style={{position:'absolute',left:90,top:715,width:810}}>
  <div style={{fontSize:32,color:C.pink,fontWeight:600,marginBottom:22}}>APÓS AS 38 RODADAS</div>
  <Panel><div style={{display:'flex',alignItems:'center',gap:28}}><div style={{fontSize:103,fontWeight:700,lineHeight:1.1}}>1º <span style={{fontSize:45,color:C.pink}}>e</span> 2º</div><div style={{fontSize:43,lineHeight:1.18,fontWeight:600}}>SOBEM<br/>DIRETO</div></div><div style={{fontSize:32,color:'#b9c4d3',marginTop:15}}>Campeão e vice na Série A.</div></Panel>
  <Reveal at={reveals.formatPlayoffs}><Panel style={{marginTop:26}}><div style={{display:'flex',gap:28,alignItems:'center'}}><div style={{fontSize:86,lineHeight:1.1,fontWeight:700}}>3º <span style={{fontSize:35,color:C.pink}}>ao</span> 6º</div><div style={{fontSize:36,fontWeight:600}}>PLAYOFFS</div></div><div style={{fontSize:35,marginTop:14}}>Disputam as outras <b style={{color:C.pink}}>duas vagas.</b></div></Panel></Reveal>
 </Reveal>
</SceneShell>;

const MatchPositions:React.FC<{a:string;b:string;at:number}>=({a,b,at})=> <Reveal at={at}><Panel style={{marginBottom:25}}>
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',fontSize:104,fontWeight:700,lineHeight:1.2}}><span>{a}</span><span style={{color:C.pink,fontSize:65}}>×</span><span>{b}</span></div>
 <div style={{textAlign:'center',fontSize:30,letterSpacing:1}}>IDA E VOLTA</div>
 </Panel></Reveal>;
const HowItWorks:React.FC=()=> <SceneShell photo="fortaleza-photo" title="COMO FUNCIONAM" accent="OS PLAYOFFS?" credit="Formato: ge • 05/02/2026">
 <div style={{position:'absolute',left:90,top:735,width:810}}>
 <MatchPositions a="3º" b="6º" at={reveals.thirdSixth}/><MatchPositions a="4º" b="5º" at={reveals.fourthFifth}/>
 <Reveal at={reveals.eachWinner}><div style={{borderLeft:`6px solid ${C.pink}`,paddingLeft:24,marginTop:37,fontSize:46,lineHeight:1.3,fontWeight:600}}>Cada vencedor<br/>garante o <span style={{color:C.pink}}>acesso.</span></div></Reveal>
 </div>
</SceneShell>;

const Novorizontino:React.FC=()=> <SceneShell photo="novorizontino" title="NOVORIZONTINO" accent="NA SÉRIE A!" position="50% 20%" credit="Fonte: CBF • 07/11/2026">
 <Reveal style={{position:'absolute',left:90,top:890,width:810}}>
 <div style={{color:C.pink,fontWeight:600,fontSize:30,letterSpacing:1}}>JÁ GARANTIU O ACESSO</div>
 <div style={{fontSize:44,lineHeight:1.3,marginTop:20,marginBottom:30}}>Entre os dois primeiros.<br/>Direto para a elite.</div>
 <Panel><div style={{fontSize:30,color:'#b9c4d3'}}>PRÓXIMA PARADA</div><div style={{fontSize:77,lineHeight:1.25,fontWeight:700}}>SÉRIE A <span style={{color:C.pink}}>2027</span></div></Panel>
 </Reveal>
</SceneShell>;

const SecondPlace:React.FC=()=> <SceneShell photo="juventude" split title="UMA VAGA" accent="DIRETA EM JOGO." credit="Disputa: CBF • 07/11/2026 | Posição: cenário fornecido">
 <Reveal style={{position:'absolute',left:90,top:770,width:810}}>
 <div style={{fontSize:30,color:C.pink,fontWeight:600,marginBottom:22}}>JUVENTUDE × VILA NOVA</div>
 <Panel><div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
  <div style={{textAlign:'center'}}><Badge name="juventude-badge" size={130}/><div style={{fontSize:33,fontWeight:700,marginTop:12}}>JUVENTUDE</div></div>
  <div style={{fontSize:50,color:C.pink}}>×</div>
  <div style={{textAlign:'center'}}><Badge name="vila" size={130}/><div style={{fontSize:33,fontWeight:700,marginTop:12}}>VILA NOVA</div></div>
 </div></Panel>
 <div style={{marginTop:32,fontSize:39,lineHeight:1.4}}>Neste cenário, o <b>Juventude</b><br/>ocupa a segunda posição.</div>
 <div style={{fontSize:32,color:'#b9c4d3',marginTop:20}}>Os dois disputam a outra vaga direta.</div>
 </Reveal>
</SceneShell>;

const MatchBox:React.FC<{a:string;b:string;names:string;label:string;at:number}>=({a,b,names,label,at})=> <Reveal at={at}><Panel style={{marginBottom:25,padding:'20px 28px'}}>
 <div style={{fontSize:27,fontWeight:600,color:C.pink,marginBottom:18}}>{label}</div>
 <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}><Badge name={a} size={88}/><span style={{fontSize:60,fontWeight:700,color:C.pink}}>×</span><Badge name={b} size={88}/></div>
 <div style={{textAlign:'center',fontSize:37,fontWeight:700,margin:'14px 0 10px'}}>{names}</div>
 <div style={{textAlign:'center',fontSize:27,lineHeight:1.4}}>Playoff de acesso à Série A 2027<br/><b>Ida e volta</b></div>
 </Panel></Reveal>;
const Confrontations:React.FC=()=> <SceneShell photo="fortaleza-photo" title="DOIS DUELOS." accent="DUAS VAGAS." credit="Confirmado: CBF • 07/11/2026 | Projeção: cenário fornecido">
 <div style={{position:'absolute',left:90,top:705,width:810}}>
 <MatchBox a="vila" b="crb" names="VILA NOVA × CRB" label="NESTE CENÁRIO • PROJETADO" at={reveals.projectedMatch}/>
 <MatchBox a="fortaleza" b="criciuma" names="FORTALEZA × CRICIÚMA" label="CONFRONTO CONFIRMADO" at={reveals.confirmedMatch}/>
 </div>
</SceneShell>;

const Context:React.FC=()=>{
 return <SceneShell photo="cbf" title="POR QUE CRIAR" accent="OS PLAYOFFS?" credit="Votação: ge • Raphael Zarko • 05/02/2026">
 <div style={{position:'absolute',left:90,top:690,width:810}}>
 <Reveal><div style={{display:'flex',alignItems:'baseline',gap:24}}><span style={{fontSize:116,fontWeight:700,lineHeight:1.1,color:C.pink}}>17</span><span style={{fontSize:29,fontWeight:600}}>A FAVOR</span><span style={{color:'#536174',fontSize:54}}>/</span><span style={{fontSize:82,fontWeight:700,lineHeight:1.1}}>3</span><span style={{fontSize:29,fontWeight:600}}>CONTRA</span></div><div style={{fontSize:30,color:'#c1c8d2',marginTop:10}}>Votação no Conselho Técnico.</div></Reveal>
 <Reveal at={reveals.editorialGains} style={{marginTop:40}}><div style={{fontSize:25,letterSpacing:1,color:C.pink,fontWeight:600}}>POSSÍVEIS GANHOS • LEITURA EDITORIAL</div>
 <div style={{fontSize:38,fontWeight:600,lineHeight:1.5,marginTop:16}}>• Emoção e engajamento.<br/>• Apelo comercial e audiência.</div></Reveal>
 <Reveal at={reveals.internationalLeagues} style={{marginTop:35}}>
  <div style={{fontSize:31,fontWeight:600,marginBottom:18}}>REFERÊNCIAS INTERNACIONAIS</div>
  <div style={{display:'flex',gap:15}}>{[['championship','CHAMPIONSHIP','INGLATERRA'],['bundesliga','2. BUNDESLIGA','ALEMANHA'],['laliga','LALIGA 2','ESPANHA']].map(([mark,label,country],i)=><Reveal key={mark} at={reveals.internationalLeagues+i*12} style={{width:260}}><div style={{height:218,borderRadius:18,background:C.white,color:C.navy,textAlign:'center',padding:'15px 7px'}}><Img src={asset(mark)} style={{height:126,width:150,objectFit:'contain'}}/><div style={{fontSize:20,fontWeight:700,marginTop:5}}>{label}</div><div style={{fontSize:18,fontWeight:600}}>{country}</div></div></Reveal>)}</div>
  <div style={{fontSize:29,marginTop:18,color:'#c1c8d2'}}>Cada liga tem seu formato.</div>
 </Reveal>
 </div>
 </SceneShell>
};

const Ball:React.FC<{kind:number;delay:number}>=({kind,delay})=>{
 const frame=useCurrentFrame();const u=frame-delay;
 const y=interpolate(u,[0,9,15,22,29,33],[0,170,100,170,150,170],clamp);
 const opacity=interpolate(u,[0,3,26,31],[0,1,1,0],clamp);
 return <div style={{position:'absolute',left:395+kind*115,top:760+y,width:64,height:64,opacity,rotate:`${u*5}deg`}}><svg width="64" height="64" viewBox="0 0 64 64"><defs><clipPath id={`ball${kind}`}><circle cx="32" cy="32" r="31"/></clipPath></defs><circle cx="32" cy="32" r="31" fill={['#ed8b39','#EEEEF0','#d2e851'][kind]}/><g clipPath={`url(#ball${kind})`} fill="none" stroke={kind===2?'white':'#172337'} strokeWidth={kind===2?3:2}>{kind===0?<><path d="M0 32h64M32 0v64"/><ellipse cx="-6" cy="32" rx="28" ry="37"/><ellipse cx="70" cy="32" rx="28" ry="37"/></>:kind===1?<><path fill="#172337" d="M32 18l14 10-5 17H23l-5-17z"/><path d="M32 18V0M46 28l18-5M41 45l10 19M23 45L10 64M18 28L0 23"/></>:<><ellipse cx="-8" cy="32" rx="29" ry="39"/><ellipse cx="72" cy="32" rx="29" ry="39"/></>}</g></svg></div>
};
export const Ending:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:C.navy,...P}}>
 <Ball kind={0} delay={0}/><Ball kind={1} delay={4}/><Ball kind={2} delay={8}/>
 <div style={{position:'absolute',left:155,top:870,width:770,opacity:f<30?0:1,translate:`0px ${f<30?0:interpolate(spring({frame:f-30,fps,config:{damping:11,stiffness:230,mass:.65}}),[0,1],[-170,0])}px`}}><Img src={asset('signature')} style={{width:'100%'}}/></div>
 </AbsoluteFill>
};
const Progress:React.FC<{preview:boolean}>=({preview})=>{
 const f=useCurrentFrame(); const {durationInFrames}=useVideoConfig();const energy=pulse[Math.min(pulse.length-1,f)]??0;
 const count=78;const progress=f/(durationInFrames-1);
 return <div style={{...P,position:'absolute',left:90,top:1640,width:810}}>
 <div style={{display:'flex',alignItems:'end',justifyContent:'space-between',marginBottom:21}}><div style={{fontSize:21,letterSpacing:1.2,color:'#a0acbc'}}>INSTAPLAYSSS <span style={{color:C.pink}}> / </span> SPORTSMATCH</div><span style={{fontSize:25,color:C.pink,fontWeight:600}}>{String(Math.min(7,timing.starts.filter(s=>s<=f).length)).padStart(2,'0')}/07</span></div>
 <div style={{height:32,display:'flex',alignItems:'center',justifyContent:'space-between'}}>{Array.from({length:count},(_,i)=>{const active=i/(count-1)<=progress; const e=pulse[Math.min(pulse.length-1,Math.max(0,f-(i%4)))]??energy; return <div key={i} style={{width:5,borderRadius:5,height:8+e*(10+(i%5)*3),background:active?C.pink:C.line,opacity:active?.8+energy*.2:.7}}/>})}</div>
 <div style={{position:'absolute',top:63,left:Math.max(0,progress*805-3),width:9,height:9,borderRadius:'50%',background:C.white,scale:1+energy*.18}}/>
 {preview&&!timing.voiceReady&&<div style={{fontSize:20,color:'#91a0b3',marginTop:19}}>PRÉVIA DE MONTAGEM • NOVA NARRAÇÃO PENDENTE</div>}
 </div>
};
const Soundtrack:React.FC=()=>{
 const {fps}=useVideoConfig();
 if(timing.voiceReady) return <Audio src={staticFile('audio/mix-final-2026.wav')}/>;
 return <>
 <Audio src={staticFile('audio/Energetic Upbeat Percussive Clap and Stomp Background Music.mp3')} trimBefore={timing.musicOffsetSeconds*fps} volume={(f)=>{
 const fade=interpolate(f,[timing.duration-35,timing.duration-1],[1,0],clamp);
 const base=timing.voiceReady? .12:.36;
 const endLift=interpolate(f,[timing.starts[7]-8,timing.starts[7]+15],[base,.44],clamp);
 return endLift*fade;
 }}/>
 </>
};
export const Film:React.FC<{preview:boolean}>=({preview})=>{
 if(!preview&&!timing.voiceReady) throw new Error('Narração nova ausente. Use SerieB2026-Revisao para prévia. Integre o novo áudio antes de renderizar a composição Final.');
 return <AbsoluteFill style={{background:C.navy,...P}}>
 <Sequence name="01 Capa estática" from={0} durationInFrames={timing.starts[1]}><Cover/></Sequence>
 <Sequence name="02 O acesso mudou" from={timing.starts[1]} durationInFrames={timing.starts[2]-timing.starts[1]}><NewFormat/></Sequence>
 <Sequence name="03 Funcionamento" from={timing.starts[2]} durationInFrames={timing.starts[3]-timing.starts[2]}><HowItWorks/></Sequence>
 <Sequence name="04 Novorizontino" from={timing.starts[3]} durationInFrames={timing.starts[4]-timing.starts[3]}><Novorizontino/></Sequence>
 <Sequence name="05 Segunda posição" from={timing.starts[4]} durationInFrames={timing.starts[5]-timing.starts[4]}><SecondPlace/></Sequence>
 <Sequence name="06 Confrontos" from={timing.starts[5]} durationInFrames={timing.starts[6]-timing.starts[5]}><Confrontations/></Sequence>
 <Sequence name="07 Contexto da mudança" from={timing.starts[6]} durationInFrames={timing.starts[7]-timing.starts[6]}><Context/></Sequence>
 <Sequence name="08 Encerramento" from={timing.starts[7]} durationInFrames={60}><Ending/></Sequence>
 <Sequence from={0} durationInFrames={timing.starts[7]}><Progress preview={preview}/></Sequence>
 <Soundtrack/>
 </AbsoluteFill>
};
