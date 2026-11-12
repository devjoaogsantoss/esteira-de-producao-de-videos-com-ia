import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const torn = 'polygon(0 1%,8% 0,16% .7%,25% 0,34% .8%,43% 0,52% .6%,62% 0,72% .8%,83% 0,92% .6%,100% 0,100% 98%,96% 99%,92% 98.2%,88% 100%,84% 98.6%,80% 99.4%,76% 98.2%,72% 99.7%,68% 98.7%,64% 100%,60% 98.3%,56% 99.4%,52% 98.5%,48% 100%,44% 98.3%,40% 99.5%,36% 98.4%,32% 100%,28% 98.5%,24% 99.6%,20% 98.1%,16% 99.4%,12% 98.4%,8% 100%,4% 98.6%,0 99.6%)';

export const Notebook = ({children, height, style = {}}: {children: React.ReactNode; height: number; style?: React.CSSProperties}) => <div style={{position: 'relative', height, width: '100%', filter: 'drop-shadow(0 13px 0 #0004)', ...style}}>
  <div style={{position: 'absolute', inset: 0, background: '#EEEEF0', clipPath: torn}}/>
  <div style={{position: 'absolute', inset: '20px 12px 16px', background: 'repeating-linear-gradient(0deg,transparent 0px,transparent 43px,#718DA627 44px,#718DA627 45px)', clipPath: torn}}/>
  <div style={{position: 'absolute', top: 16, bottom: 20, left: 52, width: 2, background: '#FF024439'}}/>
  {[.18, .5, .82].map(y => <div key={y} style={{position: 'absolute', left: 17, top: height * y, width: 18, height: 18, borderRadius: '50%', background: '#020C1F', boxShadow: 'inset 2px 2px 3px #0008'}}/>)}
  <div style={{position: 'relative', boxSizing: 'border-box', padding: '30px 28px 30px 76px', height: '100%', color: '#020C1F'}}>{children}</div>
</div>;

// Characters retain their final width while the ink is revealed from left to
// right. Staggered pen strokes and a moving nib make it read as writing,
// rather than a paragraph appearing or reflowing character by character.
export const WrittenLine = ({text, size, start, duration, animated = false, color = '#020C1F'}: {text: string; size: number; start: number; duration: number; animated?: boolean; color?: string}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const letters = Array.from(text);
  const letterSpan = duration * fps / Math.max(letters.length, 1);
  return <div data-writing={text} style={{fontSize: size, lineHeight: 1.06, fontWeight: 700, whiteSpace: 'pre', letterSpacing: -1.5, color}}>{letters.map((letter, i) => {
    const at = start * fps + i * letterSpan;
    const p = animated ? interpolate(f, [at, at + letterSpan * 1.25], [0, 1], clamp) : 1;
    return <span key={i} style={{display: 'inline-block', position: 'relative'}}><span style={{display: 'inline-block', clipPath: `inset(0 ${(1 - p) * 100}% 0 0)`}}>{letter}</span>{animated && p > 0 && p < 1 && letter !== ' ' && <span style={{position: 'absolute', left: `${p * 100}%`, bottom: size * .08, width: 5, height: size * .28, borderRadius: 2, background: color, rotate: '28deg'}}/>}</span>;
  })}</div>;
};
