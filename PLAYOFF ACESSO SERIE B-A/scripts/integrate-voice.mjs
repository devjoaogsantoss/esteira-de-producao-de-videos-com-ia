import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
import probe from 'ffprobe-static';
const [input,cuesFile]=process.argv.slice(2);
if(!input||!cuesFile) throw new Error('Uso: node scripts/integrate-voice.mjs NOVA-VOZ.wav docs/cues-final-2026.json. Os sete starts em segundos: capa=0, formato=1, funcionamento, Novorizontino, segunda posição, confrontos, contexto.');
if(/(^|[\\/])narracao\.wav$/i.test(input)) throw new Error('A voz antiga pertence a outro roteiro e não pode ser usada.');
const meta=JSON.parse(spawnSync(probe.path,['-v','quiet','-show_format','-of','json',input],{encoding:'utf8'}).stdout);
const duration=Number(meta.format.duration);
if(!Number.isFinite(duration)||duration>48)throw new Error(`Locução de ${duration}s: precisa terminar até 48s para incluir encerramento de 2s. Solicite nova interpretação/pausas; não acelere o áudio automaticamente.`);
const cues=JSON.parse(fs.readFileSync(cuesFile,'utf8')).starts;
if(cues.length!==7||cues[0]!==0||cues[1]!==1||!cues.every((c,i)=>Number.isFinite(c)&&(i===0||c>cues[i-1])))throw new Error('starts precisa de 7 tempos crescentes em segundos, começando com [0,1].');
const totalFrames=Math.max(1410,Math.ceil(duration*30)+60);
const starts=[...cues.map(s=>Math.round(s*30)),totalFrames-60];
if(starts[7]-starts[6]<300)throw new Error('A etapa de contexto precisa de ao menos 10s para votação, leitura editorial e logos. Revise os tempos/narração.');
const exec=args=>{const r=spawnSync(ffmpeg,['-hide_banner','-y',...args],{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr);return r.stderr;};
exec(['-i',input,'-af','loudnorm=I=-17:TP=-2:LRA=8','-ar','48000','-ac','1','public/audio/narracao-final-2026.wav']);
// Actual sidechain ducking follows speech, including its pauses. Music starts at original 10s.
const end=starts[7]/30;const total=totalFrames/30;
const mix=exec(['-ss','10','-i','public/audio/Energetic Upbeat Percussive Clap and Stomp Background Music.mp3','-i','public/audio/narracao-final-2026.wav','-filter_complex',
 `[0:a]atrim=duration=${total},asetpts=PTS-STARTPTS,volume=0.4,afade=t=out:st=${total-1.1}:d=1.1[m];[1:a]apad,asplit=2[sc][v];[m][sc]sidechaincompress=threshold=0.025:ratio=7:attack=15:release=240:makeup=1[duck];[duck][v]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=9,alimiter=limit=0.84:level=false[out]`,
 '-map','[out]','-t',String(total),'-ar','48000','-ac','2','public/audio/mix-final-2026.wav']);
fs.copyFileSync('public/audio/narracao-final-2026.wav','entrega/Narracao-SerieB2026.wav');
fs.writeFileSync('review/mix-processing.txt',mix);
fs.writeFileSync('src/timing.json',JSON.stringify({duration:totalFrames,voiceReady:true,voiceFile:'audio/narracao-final-2026.wav',voiceStart:0,starts,musicOffsetSeconds:10},null,2));
console.log(`Locução integrada, sem alteração de velocidade. Duração total ${total}s. Rever quadros e sincronização antes do render final.`);
