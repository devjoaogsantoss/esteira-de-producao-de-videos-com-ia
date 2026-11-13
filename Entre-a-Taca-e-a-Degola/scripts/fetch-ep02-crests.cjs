const fs = require('fs');
const path = require('path');
const targets = [
  {key:'sport', match:/^Sport(?: |$)/i},
  {key:'figueirense', match:/Figueirense/i, id:3461},
  {key:'atletico-go', match:/Atl.*tico(?:[- ]GO| Goianiense)/i, id:10357},
  {key:'flamengo', match:/^Flamengo$/i, id:819},
];
(async()=>{
  const inventory=[];
  for(const league of ['bra.1','bra.2','bra.camp.catarinense','bra.3','bra.copa_do_brasil']) {
    const endpoint=league.includes('?') ? `${league}` : `${league}/teams?limit=100`;
    const r=await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${endpoint}`);
    if(!r.ok)continue;
    const d=await r.json();
    inventory.push(...(d.sports?.[0]?.leagues?.[0]?.teams||[]).map(x=>x.team));
  }
  const manifest=[];
  const original='episodes/EP02-Palmeiras-2012/assets/originais/escudos';
  fs.mkdirSync(original,{recursive:true});
  fs.mkdirSync('public/episodes/EP02/escudos',{recursive:true});
  for(const target of targets){
    let team=inventory.find(t=>target.match.test(t.displayName));
    if(!team&&target.id){const r=await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/teams/${target.id}`);const d=await r.json();if(d.team&&target.match.test(d.team.displayName))team=d.team;}
    if(!team)throw new Error('Escudo não localizado: '+target.key);
    const url=team.logos?.[0]?.href;
    const response=await fetch(url);if(!response.ok)throw new Error(url);
    const output=path.join(original,target.key+'.png');
    fs.writeFileSync(output,Buffer.from(await response.arrayBuffer()));
    fs.copyFileSync(output,'public/episodes/EP02/escudos/'+target.key+'.png');
    manifest.push({club:team.displayName,file:target.key+'.png',url});
  }
  fs.writeFileSync('review/ep02/escudos-origem.json',JSON.stringify(manifest,null,2));
  console.log(JSON.stringify(manifest,null,2));
})().catch(e=>{console.error(e.message);process.exit(1)});
