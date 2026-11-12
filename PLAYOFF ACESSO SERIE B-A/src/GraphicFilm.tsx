import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {Audio} from '@remotion/media';
import {Cover,Ending} from './Sportsmatch';
import {Base,PhotoPlate,Watermark,EyebrowG,CreditG,HeroG,FadeG,SlotG,DirectDiagramG,PlayoffDiagramG,SharedPlaceG,ReturnArrowsG,CrestG,RevisionTimeline,GC,gx,ease} from './GraphicRevision';
import timing from './timing.json';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;

const TitleLayer:React.FC<{start:number;lines:{text:string;pink?:boolean;size?:number}[]}>=({start,lines})=>{
 const f=useCurrentFrame();return <HeroG frame={f-start} lines={lines}/>;
};

// One continuous coordinate system carries the access boundary and the two slots
// from the direct-promotion explanation into the playoff explanation.
const RulesRevision:React.FC=()=>{
 const f=useCurrentFrame()+30;
 const collapse=ease(f,296,312);const playoff=ease(f,309,320);
 return <Base>
 <PhotoPlate name="cbf" frame={f-30}/><PhotoPlate name="fortaleza-photo" frame={Math.max(0,f-281)} opacity={ease(f,280,296)}/><Watermark/><EyebrowG/>
 {f<281?<HeroG frame={f-30} lines={[{text:'O ACESSO',size:110},{text:'MUDOU.',size:115,pink:true}]}/>:<HeroG frame={f-281} introTop={305} lines={[{text:'COMO',size:100},{text:'FUNCIONAM',size:100},{text:'OS PLAYOFFS?',size:104,pink:true}]}/>}
 <DirectDiagramG globalFrame={f} compact={collapse} hideHeading={f>=281}/>
 <FadeG frame={f} at={125} style={{position:'absolute',left:90,top:740,width:810,opacity:(1-ease(f,154,160))*ease(f,125,135)}}><div data-safe style={{fontSize:57,fontWeight:700,color:GC.pink}}>AGORA, TEM PLAYOFF!</div></FadeG>
 <div style={{opacity:playoff}}><PlayoffDiagramG globalFrame={f} showDirectSummary={false}/></div>
 {/* The same horizontal access line becomes the two vertical playoff paths. */}
 {f>=294&&f<346&&<svg style={{position:'absolute',left:0,top:0,overflow:'visible'}} width="1080" height="1430"><g stroke={GC.pink} strokeWidth="3" fill="none" opacity={1-ease(f,333,346)}>{[282.5,707.5].map(x=><path key={x} d={`M${interpolate(collapse,[0,1],[90,x])} ${interpolate(collapse,[0,1],[1034,980])}L${interpolate(collapse,[0,1],[900,x])} ${interpolate(collapse,[0,1],[1034,1150])}`}/>)}</g></svg>}
 <CreditG>Formato: ge • 05/02/2026</CreditG>
 </Base>
};

const NovorizontinoRevision:React.FC=()=>{
 const local=useCurrentFrame();const f=local+524;const rise=ease(f,575,594);
 return <Base><PhotoPlate name="novorizontino" frame={local} focus="50% 22%"/><Watermark/><EyebrowG/>
 <HeroG frame={local} lines={[{text:'NOVORIZONTINO',size:96,introSize:96},{text:'NA SÉRIE A!',size:110,pink:true}]}/>
 <FadeG frame={local} at={26}><SlotG x={150} y={720} width={690} height={310} direct/>
 <div data-safe style={{position:'absolute',left:225,top:interpolate(rise,[0,1],[1140,885]),width:540,height:108,borderRadius:18,background:GC.white,color:GC.navy,textAlign:'center',fontSize:40,fontWeight:700,lineHeight:1.1,paddingTop:10}}>ACESSO<br/>GARANTIDO</div>
 <div style={{position:'absolute',left:90,top:1085,width:810,height:3,background:GC.pink}}/>
 </FadeG>
 <CreditG>Fonte: CBF • 07/11/2026</CreditG></Base>
};

const SecondPlaceRevision:React.FC=()=>{
 const local=useCurrentFrame();const f=local+608;
 return <Base><PhotoPlate name="juventude" frame={local} split/><Watermark/><EyebrowG/>
 <HeroG frame={local} lines={[{text:'UMA VAGA',size:110},{text:'DIRETA',size:115,pink:true},{text:'EM JOGO.',size:110}]}/>
 <SharedPlaceG globalFrame={f}/><CreditG top={1410}>Disputa: CBF • 07/11/2026<br/>Posição: cenário fornecido</CreditG></Base>
};

const ClubDiagram:React.FC<{f:number;y:number;at:number;names:[string,string];crests:[string,string];status:string}>=({f,y,at,names,crests,status})=><FadeG frame={f} at={at}>
 <div data-safe style={{position:'absolute',left:90,top:y,width:580,height:300,boxSizing:'border-box',border:`2px solid ${GC.line}`,borderRadius:22,background:GC.panel}}>
 <div style={{position:'absolute',left:22,top:16,color:GC.pink,fontSize:28,fontWeight:600}}>{status}</div>
 {names.map((name,i)=><div key={name} style={{position:'absolute',left:i===0?14:326,top:70,width:235,textAlign:'center'}}><CrestG name={crests[i]} height={140}/><div data-safe style={{fontSize:34,lineHeight:1.15,fontWeight:700,marginTop:17,whiteSpace:'nowrap'}}>{name}</div></div>)}
 <div style={{position:'absolute',left:268,top:128,fontSize:56,lineHeight:1,fontWeight:700,color:GC.pink}}>×</div>
 <ReturnArrowsG x={234} y={78} width={114} spread={144}/>
 </div>
 <svg style={{position:'absolute',left:670,top:y+150,overflow:'visible'}} width="40" height="1"><path d="M0 0H40m-9-7 9 7-9 7" fill="none" stroke={GC.pink} strokeWidth="3"/></svg>
 <div data-safe style={{position:'absolute',left:710,top:y+58,width:190,height:184,border:`2px solid ${GC.pink}`,borderRadius:20,background:GC.navy,textAlign:'center',boxSizing:'border-box',paddingTop:19}}><div style={{fontSize:28,fontWeight:600,color:GC.pink}}>1 VAGA</div><div style={{fontSize:37,fontWeight:700,lineHeight:1.25,marginTop:10}}>SÉRIE A<br/><span style={{fontSize:48}}>2027</span></div></div>
</FadeG>;
const ConfrontationsRevision:React.FC=()=>{
 const local=useCurrentFrame();const f=local+722;
 return <Base><PhotoPlate name="fortaleza-photo" frame={local}/><Watermark/><EyebrowG/>
 <HeroG frame={local} lines={[{text:'DOIS DUELOS.',size:108},{text:'DUAS VAGAS.',size:110,pink:true}]}/>
 <FadeG frame={local} at={28} style={{position:'absolute',left:90,top:578,width:810}}><div data-safe style={{fontSize:36,fontWeight:600}}>Playoff de acesso à Série A 2027</div></FadeG>
 <ClubDiagram f={f} y={650} at={790} names={['VILA NOVA','CRB']} crests={['vila','crb']} status="NESTE CENÁRIO • PROJETADO"/>
 <ClubDiagram f={f} y={1000} at={912} names={['FORTALEZA','CRICIÚMA']} crests={['fortaleza','criciuma']} status="CONFRONTO CONFIRMADO"/>
 <FadeG frame={f} at={923} style={{position:'absolute',left:90,top:1330}}><div data-safe style={{fontSize:40}}>Ida e volta • uma vaga por duelo.</div></FadeG>
 <CreditG top={1410}>Confirmado: CBF • 07/11/2026<br/>Projeção: cenário fornecido</CreditG></Base>
};

const ContextRevision:React.FC=()=>{
 const local=useCurrentFrame();const f=local+998;
 return <Base><PhotoPlate name="cbf" frame={local}/><Watermark/><EyebrowG/>
 <HeroG frame={local} lines={[{text:'POR QUE',size:104},{text:'CRIAR OS',size:104},{text:'PLAYOFFS?',size:112,pink:true}]}/>
 <FadeG frame={f} at={1024} style={{position:'absolute',left:90,top:680,width:810}}>
 <div data-safe style={{display:'flex',alignItems:'baseline',gap:21}}><b style={{fontSize:126,lineHeight:1,color:GC.pink}}>17</b><b style={{fontSize:34}}>A FAVOR</b><span style={{fontSize:60,color:GC.line}}>/</span><b style={{fontSize:96,lineHeight:1}}>3</b><b style={{fontSize:34}}>CONTRA</b></div>
 <div data-safe style={{fontSize:40,marginTop:18}}>Votação no Conselho Técnico.</div>
 </FadeG>
 <FadeG frame={f} at={1110} style={{position:'absolute',left:90,top:925,width:810}}><div data-safe style={{fontSize:28,fontWeight:600,color:GC.pink}}>POSSÍVEIS GANHOS • LEITURA EDITORIAL</div><div data-safe style={{fontSize:42,lineHeight:1.3,fontWeight:600,marginTop:16}}>• Emoção e engajamento.<br/>• Apelo comercial e audiência.</div></FadeG>
 <FadeG frame={f} at={1250} style={{position:'absolute',left:90,top:1110,width:810}}><div data-safe style={{fontSize:30,fontWeight:600,marginBottom:14}}>REFERÊNCIAS INTERNACIONAIS</div>
 <div style={{display:'flex',gap:15}}>{[['championship','CHAMPIONSHIP','INGLATERRA'],['bundesliga','2. BUNDESLIGA','ALEMANHA'],['laliga','LALIGA 2','ESPANHA']].map(([mark,label,country],i)=><FadeG key={mark} frame={f} at={1250+i*9}><div data-safe style={{width:260,height:200,boxSizing:'border-box',borderRadius:18,background:GC.white,color:GC.navy,textAlign:'center',paddingTop:10}}><Img src={gx(mark)} style={{height:100,width:150,objectFit:'contain'}}/><div style={{fontSize:28,fontWeight:700,lineHeight:1.15,marginTop:6}}>{label}</div><div style={{fontSize:28,lineHeight:1.15,marginTop:7}}>{country}</div></div></FadeG>)}</div>
 <div data-safe style={{fontSize:36,marginTop:15}}>Cada liga tem seu formato.</div>
 </FadeG><CreditG>Votação: ge • 05/02/2026</CreditG></Base>
};

export const GraphicFilm:React.FC=()=> <Base>
 <Sequence name="01 Capa aprovada" from={0} durationInFrames={30}><Cover/></Sequence>
 <Sequence name="02–03 Acesso direto para playoffs • contínuo" from={30} durationInFrames={494}><RulesRevision/></Sequence>
 <Sequence name="04 Acesso garantido • Novorizontino" from={524} durationInFrames={84}><NovorizontinoRevision/></Sequence>
 <Sequence name="05 Uma vaga compartilhada • disputa em aberto" from={608} durationInFrames={114}><SecondPlaceRevision/></Sequence>
 <Sequence name="06 Diagramas dos confrontos • status preservados" from={722} durationInFrames={276}><ConfrontationsRevision/></Sequence>
 <Sequence name="07 Contexto • leitura editorial" from={998} durationInFrames={436}><ContextRevision/></Sequence>
 <Sequence name="08 Encerramento aprovado" from={1434} durationInFrames={60}><Ending/></Sequence>
 <Sequence name="Timeline discreta • percussão real" from={30} durationInFrames={1404}><TimelineGlobal/></Sequence>
 <Audio src={staticFile('audio/mix-final-2026.wav')}/>
 </Base>;
const TimelineGlobal:React.FC=()=>{const f=useCurrentFrame()+30;return <RevisionTimeline frame={f}/>};
