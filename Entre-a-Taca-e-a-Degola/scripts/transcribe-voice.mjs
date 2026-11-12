import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
import {env, pipeline} from '@huggingface/transformers';

const input = process.argv[2] ?? 'public/episodes/EP01/EP01_Narracao_Aprovada.mp3';
const output = process.argv[3] ?? 'review/transcricao-voz.json';
env.cacheDir = process.env.EP01_WHISPER_CACHE ?? path.resolve('.cache/whisper');
fs.mkdirSync(path.dirname(output), {recursive: true});
const pcm = spawnSync(ffmpeg, ['-v','error','-i',input,'-ar','16000','-ac','1','-f','f32le','pipe:1'], {maxBuffer:16*1024*1024});
if (pcm.status !== 0) throw new Error(pcm.stderr.toString());
const waveform = new Float32Array(pcm.stdout.buffer.slice(pcm.stdout.byteOffset, pcm.stdout.byteOffset + pcm.stdout.byteLength));
const transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-base', {dtype:'q8',device:'cpu'});
const result = await transcriber(waveform, {language:'portuguese',task:'transcribe',return_timestamps:'word',chunk_length_s:25,stride_length_s:4});
fs.writeFileSync(output, JSON.stringify(result,null,2));
await transcriber.dispose();
console.log(output);
