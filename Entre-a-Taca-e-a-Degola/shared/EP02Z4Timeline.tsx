import React from 'react';
import {Img,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
type Point={round:number;position?:number;state?:'outside'|'z4'};
// Exact ranks come from the user's latest list and the supplied title table.
// Round 9 and season-end have zone status only. Missing ranks are NOT counted
// from interpolated geometry: the 30/38 total is the approved narration datum.
const points:Point[]=[{round:1,position:7},{round:2,position:14},{round:7,position:18},{round:9,state:'outside'},{round:11,position:14},{round:12,position:16},{round:17,position:15},{round:18,position:16},{round:19,state:'z4'},{round:38,state:'z4'}];
const x=(r:number)=>64+(r-1)*622/37;
const y=(p:Point)=>p.position!==undefined?(p.position<17?42+(p.position-7)*8:180+(p.position-17)*38):(p.state==='outside'?114:237);

export const EP02Z4Timeline=({animated=false}:{animated?:boolean})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const progress=animated?interpolate(f,[.5*fps,3.9*fps],[0,1],clamp):1;
 const round=1+progress*37;const a=points.filter(p=>p.round<=round).at(-1)||points[0];const b=points.find(p=>p.round>round)||a;
 const cy=a===b?y(a):interpolate(round,[a.round,b.round],[y(a),y(b)],clamp),cx=x(round);
 const logo=staticFile('episodes/EP02/escudos/palmeiras.png');
 return <div style={{boxSizing:'border-box',background:'#EEEEF0',color:'#020C1F',padding:28,borderTop:'6px solid #FF0244',boxShadow:'0 12px 0 #0003'}}>
  <div style={{fontSize:28,fontWeight:600,color:'#FF0244',marginBottom:18}}>PALMEIRAS / BRASILEIRÃO 2012</div>
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><div><div style={{fontSize:96,lineHeight:1.1,fontWeight:700}}>30<span style={{fontSize:45}}> de 38</span></div><div style={{fontSize:37,fontWeight:600}}>rodadas no Z4</div></div><Img src={logo} style={{width:103,height:103,objectFit:'contain'}}/></div>
  <svg width="746" height="370" viewBox="0 0 746 370" style={{width:'100%',height:'auto',display:'block',marginTop:20}}>
   <defs><clipPath id="ep02-z4-reveal"><rect width={cx+1} height={312}/></clipPath></defs>
   <rect x="48" y="38" width="660" height="100" fill="#DCE1E8"/><rect x="48" y="155" width="660" height="150" fill="#FFDCE5"/>
   <text x="62" y="29" fontFamily="Poppins" fontSize="27" fontWeight="600" fill="#020C1F">FORA DO Z4</text><text x="651" y="183" fontFamily="Poppins" fontSize="27" fontWeight="700" fill="#FF0244">Z4</text>
   <path d="M48 155H708" stroke="#FF0244" strokeWidth="2" strokeDasharray="7 6"/>
   {[17,18,19,20].map(rank=><g key={rank}><text x="0" y={187+(rank-17)*38} fill="#020C1F" fontFamily="Poppins" fontSize="22">{rank}º</text><path d={`M48 ${180+(rank-17)*38}H708`} stroke="#BBC4D0" strokeWidth="1"/></g>)}
   <g clipPath="url(#ep02-z4-reveal)">
    {points.slice(0,-1).map((p,i)=><path key={p.round} d={`M${x(p.round)} ${y(p)}L${x(points[i+1].round)} ${y(points[i+1])}`} fill="none" stroke="#020C1F" strokeWidth="4" strokeLinejoin="round" strokeDasharray={points[i+1].round-p.round===1&&p.position!==undefined&&points[i+1].position!==undefined?undefined:'5 5'}/>)}
    {points.filter(p=>p.position!==undefined).map(p=><g key={p.round}><circle cx={x(p.round)} cy={y(p)} r="5" fill={p.position!>=17?'#FF0244':'#020C1F'} stroke="#EEEEF0" strokeWidth="1"/>{p.position!<17&&<text x={x(p.round)} y={y(p)+([1,12,18].includes(p.round)?27:-14)} textAnchor="middle" fontFamily="Poppins" fontSize="21" fontWeight="600" fill="#020C1F">{p.position}º</text>}</g>)}
   </g>
   <path d={`M${cx} 38V305`} stroke="#FF0244" strokeWidth="2" opacity=".4"/><circle cx={cx} cy={cy} r="27" fill="#EEEEF0" stroke="#FF0244" strokeWidth="2"/><foreignObject x={cx-24} y={cy-24} width="48" height="48"><Img src={logo} style={{width:48,height:48,objectFit:'contain'}}/></foreignObject>
   {[1,7,9,12,18,25,30,38].map(r=><text key={r} x={x(r)} y="339" textAnchor="middle" fill="#020C1F" fontFamily="Poppins" fontSize="24">{r}</text>)}<text x="708" y="367" textAnchor="end" fill="#020C1F" fontFamily="Poppins" fontSize="24">RODADA</text>
  </svg>
  <div style={{fontSize:26,lineHeight:1.25,marginTop:8}}>Pontos: posições informadas.<br/>Tracejado: ligações ilustrativas.</div>
 </div>;
};
