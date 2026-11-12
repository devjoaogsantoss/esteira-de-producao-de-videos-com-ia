# Verificação final — EP01

## Arquivo entregue

`episodes/EP01-Gremio-Vasco-2026/entrega/final/Entre-a-Taca-e-a-Degola-EP01-FINAL.mp4`

- H.264, yuv420p, 1080×1920, 30fps.
- 1791 frames: duração de vídeo 59,700s. Contêiner 59,712s devido ao enquadramento AAC.
- AAC estéreo, 48.000Hz; exportação configurada a 320kbps.
- Tamanho: 10.420.872 bytes.
- Loudness integrado medido no MP4: **−16,14 LUFS**.
- True peak medido: **−4,47 dBTP**, sem clipping.
- Decodificação completa via FFmpeg: sem erros.

## Revisão executada

Antes da exportação integral, o trecho de 8s a 25,5s foi renderizado e reproduzido por completo. Ele inclui avanço do bracket, mudança para a timeline do Z4 e revelação das barras. Reprodução: 525 frames, nenhum perdido; decodificação passou.

O MP4 completo foi reproduzido no navegador até o evento ended, com áudio habilitado: **1791 frames, zero dropped frames**, resolução confirmada 1080×1920. Isso comprova reprodução técnica, não escuta subjetiva de pronúncia ou julgamento musical.

Foram extraídos e inspecionados 17 quadros do MP4 em 360×640, incluindo primeiro quadro, progressão dos adversários, final em aberto, os dois gráficos de aproveitamento, os dois recortes da tabela, perguntas escritas, bolas e último frame exato. A capa e a assinatura mantêm as imagens originais. O encerramento não tem o crédito textual retirado na aprovação. As duas comparações e a identificação de Palmeiras/Boca estão visíveis. As curvas estimadas fora do Z4 permanecem tracejadas.

Os marcos de movimento usam os tempos aproximados de palavras do ASR local, roteiro e pausas do áudio. A locução não foi cortada, acelerada nem substituída. A ordem escrita das perguntas acompanha a gravação. Não houve escuta subjetiva de nomes próprios; erros ortográficos do ASR foram distinguidos de possíveis erros da gravação.

O MP3 da entrega é idêntico à cópia aprovada: SHA-256 `FAA2276D5B870D5E880909C5050040A425EB7766F8E9134E729F0EEE28AFAED1`.

TypeScript: `tsc --noEmit` passou. Studio aberto e composição da montagem carregada antes do render completo. Webpack emitiu aviso de cache; os renders terminaram. Uma chamada auxiliar do Studio a bugs.remotion.dev foi bloqueada pela rede, sem impedir a prévia local.

Evidências: `review/trecho/` e `review/final/`, com metadata.json, loudness.json, playback.json, decode.txt, PNGs e painéis de quadros.

## Notas de publicação

Os dados e confrontos seguem as informações fornecidas pelo usuário/Sportsmatch. O corte é após a 34ª rodada; a data civil de corte não foi informada. A origem/crédito das fotografias permanece para completar na publicação. Não houve nova apuração factual nem publicação externa.

EP02–04 permanecem em planejamento inicial, sem vídeos finalizados.
