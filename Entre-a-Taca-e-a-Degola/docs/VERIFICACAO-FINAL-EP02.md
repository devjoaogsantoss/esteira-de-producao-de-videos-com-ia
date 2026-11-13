# Verificação final — EP02

Arquivo: `episodes/EP02-Palmeiras-2012/entrega/final/Entre-a-Taca-e-a-Degola-EP02-FINAL.mp4`.

- H.264 / yuv420p, 1080×1920, 30fps, 1803 frames.
- Vídeo: 60,100s. Contêiner/AAC: 60,117s por enquadramento de amostras do codec.
- Áudio AAC estéreo, 48.000Hz; configuração de exportação 320kbps.
- Tamanho: 11.763.959 bytes.
- Loudness integrado medido no MP4: **−16,16 LUFS**; true peak **−4,39 dBTP**, sem clipping.
- FFmpeg: decodificação integral sem erros.
- Reprodução integral no navegador: ended=true, **1803 frames, zero dropped frames**, áudio habilitado e resolução 1080×1920 confirmada.

Foram extraídos e inspecionados 16 quadros do MP4 a 360×640: capa, conquista, barra de 81,8%, tabela no contexto do título, comparação com 29,8%, gráfico do Z4, placar da 36ª rodada, síntese, perguntas escritas, bolas e último frame exato da assinatura.

Antes do render completo, os trechos da comparação/tabela, do rodapé e do gráfico do Z4 foram renderizados e reproduzidos. O trecho do gráfico: 144 frames, nenhum perdido, decodificação completa. Pontos e ligações ilustrativas visíveis no quadro final; escudo avança pela linha. Texto da assinatura do rodapé removido; cursor e pulsos ampliados conferidos nos frames com níveis diferentes da música.

Locução preservada integralmente, sem cortes, substituição ou mudança de velocidade. O MP3 separado da entrega é idêntico ao recebido: SHA-256 `6F9802D3DCDD24C84CAECC627D3CC0E07617AF4C9D754975F8C2393F99F69C76`.

Sincronização orientada por ASR local, roteiro e pausas. Esses testes são técnicos; não constituem escuta subjetiva de pronúncia ou julgamento musical. A trilha foi mixada no áudio final com offset de 10s, ducking e fade. Análise de pulsos usa a mesma faixa, offset e duração.

Os dados e posições seguem os materiais do usuário. Total 30/38 mantido conforme voz e roteiro; a lista de posições é parcial, por isso as ligações ilustrativas são identificadas em tela. Não foi calculado um novo total a partir da interpolação. Método em docs/MONTAGEM-EP02.md.

TypeScript (`tsc --noEmit`) passou. Studio da composição carregado antes da exportação integral. Aviso de cache do Webpack e bloqueio de uma chamada auxiliar a bugs.remotion.dev não impediram a prévia ou os renders.

Evidências em `review/ep02-final/`: metadata.json, loudness.json, decode.txt, playback.json, Quadros-MP4.png e capturas individuais. Sem publicação externa do vídeo nesta etapa. EP01 preservado; EP03–04 continuam em planejamento.
