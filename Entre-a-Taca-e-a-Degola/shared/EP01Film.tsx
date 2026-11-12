import React from 'react';
import {AbsoluteFill, Freeze, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {Screen} from './RevisedScreen';
import timing from './film-timing.json';
import pulse from './film-music-pulse.json';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const FilmScene = ({screen}: {screen: number}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const warp = (timing.warp as Record<string, {actual: number[]; design: number[]}>)[String(screen)];
  const mapped = warp ? Math.round(interpolate(frame / fps, warp.actual, warp.design, clamp) * fps) : frame;
  return <AbsoluteFill style={{opacity: screen === 0 ? 1 : interpolate(frame, [0, .2 * fps], [0, 1], clamp)}}>
    <Freeze frame={mapped}><Screen screen={screen} animated filmMode/></Freeze>
  </AbsoluteFill>;
};

const MusicProgress = () => {
  const f = useCurrentFrame(); const {durationInFrames, fps} = useVideoConfig();
  if (f >= timing.endingStartSeconds * fps) return null;
  const p = f / (durationInFrames - 1), count = 78;
  return <div style={{position: 'absolute', left: 90, top: 1580, width: 810, fontFamily: 'Poppins'}}>
    <div style={{fontSize: 25, color: '#9BA8BB', display: 'flex', justifyContent: 'space-between'}}><span>INSTAPLAYSSS / SPORTSMATCH</span><span style={{color: '#FF0244'}}>{Math.round(p * 100)}%</span></div>
    <div style={{height: 35, marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>{Array.from({length: count}, (_, i) => <div key={i} style={{width: 5, height: 5 + (pulse[Math.max(0, Math.min(pulse.length - 1, f - i % 4))] || 0) * (12 + i % 5 * 4), borderRadius: 4, background: i / (count - 1) <= p ? '#FF0244' : '#304056'}}/>)}</div>
  </div>;
};

export const EP01Film = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#020C1F'}}>
    <Sequence name="01 Capa · gancho e dois clubes" from={0} durationInFrames={Math.round(5 * fps) + 6}><FilmScene screen={0}/></Sequence>
    <Sequence name="02 Grêmio · caminho até a final" from={Math.round(5 * fps)} durationInFrames={Math.round(13.85 * fps) - Math.round(5 * fps) + 6}><FilmScene screen={1}/></Sequence>
    <Sequence name="03 Grêmio · oito rodadas no Z4" from={Math.round(13.85 * fps)} durationInFrames={Math.round(18.5 * fps) - Math.round(13.85 * fps) + 6}><FilmScene screen={2}/></Sequence>
    <Sequence name="04 Grêmio · comparação de aproveitamento" from={Math.round(18.5 * fps)} durationInFrames={Math.round(25.6 * fps) - Math.round(18.5 * fps) + 6}><FilmScene screen={3}/></Sequence>
    <Sequence name="05 Grêmio · queda na tabela" from={Math.round(25.6 * fps)} durationInFrames={Math.round(30.95 * fps) - Math.round(25.6 * fps) + 6}><FilmScene screen={4}/></Sequence>
    <Sequence name="06 Vasco · duas semifinais" from={Math.round(30.95 * fps)} durationInFrames={Math.round(35.55 * fps) - Math.round(30.95 * fps) + 6}><FilmScene screen={5}/></Sequence>
    <Sequence name="07 Vasco · doze rodadas no Z4" from={Math.round(35.55 * fps)} durationInFrames={Math.round(40.1 * fps) - Math.round(35.55 * fps) + 6}><FilmScene screen={6}/></Sequence>
    <Sequence name="08 Vasco · subida ao 13º lugar" from={Math.round(40.1 * fps)} durationInFrames={Math.round(46.1 * fps) - Math.round(40.1 * fps) + 6}><FilmScene screen={7}/></Sequence>
    <Sequence name="09 Vasco · comparação de aproveitamento" from={Math.round(46.1 * fps)} durationInFrames={Math.round(53.15 * fps) - Math.round(46.1 * fps) + 6}><FilmScene screen={8}/></Sequence>
    <Sequence name="10 Perguntas · escrita acompanhando a voz" from={Math.round(53.15 * fps)} durationInFrames={Math.round(57.7 * fps) - Math.round(53.15 * fps) + 6}><FilmScene screen={9}/></Sequence>
    <Sequence name="11 Encerramento original · bolas e assinatura" from={Math.round(57.7 * fps)} durationInFrames={Math.round(2 * fps)}><FilmScene screen={10}/></Sequence>
    <MusicProgress/>
    <Audio src={staticFile('episodes/EP01/EP01_Mix_Final.wav')}/>
  </AbsoluteFill>;
};
