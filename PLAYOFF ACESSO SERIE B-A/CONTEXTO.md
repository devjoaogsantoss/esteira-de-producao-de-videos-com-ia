# Sportsmatch — passagem para Remotion

## Modelo consolidado para próximas pautas — 10/11/2026

Após a entrega da V2, o usuário adotou este formato como base dos próximos vídeos. A referência geral foi consolidada em `../REFERENCIA_TECNICA_VIDEOS.md`, com briefing em `../BRIEFING_NOVO_VIDEO.md`. O `../AGENTS.md` orienta os novos projetos do workspace a ler esses arquivos. A composição de referência é `SerieB2026-Grafica-V2`; os conteúdos, fontes e frames desta pauta continuam específicos da Série B.

## Revisão gráfica V2 — composição comparativa separada

Atendendo ao novo pedido, foi criada `SerieB2026-Grafica-V2`, mantendo o roteiro, o áudio aprovado e os 1494 frames. Dois estudos de título (A=110px, +25% sobre os 88px anteriores; B=linhas curtas com palavra-chave rosa) e dois diagramas foram exportados antes da implementação completa. B foi escolhida após inspeção a 360px. Títulos em Poppins Bold com tamanho real, sem esticamento vertical.

Os cartões neutros de 1º/2º sobem através do limite até duas vagas; os playoffs ganham duas conexões, setas IDA/VOLTA e fichas VENCEDOR neutras. Juventude e Vila Nova convergem para uma única vaga sem vencedor definido. Os confrontos mantêm projetado/confirmado. A continuidade preserva os acessos diretos em um resumo e revela outras duas vagas de playoffs. A timeline continua sincronizada à análise real da música, mais discreta.

O trecho foi exportado e inspecionado antes do render completo. Auditoria de 37 estados: sem transbordamentos nem sobreposições de tinta de texto após correções. O áudio do MP4 anterior é copiado por fluxo AAC, sem recodificação. Entrega em `entrega/revisao-grafica`; implementação em `src/GraphicRevision.tsx` e `src/GraphicFilm.tsx`. Registro completo: `docs/REVISAO-GRAFICA-V2.md`. As regras são locais a esta revisão; os manuais globais não foram alterados.

## Entrega com locução fornecida — 10/11/2026

O usuário forneceu o MP3 ElevenLabs de 50,364s. Original preservado em `public/audio/narracao-final-2026-fornecida.mp3`. Transcrição local e silêncios medidos permitiram sincronizar as sete etapas. Foi removido o trecho adicional “E os argumentos utilizados foram de” (36,67–39,17s), que poderia atribuir os ganhos editoriais à fonte oficial, mais 0,096s de silêncio final. Demais pausas, velocidade e tom preservados. Locução final: 47,768s; vídeo: 1494 frames / 49,8s, com encerramento de 2s. A fala fornecida usa condicional nos confrontos; o gráfico distingue o cenário projetado do duelo confirmado conforme CBF.

MP4 final, capa PNG e voz WAV estão em `entrega`. Mixagem final executada com sidechain, offset musical de 10s e fade. Nova narração integrada: a pendência TTS abaixo está resolvida. Projeto editável e instruções no README; ajustes detalhados em `docs/PRODUCAO-FINAL-2026.md`. Revisão visual e técnica executada; escuta subjetiva não disponível no ambiente.

## Atualização operacional — 10/11/2026, nova revisão

O pedido atual supera o roteiro antigo, a sequência de cinco telas, o prazo de 43s e os 1290 frames. A revisão vigente está em `public/originais/tela_01.png` a `tela_07.png` e `LEIA_PRIMEIRO.txt`; não há pasta `Publics` no pacote recebido. Foi criado um projeto Remotion editável nesta pasta, com `SerieB2026-Final`, `SerieB2026-Revisao` e capa PNG. Duração provisória: 49,5s, 1080×1920, 30fps; final limitado a 50s.

As páginas CBF de 07/11/2026 e ge de 05/02/2026 indicadas no novo pedido foram efetivamente consultadas. CBF sustenta acesso e duelo confirmado; ge sustenta votação e formato. O cenário permanece identificado. Ganhos comerciais/de engajamento são leitura editorial. Poppins Bold é exceção desta peça. Fotos, logos, escudos, animações, encerramento e timeline de pulsos reais da música foram implementados sem alterar originais.

Não há narração nova: nenhum TTS conectado nem credenciais disponíveis. A antiga não é usada. A prévia exportada com trilha não deve ser tratada como final. Pipeline de voz, normalização e ducking preparado em `scripts`; depende de novo áudio ou acesso autorizado. Detalhes e pendências: `docs/PRODUCAO-FINAL-2026.md`. Comandos: `README.md`.

O restante abaixo é o histórico anterior, não o briefing vigente.
Estado em 10/11/2026. Objetivo inicial: reconstruir em Remotion a última versão do vídeo para então experimentar melhorias. O MP4 de referência tem 43 segundos, 1080x1920, 30 fps. Não há projeto React/Remotion pronto neste pacote.

## Decisões da peça
Canal Instaplaysss; análise/edição Sportsmatch. Paleta #020C1F, #FF0244, #EEEEF0. Poppins Bold nos títulos por exceção aprovada nesta peça. Fotos originais com fade e blur localizado. Circular como marca-d'água; horizontal como assinatura. Escudos e logos de ligas recortados das duas referências fornecidas, com resolução limitada.
Texto ampliado aproximadamente 12%. Entradas curtas de 0,28s com deslocamento lateral e acomodação, pausas estáveis, saídas diagonais curtas.
Barra de progresso pulsa discretamente com a percussão.
Trilha começa no segundo 10 do arquivo original, baixa durante a voz e termina em fade.
Última voz neural foi aprovada quanto ao conteúdo; usuário pediu mais naturalidade e energia. A última interpretação entregue está em public/audio/narracao.wav. É áudio isolado de 43s com pausas incorporadas. Avaliação final desta interpretação ainda não recebida.

## Linha do tempo a 30 fps
Capa 0–1s, frames 0–29, estática presente no primeiro quadro.
Tela 1 1–10s, frames 30–299.
Tela 2 10–19s, frames 300–569.
Tela 3 19–29s, frames 570–869.
Tela 4 29–41s, frames 870–1229.
Encerramento 41–43s, frames 1230–1289. Bolas pequenas de basquete/futebol/tênis quicam; depois logo branco original entra quicando e fica.

## Conteúdo visual
1: 38 rodadas; Novorizontino já garantiu o acesso e o vice sobem direto.
2: 3º x 6º e 4º x 5º, ida e volta, uma vaga por duelo.
3: título “Então digamos que a serie B terminou assim…”. Novorizontino/Juventude sobem direto; Vila Nova x CRB e Fortaleza x Criciúma como cenário hipotético.
4: votação 17 a 3; possíveis ganhos de engajamento, potencial comercial e referências internacionais como leitura editorial. As ligas têm formatos diferentes.
Capa: “TUDO O QUE VOCÊ PRECISA SABER SOBRE O PLAYOFF DA SÉRIE B”.
Usuário pediu retirar avisos visuais de imagens ilustrativas, data a confirmar e classificação não verificada. A condição hipotética permanece no título da tela 3.

## Evidência e pendências
Fonte efetivamente consultada: ge, Raphael Zarko, 05/02/2026:
https://ge.globo.com/futebol/brasileirao-serie-b/noticia/2026/02/05/serie-b-do-brasileirao-tera-playoff-para-definir-acesso-ja-a-partir-de-2026-entenda-como-sera.ghtml
Confirma 38 rodadas, dois acessos diretos, cruzamentos, ida/volta e votação.
Classificação com os seis clubes não foi verificada. Não rotular como atual. Origem/autorização das fotos pendente.
A matéria não confirma engajamento e apelo comercial como argumentos oficiais da CBF.
Sugestões aceitas mas ainda não implementadas: antes/depois, mando/desempate e tabela com pontos. Exigem checagem antes de inserção.
O roteiro novo não cita os clubes da tela 3; considerar esse descompasso na revisão, preservando primeiro a referência.
Os ícones das ligas não provam equivalência de regulamentos.
Realize um tratamento nas logos dos times, remova o fundo e crie uma box de confronto para ilustrar a disputa do acesso ex: Box -> dentro da Box -> Fortaleza x Criciuma - Playoff de Acesso a Serie A 2027 (ida e volta)

## Arquivos
public/originais contém arquivos enviados pelo usuário.
public/fonts contém Poppins.
public/audio contém voz isolada e música original.
referencias contém MP4 atual, capa e PNGs finais.
legado contém scripts Python usados ao longo da produção. Alguns dependem de diretórios intermediários, portanto são referência de implementação, não um pipeline autossuficiente.
docs contém manuais e roteiro.
