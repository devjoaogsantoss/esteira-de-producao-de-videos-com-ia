import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import {reveal} from './Motion';
export const paperCuts=[180,269,635,1326,1596,2150,2382,2567,2796,3021,3540];
type Point={x:number;y:number;z:number;sx:number;sy:number};
const transform=(a:Point,b:Point,c:Point)=>{
 const ux=b.sx-a.sx,uy=b.sy-a.sy,vx=c.sx-a.sx,vy=c.sy-a.sy,det=ux*vy-vx*uy;
 const A=((b.x-a.x)*vy-(c.x-a.x)*uy)/det,C=((c.x-a.x)*ux-(b.x-a.x)*vx)/det;
 const B=((b.y-a.y)*vy-(c.y-a.y)*uy)/det,D=((c.y-a.y)*ux-(b.y-a.y)*vx)/det;
 return `matrix(${A} ${B} ${C} ${D} ${a.x-A*a.sx-C*a.sy} ${a.y-B*a.sx-D*a.sy})`;
};

export const PaperCrumple=({cuts=paperCuts,folder='paper'}:{cuts?:number[];folder?:string})=>{
 const frame=useCurrentFrame();
 const ending=cuts[cuts.length-1];
 const cut=cuts.find(t=>frame>=t&&frame<t+(t===ending?14:21));
 if(cut===undefined)return null;
 const f=frame-cut,duration=cut===ending?14:21;
 const p=reveal(f,0,duration-1),fold=reveal(f,0,duration*.65),scale=1-.91*reveal(f,0,duration*.8),exit=reveal(f,duration*.54,duration-1);
 const rotation=-.33*fold,cx=540+980*exit,cy=960-1400*exit;
 const cols=4,rows=6,vertices:Point[][]=[];
 for(let r=0;r<=rows;r++){
  const row:Point[]=[];
  for(let c=0;c<=cols;c++){
   const sx=c*1080/cols,sy=r*1920/rows;
   const z=Math.sin(c*2.1+r*2.7)*210*fold;
   const dx=sx-540+Math.sin(c*4.3+r*2.1)*70*fold,dy=sy-960+Math.cos(c*1.7+r*3.2)*90*fold;
   const perspective=1300/(1300-z),x=(dx*Math.cos(rotation)-dy*Math.sin(rotation))*scale*perspective,y=(dx*Math.sin(rotation)+dy*Math.cos(rotation))*scale*perspective;
   row.push({x:cx+x,y:cy+y,z,sx,sy});
  }
  vertices.push(row);
 }
 const faces:{pts:Point[];depth:number;shade:number}[]=[];
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
  for(const pts of [[vertices[r][c],vertices[r][c+1],vertices[r+1][c]],[vertices[r][c+1],vertices[r+1][c+1],vertices[r+1][c]]]){
   const [a,b,d]=pts,u={x:b.sx-a.sx,y:b.sy-a.sy,z:b.z-a.z},v={x:d.sx-a.sx,y:d.sy-a.sy,z:d.z-a.z};
   const nx=u.y*v.z-u.z*v.y,ny=u.z*v.x-u.x*v.z,nz=u.x*v.y-u.y*v.x,len=Math.hypot(nx,ny,nz);
   const light=(nz*.8-nx*.4-ny*.3)/len;
   faces.push({pts,depth:(a.z+b.z+d.z)/3,shade:Math.max(-.35,Math.min(.6,(.78-light)*fold))});
  }
 }
 faces.sort((a,b)=>a.depth-b.depth);
 const src=staticFile(`${folder}/page-${cut}.png`);
 return <AbsoluteFill style={{pointerEvents:'none',filter:`drop-shadow(${8+20*p}px ${12+22*p}px ${8+14*p}px #0009)`}}>
  <Img src={src} style={{display:'none'}}/>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{overflow:'visible'}}>
   <defs><image id="paper-source" href={src} width="1080" height="1920"/>{faces.map((face,i)=><clipPath id={`fold-${i}`} key={i}><polygon points={face.pts.map(v=>`${v.x},${v.y}`).join(' ')}/></clipPath>)}</defs>
   {faces.map((face,i)=>{
    const points=face.pts.map(v=>`${v.x},${v.y}`).join(' ');
    return <g key={i}>
     <g clipPath={`url(#fold-${i})`}><use href="#paper-source" transform={transform(face.pts[0],face.pts[1],face.pts[2])}/></g>
     <polygon points={points} fill={face.shade>0?'#000000':'#EEEEF0'} opacity={Math.abs(face.shade)} stroke={face.shade>0?'#020C1F':'#EEEEF0'} strokeWidth={1.3*fold} strokeLinejoin="round"/>
    </g>;
   })}
  </svg>
 </AbsoluteFill>;
};
