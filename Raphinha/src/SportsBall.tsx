import React, {useId} from 'react';

// Desenho original do encerramento aprovado em Sportsmatch.tsx (Série B V2).
// Compartilhado pelos marcos/ícones da timeline e pelo encerramento de Raphinha.
export const SportsBall=({kind=1,size=64}:{kind?:0|1|2;size?:number})=>{
  const clip=useId().replaceAll(':','');
  return <svg width={size} height={size} viewBox="0 0 64 64" aria-label={['Basquete','Futebol','Tênis'][kind]}>
    <defs><clipPath id={clip}><circle cx="32" cy="32" r="31"/></clipPath></defs>
    <circle cx="32" cy="32" r="31" fill={['#ed8b39','#EEEEF0','#d2e851'][kind]}/>
    <g clipPath={`url(#${clip})`} fill="none" stroke={kind===2?'white':'#172337'} strokeWidth={kind===2?3:2}>
      {kind===0?<><path d="M0 32h64M32 0v64"/><ellipse cx="-6" cy="32" rx="28" ry="37"/><ellipse cx="70" cy="32" rx="28" ry="37"/></>:kind===1?<><path fill="#172337" d="M32 18l14 10-5 17H23l-5-17z"/><path d="M32 18V0M46 28l18-5M41 45l10 19M23 45L10 64M18 28L0 23"/></>:<><ellipse cx="-8" cy="32" rx="29" ry="39"/><ellipse cx="72" cy="32" rx="29" ry="39"/></>}
    </g>
  </svg>;
};
