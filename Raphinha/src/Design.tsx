import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {average,decimal, groups, integer, matches, minutesPerGame, per90, seasons} from './data';
import {SportsBall} from './SportsBall';
import {MotionContext,MotionLayer,MusicProgress,NumberReveal,reveal,useMotion,useArtistic} from './Motion';
import {ArtActor,AttackDiagram,GoalAndPass,PaperGrain,PhotoCard} from './ArtMotion';

for (const [weight,file] of [[400,'Regular'],[600,'SemiBold'],[700,'Bold']] as const) {
  loadFont({family:'Poppins',url:staticFile(`fonts/Poppins-${file}.ttf`),weight:String(weight)});
}

export const C={navy:'#020C1F',pink:'#FF0244',white:'#EEEEF0',muted:'#BEC8D6',line:'#34445D',panel:'#0B1A30'};
const photo=(name:string)=>staticFile(`photos/${name}.png`);
const brand=(name:string)=>staticFile(`brand/${name}.png`);
type Children={children:React.ReactNode};
const position=(left:number,top:number,width?:number):React.CSSProperties=>({position:'absolute',left,top,width});

export const Text=({children,x=90,y,w=810,size=44,weight=400,color=C.white,line=1.25,style={}}:Children & {x?:number;y:number;w?:number;size?:number;weight?:number;color?:string;line?:number;style?:React.CSSProperties})=>{
 const f=useCurrentFrame(),{fps}=useVideoConfig(),motion=useMotion();
 const active=motion.enabled&&!motion.preserveFirst&&y<1400;
 const at=y<550?0:Math.min(.9,.3+(y-550)/1800)*fps;
 return <div data-safe data-text style={{...position(x,y,w),fontSize:size,fontWeight:weight,lineHeight:line,color,opacity:active?reveal(f,at,at+11):1,translate:active?`0px ${interpolate(reveal(f,at,at+15),[0,1],[16,0])}px`:'0px 0px',...style}}>{children}</div>;
};
export const Heading=({first,second,third,size=104,y=310}:{first:string;second:string;third?:string;size?:number;y?:number})=><Text y={y} size={size} weight={700} line={1.04} style={{letterSpacing:-2.8}}><div>{first}</div><div style={{color:C.pink}}>{second}</div>{third&&<div>{third}</div>}</Text>;
const Rule=({y,w=114}:{y:number;w?:number})=>{const f=useCurrentFrame(),motion=useMotion();return <div style={{...position(90,y,w*(motion.enabled&&!motion.preserveFirst?reveal(f,5,21):1)),height:5,background:C.pink}}/>;};
const Photo=({name,x=0,y=0,w=1080,h=1920,focus='50% 50%',fade=false,opacity=1}:{name:string;x?:number;y?:number;w?:number;h?:number;focus?:string;fade?:boolean;opacity?:number})=>{const f=useCurrentFrame(),motion=useMotion(),art=useArtistic();if(art&&w<1000)return <PhotoCard name={name} x={x} y={y} w={w} h={h} focus={focus} angle={name==='2147870466'?-1.7:1.7}/>;return <div style={{...position(x,y,w),height:h,overflow:'hidden',opacity}}><Img src={photo(name)} style={{width:w,height:h,objectFit:'cover',objectPosition:focus,scale:motion.enabled?1+(art?.09:.035)*Math.min(1,f/Math.max(1,motion.duration)):1}}/>{fade&&<AbsoluteFill style={{background:'linear-gradient(180deg,#020c1f05 0%,#020c1f33 35%,#020c1fcc 75%,#020c1f 100%)'}}/>}</div>;};

const Footer=({chapter=1,source,note='2026/27 parcial · análise Sportsmatch'}:{chapter?:number;source?:string;note?:string})=><>
  <Text y={1420} size={28} color={C.muted} line={1.22}>Dados by @sportsmatch.br<br/>{source??note}</Text>
  <MusicProgress chapter={chapter}/>
</>;

export const Shell=({children,kicker='O PARADOXO DE RAPHINHA',chapter=1,source,note}:Children&{kicker?:string;chapter?:number;source?:string;note?:string})=>{const art=useArtistic();return <AbsoluteFill data-artboard style={{background:C.navy,color:C.white,fontFamily:'Poppins',overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 100% 25%,#13223d66,transparent 65%)'}}/>
  <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity:.18}}><path d="M970 0V1920M1010 0V1920" stroke={C.line}/></svg>
  {art&&<PaperGrain/>}
  {children}
  <Img src={brand('watermark')} style={{...position(776,90,125),height:125,opacity:.27}}/>
  <Text y={247} size={28} weight={600} color={C.pink} style={{letterSpacing:1.1}}>{kicker}</Text>
  <Footer chapter={chapter} source={source} note={note}/>
</AbsoluteFill>;};

export const GoalIcon=({size=42}:{size?:number})=><SportsBall kind={1} size={size}/>;
export const AssistIcon=({size=42,color=C.white}:{size?:number;color?:string})=><svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-label="assistência"><circle cx="8" cy="28" r="4" fill={color}/><path d="M10 19Q20 5 32 12M23 8l10 4-4 10" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export const Cover=()=> <Shell kicker="INSTAPLAYSSS / ESPECIAL RAPHINHA" note="Barcelona × Brasil · desde 2023/24">
  <div style={{...position(350,690,600),fontSize:640,fontWeight:700,lineHeight:1,color:'transparent',WebkitTextStroke:'2px #33445d',opacity:.3}}>11</div>
  <Text y={310} size={100} weight={700} line={1.05} style={{letterSpacing:-3}}><div>O <span style={{color:C.pink}}>PARADOXO</span></div><div>DE RAPHINHA:</div></Text>
  <Text y={568} size={45} weight={600} line={1.3}>por que o protagonismo<br/>do Barça não se repete<br/>na Seleção?</Text>
  <Rule y={791}/>
  <Img src={photo('raphinha-portrait')} style={{...position(290,830,715),height:844,objectFit:'contain',filter:'drop-shadow(0 8px 22px #0007)',maskImage:'linear-gradient(black 65%,transparent 96%)'}}/>
  <Text y={1015} w={280} size={34} weight={600}>DOIS<br/>CONTEXTOS.<br/><span style={{color:C.pink}}>UM JOGADOR.</span></Text>
  <svg style={{...position(160,1180,220),height:160}} viewBox="0 0 220 160" fill="none"><path d="M15 5Q10 105 165 108m-28-18 31 19-30 19" stroke={C.pink} strokeWidth="4" strokeLinecap="round"/></svg>
</Shell>;

export const Hook=()=> <Shell chapter={1} note="Uma pergunta · dois contextos">
  <Heading first="MUDA A CAMISA." second="E O IMPACTO?" size={96}/>
  <Rule y={550}/>
  <div style={{...position(90,620,810),height:680,overflow:'hidden',borderRadius:4}}>
    <Photo name="barcelona-action" x={0} y={0} w={405} h={680} focus="54% 40%"/>
    <Photo name="brasil-action" x={405} y={0} w={405} h={680} focus="45% 45%"/>
    <AbsoluteFill style={{background:'linear-gradient(transparent 45%,#020c1ff0)'}}/>
    <div style={{...position(403,0,4),height:680,background:C.pink}}/>
  </div>
  <Text y={1190} x={115} w={350} size={42} weight={700}>BARCELONA</Text><Text y={1190} x={540} w={330} size={42} weight={700}>BRASIL</Text>
  <Text y={1320} size={39} color={C.muted}>O mesmo jogador. Papéis em discussão.</Text>
</Shell>;

export const Season=()=> {const art=useArtistic();return <Shell kicker="BARCELONA / 2026/27 · PARCIAL" chapter={2} note="14 jogos · 1.014 minutos · 12 titularidades">
  <Heading first="PROTAGONISMO" second="EM NÚMEROS." size={94}/><Rule y={545}/>
  <Text y={580} size={39} weight={600}>14 jogos <span style={{color:C.line}}> / </span> 12 titularidades</Text>
  <ArtActor><Img src={photo('raphinha-cutout')} style={{...position(75,680,470),height:847,objectFit:'contain',filter:art?'drop-shadow(3px 0 0 #EEEEF0) drop-shadow(-3px 0 0 #EEEEF0) drop-shadow(0 12px 24px #0008)':'drop-shadow(0 12px 24px #0008)',maskImage:'linear-gradient(black 60%,transparent 82%)'}}/></ArtActor>
  <Text x={555} y={670} w={345} size={192} weight={700} color={C.pink} line={1}><NumberReveal value={19} at={1.1} duration={1.1}/></Text>
  <Text x={565} y={865} w={330} size={41} weight={600}>GOLS</Text>
  <Text x={555} y={933} w={345} size={154} weight={700} line={1}><NumberReveal value={3} at={2.4} duration={.8}/></Text>
  <Text x={565} y={1085} w={335} size={36} weight={600}>ASSISTÊNCIAS</Text>
  <MotionLayer at={6.8}><div style={{...position(90,1225,810),height:160,background:C.panel,borderTop:`3px solid ${C.pink}`}}/>
  <Text x={115} y={1250} w={350} size={73} weight={700} line={1}>22 <span style={{fontSize:28,fontWeight:400}}>participações</span></Text>
  <Text x={115} y={1330} w={340} size={30} color={C.muted}>em gols</Text>
  <Text x={490} y={1250} w={370} size={73} weight={700} color={C.pink} line={1}>46 <span style={{fontSize:34}}>min</span></Text>
  <Text x={490} y={1330} w={380} size={30} color={C.muted}>por participação ≈</Text>
  </MotionLayer>
  {art&&<GoalAndPass/>}
</Shell>;};

export const Timeline=({group=0}:{group:number})=>{
  const [start,end]=groups[group];const visible=matches.slice(start,end);
  const total=matches.slice(0,end).reduce((a,m)=>({goals:a.goals+m.goals,assists:a.assists+m.assists}),{goals:0,assists:0});
  const xs=visible.length===2?[300,690]:[220,495,770];
  return <Shell chapter={3} kicker="BARCELONA / SEQUÊNCIA DAS PARTIDAS · 2026" note="11 partidas listadas · calendário incompleto">
    <Heading first={group===2?'DOIS JOGOS.':'A LISTA'} second={group===2?'DOIS HAT-TRICKS.':'CRESCE.'} size={group===2?86:106}/>
    <Text y={568} size={28} weight={600} color={C.muted}>ACUMULADO NAS PARTIDAS LISTADAS</Text>
    <Text y={615} w={350} size={151} weight={700} color={C.pink} line={1}>{String(total.goals).padStart(2,'0')}</Text>
    <Text y={765} w={350} size={33} weight={600}>GOLS</Text>
    <Text x={530} y={615} w={370} size={151} weight={700} line={1}>{String(total.assists).padStart(2,'0')}</Text>
    <Text x={530} y={765} w={370} size={33} weight={600}>ASSISTÊNCIAS</Text>
    <svg style={{position:'absolute',top:1020,left:90}} width="810" height="40"><path d="M0 20H810" stroke={C.line} strokeWidth="3"/><path d="M0 20H810" stroke={C.pink} strokeWidth="3" strokeDasharray="4 9"/></svg>
    {visible.map((m,i)=><React.Fragment key={m.name}>
      <Text x={xs[i]-125} y={885} w={250} size={37} weight={600} line={1.2} style={{textAlign:'center',whiteSpace:'pre-line'}}>{m.name}</Text>
      {i===visible.length-1?<div style={{...position(xs[i]-32,1008,64),height:64}}><SportsBall size={64}/></div>:<div style={{...position(xs[i]-27,1013,54),height:54,borderRadius:'50%',background:C.navy,border:`3px solid ${C.pink}`,boxSizing:'border-box'}}/>}
      <Text x={xs[i]-100} y={1085} w={200} size={38} weight={600} style={{textAlign:'center'}}>{m.date}</Text>
      <div data-safe style={{...position(xs[i]-110,1175,220),display:'flex',justifyContent:'center',alignItems:'center',gap:12,fontSize:48,fontWeight:700}}><GoalIcon/><span>{m.goals}</span><AssistIcon/><span>{m.assists}</span></div>
      {(m.goals===3||m.assists===2)&&<Text x={xs[i]-125} y={1260} w={250} size={28} weight={600} color={C.pink} style={{textAlign:'center'}}>{m.goals===3?'HAT-TRICK':'2 ASSISTÊNCIAS'}</Text>}
    </React.Fragment>)}
    <div data-safe style={{...position(90,1340,810),display:'flex',alignItems:'center',gap:15,fontSize:28,color:C.muted}}><GoalIcon size={32}/><span>Gol</span><AssistIcon size={32}/><span>Assistência</span><span style={{marginLeft:'auto'}}>SEQUÊNCIA {group+1}/4</span></div>
  </Shell>;
};

export const Selection=()=> <Shell chapter={4} note="Barcelona × Brasil · pergunta editorial">
  <Photo name="brasil-action" y={520} h={1040} focus="43% 45%" fade opacity={.8}/>
  <Heading first="E NA" second="SELEÇÃO?" size={115}/><Rule y={578}/>
  <div style={{...position(90,1080,810),height:270,background:'#020c1fe8',borderLeft:`5px solid ${C.pink}`}}/>
  <Text x={125} y={1110} w={740} size={49} weight={600}>O protagonismo no clube<br/>abre uma pergunta.<br/><span style={{color:C.pink}}>A resposta exige contexto.</span></Text>
</Shell>;

const Chart=()=>{
  const f=useCurrentFrame(),motion=useMotion(),p=motion.enabled?reveal(f,25,175):1;
  const xs=[180,390,600,810],y=(v:number)=>1100-v*210;
  return <svg style={{position:'absolute',left:0,top:0}} width="1080" height="1400" role="img" aria-label="Participações em gols por 90 minutos, Barcelona e Brasil, quatro períodos">
    {[0,.5,1,1.5,2].map(v=><g key={v}><path d={`M165 ${y(v)}H850`} stroke={C.line} strokeWidth="2" strokeDasharray={v===0?'0':'4 8'}/><text x="142" y={y(v)+10} textAnchor="end" fontSize="28" fill={C.muted}>{v.toFixed(1).replace('.',',')}</text></g>)}
    <defs><clipPath id="comparison-reveal"><rect x="150" y="600" width={40+710*p} height="560"/></clipPath></defs>
    <g clipPath="url(#comparison-reveal)"><path d={`M${seasons.map((s,i)=>`${xs[i]} ${y(per90(s.barca))}`).join('L')}`} fill="none" stroke={C.pink} strokeWidth="7"/>
    <path d={`M${seasons.map((s,i)=>`${xs[i]} ${y(per90(s.brasil))}`).join('L')}`} fill="none" stroke={C.white} strokeWidth="6" strokeDasharray="13 9"/></g>
    {seasons.map((s,i)=><g key={s.label} opacity={motion.enabled?reveal(f,25+i*35,39+i*35):1}>
      <circle cx={xs[i]} cy={y(per90(s.barca))} r="11" fill={C.navy} stroke={C.pink} strokeWidth="5"/>
      <rect x={xs[i]-9} y={y(per90(s.brasil))-9} width="18" height="18" fill={C.white}/>
      <text x={xs[i]} y={y(per90(s.barca))-29} textAnchor="middle" fill={C.pink} fontSize="43" fontWeight="700">{decimal(per90(s.barca))}</text>
      <text x={xs[i]} y={y(per90(s.brasil))+55} textAnchor="middle" fill={C.white} fontSize="41" fontWeight="600">{decimal(per90(s.brasil))}</text>
      <text x={xs[i]} y="1165" textAnchor="middle" fill={C.muted} fontSize="30">{s.label}</text>
    </g>)}
  </svg>;
};
export const Comparison=()=> <Shell chapter={5} kicker="COMPARAÇÃO / DESDE 2023/24" note="*2026/27 parcial · gols + assistências">
  <Heading first="A DISTÂNCIA" second="NOS NÚMEROS." size={96}/>
  <Text y={548} size={35} weight={600}>Participações em gols por 90 minutos</Text>
  <Chart/>
  <div data-safe style={{...position(90,1200,810),display:'flex',alignItems:'center',gap:20,fontSize:34,fontWeight:600}}><span style={{color:C.pink}}>● Barcelona</span><span style={{marginLeft:40}}>■ Brasil</span></div>
  <Text y={1295} size={38} color={C.muted}>Taxas por tempo em campo.<br/>Contextos e amostras diferentes.</Text>
</Shell>;

export const Samples=()=> <Shell chapter={5} kicker="COMPARAÇÃO / TEMPO EM CAMPO POR APARIÇÃO" note="*2026/27 parcial · valores em minutos por jogo">
  <Heading first="MÉDIA DE" second="MINUTOS." size={108}/>
  <Text y={580} size={36}>Por jogo · total de minutos ÷ jogos disputados</Text>
  <div style={{...position(90,680,810),height:470,borderTop:`3px solid ${C.pink}`}}/>
  <Text y={710} x={110} w={250} size={30} color={C.muted}>TEMPORADA</Text><Text x={390} y={710} w={240} size={30} color={C.pink} weight={600}>BARCELONA</Text><Text x={700} y={710} w={200} size={30} weight={600}>BRASIL</Text>
  {seasons.map((s,i)=><React.Fragment key={s.label}>
    <div style={{...position(90,878+i*112,810),height:1,background:C.line}}/>
    <Text x={110} y={795+i*112} w={250} size={35} weight={600}>{s.label}</Text>
    <Text x={390} y={780+i*112} w={270} size={43} weight={700} color={C.pink}>{average(minutesPerGame(s.barca))} <span style={{fontSize:28,fontWeight:400}}>min</span></Text>
    <Text x={700} y={780+i*112} w={200} size={43} weight={700}>{average(minutesPerGame(s.brasil))} <span style={{fontSize:28,fontWeight:400}}>min</span></Text>
    <Text x={390} y={835+i*112} w={270} size={28} color={C.muted}>{integer(s.barca.minutes)} ÷ {s.barca.games}</Text>
    <Text x={700} y={835+i*112} w={200} size={28} color={C.muted}>{integer(s.brasil.minutes)} ÷ {s.brasil.games}</Text>
  </React.Fragment>)}
  <Text y={1270} size={36} weight={600}>Quanto ele joga a cada aparição.<br/><span style={{color:C.muted}}>Produção por 90 é outra medida.</span></Text>
</Shell>;

const Pitch=({free=false}:{free?:boolean})=>{const f=useCurrentFrame(),motion=useMotion(),p=motion.enabled?reveal(f,18,65):1;const fx=motion.enabled?interpolate(f,[25,75,125,180],[680,140,405,405],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):405;return <svg style={{...position(90,1000,810),height:350}} viewBox="0 0 810 350" role="img" aria-label="Diagrama ilustrativo de ocupação ofensiva, sem dados de rastreamento">
  <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke={C.pink} strokeWidth="1.5"/></marker></defs>
  <rect x="3" y="25" width="804" height="310" rx="4" fill={C.panel} stroke={C.line} strokeWidth="3"/>
  <path d="M275 25v95h260V25M350 25v40h110V25M365 25V8h80v17M355 120a58 58 0 0 0 100 0M335 335a70 70 0 0 1 140 0" fill="none" stroke={C.line} strokeWidth="3"/>
  {free?<>
    <path d="M405 270Q220 270 140 140M405 270Q590 245 680 140M405 270V145" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} fill="none" stroke={C.pink} strokeWidth="5" markerEnd="url(#arrow)"/>
    {[140,405,680].map((x,i)=><g key={x} opacity={motion.enabled?.22:1}><circle cx={x} cy={i===1?135:130} r="26" fill={C.navy} stroke={C.pink} strokeWidth="3"/><text x={x} y={i===1?145:140} fontSize="28" fontWeight="700" fill={C.white} textAnchor="middle">R</text></g>)}
    {motion.enabled&&<g opacity={p}><circle cx={fx} cy="135" r="26" fill={C.pink}/><text x={fx} y="145" fontSize="28" fontWeight="700" fill={C.white} textAnchor="middle">R</text></g>}
    <text x="135" y="210" textAnchor="middle" fill={C.muted} fontSize="27">ESQUERDA</text><text x="405" y="200" textAnchor="middle" fill={C.muted} fontSize="27">CENTRO</text><text x="680" y="210" textAnchor="middle" fill={C.muted} fontSize="27">DIREITA</text>
  </>:<><path d="M680 270V125" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p} fill="none" stroke={C.pink} strokeWidth="5" markerEnd="url(#arrow)"/><g style={{translate:motion.enabled?`0px ${interpolate(p,[0,1],[30,-35])}px`:'0px 0px'}}><circle cx="680" cy="240" r="29" fill={C.pink}/><text x="680" y="250" textAnchor="middle" fontSize="29" fontWeight="700" fill={C.white}>R</text></g><text x="450" y="255" textAnchor="middle" fill={C.muted} fontSize="29">PONTA DIREITA</text></>}
</svg>;};

export const Tactics=({coach='xavi'}:{coach:'xavi'|'flick'})=>{
  const free=coach==='flick';
  return <Shell chapter={6} kicker={free?'HIPÓTESE TÁTICA / COM HANSI FLICK':'HIPÓTESE TÁTICA / COM XAVI'} source="Ilustração tática · hipótese editorial">
    <Heading first={free?'MAIS':'MAIS À'} second={free?'LIBERDADE.':'DIREITA.'} size={108}/>
    <Photo name={free?'GettyImages-2294364008':'2147870466'} x={90} y={585} w={810} h={340} focus="50% 0%"/>
    <Text y={944} size={32} color={C.muted}>{free?'Pelos lados, entrelinhas e pelo centro.':'Atuação mais concentrada no lado direito.'}</Text>
    <Pitch free={free}/>
    <Text y={1370} size={29} color={C.muted}>{free?'Setas indicam possibilidades de ocupação.':'Direção do ataque: de baixo para cima.'}</Text>
  </Shell>;
};

export const Context=({central=false}:{central?:boolean})=> <Shell chapter={6} kicker="CONTEXTO TÁTICO / COM ANCELOTTI" source="Leitura editorial · diagramas ilustrativos">
  <Heading first={central?'DIREITA E':'MAIS À DIREITA.'} second={central?'ATAQUE EM DUPLA.':'TAMBÉM EM DUPLA.'} size={82}/><Rule y={525}/>
  <Photo name="O3CYRXSI55DKPLDA56D27M4BRI" x={90} y={570} w={810} h={325} focus="50% 18%"/>
  <Text y={925} size={36} weight={600}>{central?<>Mais centralizado, em dupla com Vini Jr.<br/>Também utilizado pela direita.</>:<>Na Seleção, mais pela direita; também<br/>no ataque ao lado de Vini Jr.</>}</Text>
  <Text y={1030} size={28} color={C.muted}>QUANDO ATUA COMO ATACANTE</Text>
  {[{x:90,label:'BRASIL',duo:true},{x:515,label:'BARCELONA',duo:false}].map(({x,label,duo})=><React.Fragment key={label}>
    <Text x={x} y={1080} w={385} size={31} weight={600} color={duo?C.white:C.pink} style={{textAlign:'center'}}>{label}</Text>
    <AttackDiagram x={x} duo={duo}/>
  </React.Fragment>)}
  <Text y={1345} size={32} weight={600}>No Barça, geralmente sem dupla fixa.</Text>
</Shell>;

export const Closing=()=> {const art=useArtistic();return <Shell chapter={7} note="Diferença de produção ≠ causa comprovada">
  {art?<PhotoCard name="brasil-action" x={105} y={800} w={780} h={275} focus="43% 0%" angle={-1.5} zoom={1.7} panY={30}/>:<Photo name="brasil-action" y={570} h={1050} focus="43% 35%" fade opacity={.7}/>}
  <Text y={310} size={96} weight={700} line={1.04} style={{letterSpacing:-2.6}}>O BRASIL<br/>APROVEITA<br/><span style={{color:C.pink}}>O RAPHINHA</span><br/>QUE TEM?</Text>
  <Rule y={758}/>
  <Conclusion/>
</Shell>;};

const Conclusion=()=>{
 const f=useCurrentFrame(),motion=useMotion(),{fps}=useVideoConfig();
 return <MotionContext.Provider value={{...motion,enabled:false}}>
  <div style={{...position(90,1105,810),height:265,background:'#020c1fee',borderLeft:`4px solid ${C.pink}`,opacity:motion.enabled?reveal(f,0,12):1}}/>
  {[{text:'Os números mostram a diferença',y:1135,at:.1,color:C.white},{text:'mas ainda não conseguem',y:1203,at:1.1,color:C.white},{text:'explicar a causa...',y:1271,at:2.1,color:C.pink}].map(line=><Text key={line.text} x={115} y={line.y} w={760} size={43} weight={600} color={line.color} style={{opacity:motion.enabled?reveal(f,line.at*fps,line.at*fps+14):1,translate:motion.enabled?`0px ${interpolate(reveal(f,line.at*fps,line.at*fps+18),[0,1],[20,0])}px`:'0px 0px'}}>{line.text}</Text>)}
 </MotionContext.Provider>;
};

export const Ending=()=> <AbsoluteFill data-artboard style={{background:C.navy,color:C.white,fontFamily:'Poppins'}}>
  <div style={{...position(90,790,810),display:'flex',justifyContent:'center',gap:28,alignItems:'center'}}>
    <SportsBall kind={0} size={50}/><SportsBall kind={1} size={50}/><SportsBall kind={2} size={50}/>
  </div>
  <Img src={brand('signature')} style={{...position(170,915,650),height:137,objectFit:'contain'}}/>
  <Text y={1145} size={29} weight={600} color={C.muted} style={{textAlign:'center',letterSpacing:2}}>INSTAPLAYSSS</Text>
</AbsoluteFill>;
