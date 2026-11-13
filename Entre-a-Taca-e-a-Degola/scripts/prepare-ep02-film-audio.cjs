const fs = require('fs');
const cp = require('child_process');
const ffmpeg = require('ffmpeg-static');
const timing = require('../shared/ep02-film-timing.json');
const dir = 'episodes/EP02-Palmeiras-2012/entrega/final';
fs.mkdirSync(dir, {recursive: true});
fs.mkdirSync('review', {recursive: true});
const run = args => {
  const r = cp.spawnSync(ffmpeg, ['-hide_banner', '-y', ...args], {encoding: 'utf8', maxBuffer: 8 * 1024 * 1024});
  if (r.status !== 0) throw new Error(r.stderr);
  return r.stderr;
};

run(['-i', 'public/episodes/EP02/EP02_Narracao_Aprovada.mp3', '-af', 'loudnorm=I=-17:TP=-2:LRA=8', '-ar', '48000', '-ac', '1', 'public/episodes/EP02/EP02_Voz_Normalizada.wav']);
const total = timing.durationSeconds;
const filter = `[0:a]atrim=duration=${total},asetpts=PTS-STARTPTS,volume=0.32,afade=t=out:st=${total - 1.3}:d=1.3[m];[1:a]apad,asplit=2[sc][v];[m][sc]sidechaincompress=threshold=0.018:ratio=8:attack=12:release=200:makeup=1[duck];[duck][v]amix=inputs=2:duration=first:normalize=0`;
const measurements = run(['-ss', '10', '-i', 'public/audio/Trilha_Aprovada.mp3', '-i', 'public/episodes/EP02/EP02_Voz_Normalizada.wav', '-filter_complex', filter + ',loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json[out]', '-map', '[out]', '-t', String(total), '-f', 'null', '-']);
fs.writeFileSync('review/ep02/mix-first-pass.txt', measurements);
const m = JSON.parse(measurements.slice(measurements.lastIndexOf('{'), measurements.lastIndexOf('}') + 1));
const pass = `loudnorm=I=-16:TP=-1.5:LRA=9:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true:print_format=json`;
const log = run(['-ss', '10', '-i', 'public/audio/Trilha_Aprovada.mp3', '-i', 'public/episodes/EP02/EP02_Voz_Normalizada.wav', '-filter_complex', filter + ',' + pass + ',alimiter=limit=0.89:level=false[out]', '-map', '[out]', '-t', String(total), '-ar', '48000', '-ac', '2', 'public/episodes/EP02/EP02_Mix_Final.wav']);
fs.writeFileSync('review/ep02/mix-final-processing.txt', log);
fs.copyFileSync('public/episodes/EP02/EP02_Narracao_Aprovada.mp3', `${dir}/EP02-Narracao-Aprovada.mp3`);
const cover = 'episodes/EP02-Palmeiras-2012/entrega/telas-v1/01-Capa.png';
if (fs.existsSync(cover)) fs.copyFileSync(cover, `${dir}/EP02-Capa.png`);

const raw = cp.spawnSync(ffmpeg, ['-v', 'error', '-ss', '10', '-i', 'public/audio/Trilha_Aprovada.mp3', '-t', String(total), '-ar', '16000', '-ac', '1', '-f', 'f32le', 'pipe:1'], {maxBuffer: 8 * 1024 * 1024});
if (raw.status !== 0) throw new Error(raw.stderr.toString());
const pcm = new Float32Array(raw.stdout.buffer.slice(raw.stdout.byteOffset, raw.stdout.byteOffset + raw.stdout.byteLength));
const energy = Array.from({length: timing.durationInFrames}, (_, f) => {
  let sum = 0, n = 0;
  for (let j = Math.floor(f * 16000 / timing.fps); j < Math.floor((f + 1) * 16000 / timing.fps) && j < pcm.length; j++) {sum += pcm[j] * pcm[j]; n++;}
  return Math.sqrt(sum / Math.max(n, 1));
});
const sorted = [...energy].sort((a, b) => a - b), scale = sorted[Math.floor(sorted.length * .95)] || 1;
fs.writeFileSync('shared/ep02-film-music-pulse.json', JSON.stringify(energy.map((e, i) => Number(Math.min(1, (e * .7 + Math.max(0, e - (energy[i - 1] || 0)) * 1.7) / scale).toFixed(4)))));
console.log(JSON.stringify({duration: total, voiceSpeed: 1, musicOffset: 10, loudnessFirstPass: m}, null, 2));
