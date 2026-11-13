import React from 'react';
import {AbsoluteFill,Freeze,Sequence,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {EP02Screen} from './EP02Screen';
import timing from './ep02-film-timing.json';
import {EP02Progress} from './EP02Progress';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const FilmScene=({screen}:{screen:number})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const warp=(timing.warp as Record<string,{actual:number[];design:number[]}>)[String(screen)];
 const mapped=warp?Math.round(interpolate(f/fps,warp.actual,warp.design,clamp)*fps):f;
 return <AbsoluteFill style={{opacity:screen===0?1:interpolate(f,[0,.2*fps],[0,1],clamp)}}><Freeze frame={mapped}><EP02Screen screen={screen} animated filmMode/></Freeze></AbsoluteFill>;
};
export const EP02Film=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:'#020C1F'}}>
  <Sequence name="01 Capa · campeão e rebaixado" from={0} durationInFrames={Math.round(6.9*fps)+6}><FilmScene screen={0}/></Sequence>
  <Sequence name="02 Campanha invicta" from={Math.round(6.9*fps)} durationInFrames={Math.round(15.4*fps)-Math.round(6.9*fps)+6}><FilmScene screen={1}/></Sequence>
  <Sequence name="03 Copa · 81,8%" from={Math.round(15.4*fps)} durationInFrames={Math.round(19.8*fps)-Math.round(15.4*fps)+6}><FilmScene screen={2}/></Sequence>
  <Sequence name="04 Em paralelo ao título · tabela" from={Math.round(19.8*fps)} durationInFrames={Math.round(29.6*fps)-Math.round(19.8*fps)+6}><FilmScene screen={3}/></Sequence>
  <Sequence name="05 Comparação ao final do Brasileiro" from={Math.round(29.6*fps)} durationInFrames={Math.round(35.1*fps)-Math.round(29.6*fps)+6}><FilmScene screen={4}/></Sequence>
  <Sequence name="06 Trajetória no Z4" from={Math.round(35.1*fps)} durationInFrames={Math.round(39.9*fps)-Math.round(35.1*fps)+6}><FilmScene screen={5}/></Sequence>
  <Sequence name="07 36ª rodada · queda confirmada" from={Math.round(39.9*fps)} durationInFrames={Math.round(46.3*fps)-Math.round(39.9*fps)+6}><FilmScene screen={6}/></Sequence>
  <Sequence name="08 A taça veio. A queda também." from={Math.round(46.3*fps)} durationInFrames={Math.round(49.3*fps)-Math.round(46.3*fps)+6}><FilmScene screen={7}/></Sequence>
  <Sequence name="09 Perguntas escritas · opinião" from={Math.round(49.3*fps)} durationInFrames={Math.round(58.1*fps)-Math.round(49.3*fps)+6}><FilmScene screen={8}/></Sequence>
  <Sequence name="10 Encerramento original" from={Math.round(58.1*fps)} durationInFrames={Math.round(2*fps)}><FilmScene screen={9}/></Sequence>
  <EP02Progress/>
  <Audio src={staticFile('episodes/EP02/EP02_Mix_Final.wav')}/>
 </AbsoluteFill>;
};
