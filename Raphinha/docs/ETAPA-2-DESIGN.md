# Etapa 2 — telas para aprovação visual

Avanço autorizado pelo usuário na conversa. Direção: fotos + motion gráfico; a capa e a temática usam a abertura do paradoxo de LaVine como referência. A presente entrega contém estados estáticos, sem montagem animada final.

## Entrega

`entrega/etapa-2/REVISAR-TELAS.html`: galeria local com 15 telas, navegação, ampliação e modo de leitura a 360px.

15 PNGs em 1080×1920, 15 versões em 360×640, três pranchas e manifesto de composições na mesma pasta. Projeto editável próprio em `Raphinha/src`, com dados separados em `data.ts`.

## Decisões visuais

1. Capa: título integral, “PARADOXO” destacado, recorte do atleta e seta editorial. A paleta e Poppins Bold vêm da referência Sportsmatch vigente. A referência LaVine orienta a hierarquia e a combinação figura/título; não foram reutilizados o atleta ou o post daquele vídeo.
2. Gancho: segundo estado para “Muda a camisa. Por que muda o impacto?”, mantido na gravação. Fotos do Barça e Brasil com o mesmo peso visual.
3. Temporada: 19 gols e 3 assistências são os números dominantes; 14 jogos, 12 titularidades, 22 participações e aproximadamente 46 min por participação apoiam a leitura. Minutos e recorte no crédito.
4. Timeline: quatro estados, com nomes dos adversários e ícones próprios para gol e assistência. Datas abaixo da linha. Contadores acumulados 5/1, 8/3, 14/3 e 19/3. Ordem das partidas listadas, sem escala proporcional de tempo. Não se apresenta calendário completo.
5. Comparação: duas linhas na mesma escala, de zero a dois, com marcadores e traçados distintos. Quatro temporadas, última parcial. Uma tela adicional torna legíveis os minutos de cada amostra.
6. Tática: fotos e campos ilustrativos separados para Xavi e Flick. Hipótese explicitamente identificada. Os marcadores R representam possibilidades de ocupação do mesmo jogador, não atletas simultâneos ou posições medidas.
7. Contexto: a foto com Ancelotti ilustra a pergunta sobre condições oferecidas na Seleção; não atribui a ele todo o período de dados.
8. Fechamento: pergunta editorial e limite causal. Encerramento com a assinatura original Sportsmatch e bolas, mostrado em estado estático.

## Identificação dos materiais

- `GettyImages-2294364008.png`: Hansi Flick com Raphinha, identificação confirmada pelo usuário nesta etapa.
- `2147870466.png`: Xavi com Raphinha, identificação confirmada pelo usuário nesta etapa.
- `O3CYRXSI55DKPLDA56D27M4BRI.png`: foto enviada pelo usuário como Ancelotti com Raphinha.
- Retrato, recorte em ação e fotos do Barça/Brasil: cópias dos ativos fornecidos em `Raphinha 2026/Fotos do Raphinha`.
- Fontes: Poppins Regular, Semibold e Bold locais. Marca: `signature.png` e `watermark.png` originais do projeto aprovado.

As cópias de trabalho estão em `public`; os originais fornecidos foram preservados. Identificação de pessoa não substitui crédito do fotógrafo. Créditos de origem continuam pendentes, conforme etapa 1.

## Voz recebida e futura montagem

MP3 original preservado, duração técnica de 111,568938s. Transcrição local automática executada com modelo já instalado; arquivo em `review/narracao-transcricao.json`. Não houve escuta subjetiva pelo agente nesta etapa. Erros automáticos de nomes não foram transferidos às telas.

Marcos aproximados extraídos da transcrição, a revisar na sincronização:

| Bloco | Intervalo aproximado |
|---|---|
| Título completo | 0–5,7s |
| Muda a camisa | 5,7–8,8s |
| Temporada | 8,8–21s |
| Timeline | 21–42s |
| Seleção | 42–51s |
| Comparação e limites | 51–77,3s |
| Hipótese tática e contexto | 77,3–96s |
| Fechamento | 96–111,6s |

O título aparece completo no primeiro quadro e permanece durante a abertura; sua leitura não é comprimida em três segundos. A duração final e a entrada da assinatura serão ajustadas na etapa 3. A timeline tem cerca de 21s de voz; sua leitura em movimento será verificada antes de fechar a duração. Os 120s do planejamento original não foram impostos ao áudio.

## Verificações executadas

- TypeScript sem erros.
- Studio aberto em `http://localhost:3001`; composições carregadas e inspecionadas pelo navegador de render do Remotion.
- Exportação dos 15 estados em 1080×1920 e 360×640.
- Inspeção visual das três pranchas a 360px por tela, com inspeção individual da capa, gráfico e contexto tático.
- Verificação das caixas de conteúdo marcadas: após ajustes, zero alertas de transbordamento da área segura; imagens carregadas e Poppins disponível nas 15 telas. Relatório: `review/layout-studio.json`. Esta checagem não equivale a uma prova automática de ausência de toda interseção de texto ou de legibilidade subjetiva.
- O valor máximo do gráfico foi afastado do subtítulo; enquadramentos dos treinadores preservam as cabeças; créditos acomodados acima do limite inferior da área segura.
- Galeria local testada: 15 imagens carregadas; ampliação, próxima tela, modo 360px e fechamento funcionais. Relatório: `review/galeria-verificacao.json`. A tentativa de abrir a galeria no aplicativo padrão do Windows retornou acesso negado; o HTML permanece disponível para abertura manual.
- O MP4 da Série B V2 foi consultado por extração de quadro, junto ao código `GraphicRevision.tsx`/`GraphicFilm.tsx`. A abertura LaVine foi consultada por quadros amostrados. Reprodução contínua, transições e sincronização de áudio ainda pertencem à etapa 3.

## Aprovação solicitada

Revisar capa, hierarquia, fotografias, timeline, gráfico e campos táticos. Após aprovação explícita do design, seguir para animação sincronizada com a voz. Esta pausa vem da seção 8 do briefing recebido, que exige aprovação ao concluir a etapa 2.
