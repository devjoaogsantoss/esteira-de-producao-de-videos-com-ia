# Revisão da etapa 2 — ajustes do usuário

Esta revisão substitui as decisões anteriores sobre assinatura de dados, tela 10, contextualização com Ancelotti, desenho das bolas e trilha. A versão anterior da entrega foi preservada em `review/etapa-2-v1`.

## Aplicado às telas

- Assinatura textual: **Dados by @sportsmatch.br**. A procedência dos dados fornecidos pelo usuário continua documentada na ficha de evidências; a assinatura visual não implica verificação externa adicional.
- Bola de futebol: extraído o desenho vetorial original do encerramento da Série B V2 para `src/SportsBall.tsx`. Timeline, ícones de gols e encerramento de Raphinha compartilham o componente. As cores e formas das três bolas originais foram preservadas.
- Tela 10: **média de minutos por jogo**, calculada como total de minutos dividido por jogos disputados. As contas ficam visíveis sob as médias; arredondamento apenas na apresentação.
- Contexto: leitura tática fornecida pelo usuário sobre Ancelotti — Raphinha mais à direita e também como atacante em dupla com Vini Jr.; quando atacante no Barcelona, geralmente sem dupla fixa. Comparação ilustrada por dois campos. Não se atribui a Ancelotti todo o período histórico da Seleção.

| Período | Barcelona: min/jogo | Brasil: min/jogo |
|---|---:|---:|
| 2023/24 | 52,7 | 81,5 |
| 2024/25 | 81,8 | 72,2 |
| 2025/26 | 66,5 | 75,6 |
| 2026/27 parcial | 72,4 | 56,6 |

Média por aparição torna a unidade da permanência em campo comum às duas equipes. Não mede produção ofensiva nem elimina diferenças de adversários, função e tamanho da amostra. O gráfico de participações por 90 permanece com sua métrica original. Valores sem arredondamento em `review/media-minutos-conferencia.json`.

## Registrado para a V1 animada

Timeline com a mesma bola conduzindo a passagem entre as partidas, rotação e pequenos quiques, pausa em cada marco e contadores acumulados acompanhando os eventos. Os quatro PNGs representam estados dessa sequência; o movimento completo será implementado após a aprovação visual, no fluxo acordado.

Trilha recebida: `( Trap beat Sem Direitos Autorais ) Trap Andretti - IDEFK [pwH098QFUAQ] (2).mp3`. Original preservado; cópia de trabalho em `public/audio/trap-andretti-idefk.mp3`. Duração medida: 145,031837s, estéreo, 44,1kHz. Planejamento em `src/audio-plan.json`.

Manter narração em primeiro plano, trilha como condução de ritmo, ducking durante a voz, recuperação suave nas pausas e fade final. Ponto de entrada planejado em 10s, conforme padrão vigente; os 135s restantes atendem à duração atual. Regenerar a análise de pulsos com a nova faixa e o mesmo offset da reprodução. O alvo de mixagem de referência é próximo a -16 LUFS, sujeito à medição da mixagem real. Não foi criada nem avaliada uma mixagem nesta etapa.

A narração recebida foi preservada. A média por jogo e a leitura específica sobre Ancelotti foram acrescentadas visualmente; ainda não foram gravadas como falas novas. Avaliar a permanência dessas telas na sincronização sem alterar a voz automaticamente.

## Verificação desta revisão

TypeScript sem erros. Os 15 PNGs e versões em 360px foram novamente exportados; tela 10, contexto e timeline inspecionados visualmente a 360px. Studio inspecionado nas 15 composições, sem alertas de transbordamento nas áreas de conteúdo marcadas, com fotos e Poppins carregadas. Galeria testada com 15 imagens e navegação funcional. Relatórios em `review/layout-studio.json` e `review/galeria-verificacao.json`.

Galeria atualizada: `entrega/etapa-2/REVISAR-TELAS.html`. Etapa 2 permanece em revisão visual; os ajustes não constituem aprovação automática para avançar, conforme o briefing do usuário.
