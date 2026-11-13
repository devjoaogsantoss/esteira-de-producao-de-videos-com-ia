import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {EP02Screen,ep02Labels} from '../shared/EP02Screen';

const Gallery=()=>{
 const [screen,setScreen]=useState(0);
 return <div className="interactive"><div className="viewer"><Player key={screen} component={EP02Screen} inputProps={{screen,animated:true}} compositionWidth={1080} compositionHeight={1920} durationInFrames={240} fps={30} controls loop style={{width:'100%'}}/></div><div className="choose"><h2>Palmeiras · 2012</h2><p>Selecione a tela e pressione ▶ para ver o movimento.</p><label htmlFor="scene">Tela para revisar</label><select id="scene" value={screen} onChange={e=>setScreen(Number(e.target.value))}>{ep02Labels.map((label,i)=><option key={label} value={i}>{String(i+1).padStart(2,'0')} · {label}</option>)}</select><p>Estudos visuais de 8 segundos. O vídeo completo usa a locução recebida e a trilha aprovada.</p><p className="note">A tabela reproduz o print enviado. No gráfico do Z4, os pontos são posições informadas e os trechos tracejados são ligações ilustrativas. O total de 30/38 segue a locução.</p><h3>Locução recebida</h3><audio controls preload="metadata" src="EP02_Narracao_Aprovada.mp3" style={{maxWidth:'100%'}}/><p className="note">57,73s · arquivo original preservado.</p></div></div>;
};
createRoot(document.getElementById('player')!).render(<Gallery/>);
