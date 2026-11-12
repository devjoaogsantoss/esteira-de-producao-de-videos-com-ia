// Optional authorized ElevenLabs integration. Secrets come exclusively from the environment.
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const key=process.env.ELEVENLABS_API_KEY;
const voice=process.env.ELEVENLABS_VOICE_ID;
if(!key||!voice) throw new Error('Configure ELEVENLABS_API_KEY e ELEVENLABS_VOICE_ID no ambiente; nenhuma credencial foi encontrada ou incorporada no projeto. Alternativa: fornecer WAV/MP3 novo e cues.json.');
const original=fs.readFileSync('docs/narracao-final-2026.txt','utf8');
const text=original.replace('CRB','cê erre bê').replace(/\n+/g,' ').trim();
const response=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}/with-timestamps`,{
 method:'POST',headers:{'xi-api-key':key,'Content-Type':'application/json'},
 body:JSON.stringify({text,model_id:'eleven_multilingual_v2',language_code:'pt',voice_settings:{stability:.38,similarity_boost:.75,style:.3,use_speaker_boost:true,speed:1}})
});
if(!response.ok) throw new Error(`ElevenLabs HTTP ${response.status}. Verifique acesso, voz e cota. A credencial não foi registrada.`);
const data=await response.json();
if(!data.audio_base64||!data.alignment) throw new Error('Resposta sem áudio ou alinhamento.');
fs.mkdirSync('public/audio',{recursive:true});
fs.writeFileSync('public/audio/narracao-final-2026-original.mp3',Buffer.from(data.audio_base64,'base64'));
const a=data.alignment;const chars=a.characters.join('');
const phrases=['As outras duas vagas','O Novorizontino','Juventude e Vila Nova','Neste cenário','A mudança passou'];
const cues=phrases.map(p=>{const i=chars.indexOf(p);if(i<0)throw new Error(`Alinhamento não localizou: ${p}`);return a.character_start_times_seconds[i]});
fs.writeFileSync('docs/cues-final-2026.json',JSON.stringify({starts:[0,1,...cues]},null,2));
fs.writeFileSync('review/voice-alignment.json',JSON.stringify(a,null,2));
const result=spawnSync(process.execPath,['scripts/integrate-voice.mjs','public/audio/narracao-final-2026-original.mp3','docs/cues-final-2026.json'],{stdio:'inherit'});
process.exitCode=result.status??1;
