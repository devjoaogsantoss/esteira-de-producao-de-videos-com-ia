import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// Approved Série B V2 ending: same ball artwork, trajectories, stagger and
// signature spring. Only the asset path is adapted for this episode package.
const Ball = ({kind, delay}: {kind: number; delay: number}) => {
  const frame = useCurrentFrame(); const {fps} = useVideoConfig();
  const u = frame * 30 / fps - delay;
  const y = interpolate(u, [0, 9, 15, 22, 29, 33], [0, 170, 100, 170, 150, 170], clamp);
  const opacity = interpolate(u, [0, 3, 26, 31], [0, 1, 1, 0], clamp);
  return <div data-ending-ball={kind} style={{position: 'absolute', left: 395 + kind * 115, top: 760 + y, width: 64, height: 64, opacity, rotate: `${u * 5}deg`}}><svg width="64" height="64" viewBox="0 0 64 64"><defs><clipPath id={`ending-ball-${kind}`}><circle cx="32" cy="32" r="31"/></clipPath></defs><circle cx="32" cy="32" r="31" fill={['#ed8b39', '#EEEEF0', '#d2e851'][kind]}/><g clipPath={`url(#ending-ball-${kind})`} fill="none" stroke={kind === 2 ? 'white' : '#172337'} strokeWidth={kind === 2 ? 3 : 2}>{kind === 0 ? <><path d="M0 32h64M32 0v64"/><ellipse cx="-6" cy="32" rx="28" ry="37"/><ellipse cx="70" cy="32" rx="28" ry="37"/></> : kind === 1 ? <><path fill="#172337" d="M32 18l14 10-5 17H23l-5-17z"/><path d="M32 18V0M46 28l18-5M41 45l10 19M23 45L10 64M18 28L0 23"/></> : <><ellipse cx="-8" cy="32" rx="29" ry="39"/><ellipse cx="72" cy="32" rx="29" ry="39"/></>}</g></svg></div>;
};

export const SignatureEnding = ({animated = false}: {animated?: boolean}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#020C1F'}}>
    {animated && <><Ball kind={0} delay={0}/><Ball kind={1} delay={4}/><Ball kind={2} delay={8}/></>}
    <div data-ending-signature style={{position: 'absolute', left: 155, top: 870, width: 770, opacity: animated && f < fps ? 0 : 1, translate: animated && f >= fps ? `0px ${interpolate(spring({frame: f - fps, fps, config: {damping: 11, stiffness: 230, mass: .65}}), [0, 1], [-170, 0])}px` : '0px 0px'}}><Img src={staticFile('brand/signature.png')} style={{width: '100%'}}/></div>
  </AbsoluteFill>;
};
