# V3 — nova narração com Ancelotti

Arquivo recebido: `ElevenLabs_2026-11-12T01_49_28_Matilda - Knowledgable, Professional_pre_s50_sim75_v4.mp3`. Original preservado em `originais` e cópia de trabalho em `public/audio/narracao-v3-original.mp3`.

A gravação completa foi substituída pela nova versão, sem combinar o trecho novo com a gravação antiga. A transcrição local identificou a passagem de Ancelotti após a explicação de Hansi Flick. Erros automáticos de grafia não foram transferidos às telas.

## Sincronização

A nova gravação tem 117,629s e também muda ligeiramente os tempos das falas anteriores. Foram recalculadas as entradas das cenas, as chegadas da bola na timeline, as transições de papel e a duração do fechamento.

| Bloco | Tempo na V3 |
|---|---|
| Capa | 0–5,8s |
| Troca de camisa | 5,8–8,8s |
| Temporada | 8,8–20,6s |
| Timeline | 20,6–43,17s |
| Seleção | 43,17–52,1s |
| Comparação por 90 | 52,1–69,9s |
| Média de minutos | 69,9–77,7s |
| Xavi | 77,7–83,93s |
| Flick | 83,93–91,8s |
| Ancelotti e pergunta de contexto | 91,8–104,4s |
| Conclusão | 104,4–121s |
| Assinatura | 121–123s |

A passagem nova de Ancelotti começa na voz por volta de 91,96s / 1min32s da montagem e termina perto de 99,78s. A pergunta sobre jogador/contexto vem em seguida, na mesma cena.

Foi mantida apenas a pausa instrumental de 2s da timeline, agora em 27s do original, dentro de silêncio verificado por `silencedetect`. A antiga pausa de 2,5s antes do contexto tático foi retirada; a fala acrescentada ocupa esse espaço. Nenhuma palavra foi removida nem a voz acelerada. Duração final: 123s / 3.690 frames.

## Imagem e texto

Direção artística da V2 mantida: capa cartoon, fotos em recortes, bola e passes, transições de papel e disclaimer final solicitado. A tela de Ancelotti agora apresenta “DIREITA E / ATAQUE EM DUPLA”, com apoio textual sobre a atuação centralizada em dupla e o uso pela direita, para acompanhar a formulação da nova gravação. O diagrama continua identificado como ilustração editorial, sem rastreamento real.

Composição própria `Raphinha-V3`, tempos em `src/timing-v3.json`, páginas de transição em `public/paper-v3`. As versões V1 e V2 permanecem disponíveis.

## Áudio

Mixagem refeita com a nova narração completa e a mesma trilha, entrando a partir de 10s. Ducking durante a voz, recuperação suave nas pausas e fade final entre 121,7 e 123s. A faixa tem extensão suficiente, sem loop. Pulsos recalculados para 3.690 frames, em arquivo próprio, preservando os dados das versões anteriores.

WAV de mixagem medido em aproximadamente -16,14 LUFS e pico verdadeiro de -1,88 dBTP. A verificação do AAC exportado fica no relatório final. Não se afirma escuta subjetiva pelo agente.

## Verificações

TypeScript sem erros. Composição V3 carregada no Studio, com Poppins e fotos locais. Quadros da nova sincronização inspecionados a 360px, incluindo texto e diagrama de Ancelotti e entrada do disclaimer. Trecho de Flick → Ancelotti → conclusão exportado antes da versão completa: 21s, 630 frames, H.264/AAC, 1080×1920 e 30fps. Decodificação sem erros e reprodução técnica até o fim, com zero quadros descartados. Quadros extraídos do próprio trecho foram conferidos.

Entrega em `entrega/v3`, com o MP4 completo, visualizador por capítulos, trecho atualizado e narração original separada. Relatórios em `review/v3`.

MP4 completo conferido: H.264/AAC, 1080×1920, 30fps, 3.690 frames e 123s de imagem (123,008s no contêiner AAC). Decodificação integral sem erros. Áudio exportado em -16,16 LUFS e pico verdadeiro de -1,89 dBTP. Quadros extraídos do próprio arquivo foram conferidos, incluindo a cena de Ancelotti, a conclusão e o último quadro. Visualizador com nove capítulos testado; o capítulo de Ancelotti começa em 91,8s e o de conclusão em 104,4s.

Reprodução técnica integral concluída até o fim, com 3.690 frames e zero quadros descartados, áudio habilitado. Relatório: `review/v3/playback-Sportsmatch-Raphinha-V3.json`.
