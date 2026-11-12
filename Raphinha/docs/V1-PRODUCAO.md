# Raphinha — V1 com narração e motion gráfico

O usuário autorizou a construção do vídeo sem novas aprovações de telas. A solicitação mais recente substitui a pausa de aprovação visual prevista no briefing original.

## Entrega

Pasta `entrega/v1`: MP4 completo da V1, visualizador local com capítulos, capa PNG, quadro da conclusão, narração original e trecho representativo da timeline. A V1 fica disponível para revisão do vídeo e ajustes finais.

Composição: `Raphinha-V1`, 1080×1920, 30fps, 3.600 frames / 120s. Projeto próprio em `Raphinha`; versões aprovadas da Série B preservadas.

## Montagem

| Tempo | Cena |
|---|---|
| 0–6s | Capa com título integral desde o primeiro quadro |
| 6–8,97s | Troca de contexto Barça × Brasil |
| 8,97–21,17s | Temporada parcial e dados principais |
| 21,17–44,2s | Timeline das 11 partidas, bola e acumulados |
| 44,2–53,2s | Virada para a Seleção |
| 53,2–71,67s | Participações em gols por 90 minutos |
| 71,67–79,4s | Média de minutos por jogo |
| 79,4–85,57s | Xavi: ilustração de atuação mais à direita |
| 85,57–93,2s | Flick: possibilidades de ocupação ofensiva |
| 93,2–100,7s | Ancelotti: direita e dupla com Vini Jr. |
| 100,7–118s | Pergunta final e conclusão animada |
| 118–120s | Bolas e assinatura Sportsmatch com quique |

As transições curtas se sobrepõem por 12 frames sem deslocar os marcos da locução. Fotografias recebem aproximação suave. Os títulos e textos entram por posição e opacidade determinísticas. A capa está completa no primeiro quadro.

## Ações principais

- Timeline: a bola de futebol original do encerramento percorre os marcos, com rotação e pequenos arcos. Acumulados mudam nos eventos da sequência; os números por partida são os dados fornecidos. Não há calendário proporcional ou inferência sobre os três jogos ausentes.
- Gráfico: revelação progressiva das duas séries na mesma escala. O estado final mantém os valores, equipes, unidade e recorte parcial.
- Média de minutos: total dividido por jogos disputados; denominadores preservados. Essa métrica descreve permanência por aparição e não substitui a produção por 90.
- Campos táticos: setas e marcador R mostram possibilidades ilustrativas, não posições rastreadas. Leitura tática atribuída à análise fornecida pelo usuário.
- Progressão inferior: tempo global da composição, com pulsos calculados da nova música a partir dos mesmos 10s usados na mixagem.
- Conclusão solicitada, sem alteração de palavras: **“Os números mostram a diferença mas ainda não conseguem explicar a causa...”**. Entrada em três linhas, com deslocamento curto, opacidade progressiva e destaque final.
- Encerramento: desenhos originais das três bolas, quique e assinatura horizontal original. A bola de futebol é o mesmo componente usado na timeline.

## Narração e música

Original de voz preservado integralmente, sem mudar velocidade ou texto. Foram inseridas duas pausas instrumentais, em pontos de silêncio verificados no áudio original:

| Ponto no original | Pausa acrescentada | Finalidade |
|---|---:|---|
| 27,8s | 2s | Leitura de Valencia/Feyenoord/Levante antes dos hat-tricks |
| 91,3s | 2,5s | Leitura da comparação de função com Ancelotti |

Não foram removidos fonemas. A fala original tem 111,569s; com pausas, o fluxo vai até aproximadamente 116,069s. O encerramento começa aos 118s. O novo disclaimer é visual; a locução recebida continua com sua formulação anterior, de sentido compatível.

Trilha: Trap Andretti / IDEFK fornecida pelo usuário, a partir de 10s, preservada como original e cópia de trabalho. Narração em primeiro plano, música reduzida durante a voz e recuperada suavemente nas pausas. Fade final entre 118,7 e 120s. Pulsos recalculados para a nova faixa; os dados da música antiga não foram reutilizados.

A mistura é calculada em ponto flutuante antes da conversão para PCM, evitando saturação intermediária ao ajustar o ganho. Limitador antes da saída. WAV de mixagem medido em aproximadamente -16,13 LUFS e pico verdadeiro de -1,90 dBTP. A medição do AAC exportado é registrada separadamente no relatório final.

## Verificações

- TypeScript sem erros e composição completa carregada no Studio com fotos e Poppins locais.
- Quadros de abertura, estados intermediários, gráficos, contexto e fechamento exportados; inspeção visual em 360px.
- 39 estados com áreas de conteúdo marcadas inspecionados automaticamente, sem alertas de transbordamento nos quadros amostrados. A checagem de caixas não comprova ausência de toda sobreposição de tinta.
- Trecho representativo de 25s exportado antes do vídeo completo: 750 frames, H.264/AAC, 1080×1920, 30fps, decodificação sem erros. Reprodução técnica até o fim sem quadros descartados; quadros extraídos do próprio MP4 conferidos.
- Medição do trecho: -15,90 LUFS e pico verdadeiro de -1,93 dBTP.
- MP4 completo verificado: H.264/AAC, 1080×1920, 30fps, 3.600 frames, 120s, 20.903.005 bytes. Decodificação integral sem erros. AAC medido em -16,14 LUFS e pico verdadeiro de -1,89 dBTP. Quadros extraídos do próprio MP4 foram conferidos, incluindo primeiro/último quadro, dados, tática e disclaimer.
- Reprodução técnica integral concluída: 120s até o fim, 3.600 frames reproduzidos e zero quadros descartados. Áudio habilitado, sem fallback para mudo. Isso verifica a reprodução técnica, sem equivaler a escuta subjetiva pelo agente.
- Visualizador local testado: vídeo em 1080×1920, duração de 120s, nove capítulos e navegação para a conclusão funcionando. Relatório: `review/v1/visualizador-verificacao.json`.
- Relatórios da exportação completa e reprodução técnica em `review/v1/qa-Sportsmatch-Raphinha-V1.json` e `review/v1/playback-Sportsmatch-Raphinha-V1.json`.

Não se afirma escuta subjetiva pelo agente. A transcrição local e as medidas técnicas apoiaram a sincronização e o controle de áudio. Pronúncias e preferência subjetiva de equilíbrio vocal/musical podem ser avaliadas pelo usuário na V1.

## Proveniência e limites

Dados fornecidos pelo usuário, com correções de 12 titularidades e Feyenoord. Assinatura visual solicitada: **Dados by @sportsmatch.br**. Cálculos conferidos; não houve verificação externa das estatísticas. Fotos dos treinadores identificadas pelo usuário. Os diagramas e a leitura sobre funções não comprovam causas para a diferença de produção.

## Comandos

```powershell
npm.cmd run studio
npm.cmd run check
npm.cmd run prepare:audio
node scripts/render-video.mjs proof
npm.cmd run render:v1
node scripts/qa-video.mjs entrega/v1/Sportsmatch-Raphinha-V1.mp4
node scripts/playback-review.mjs entrega/v1/Sportsmatch-Raphinha-V1.mp4
```
