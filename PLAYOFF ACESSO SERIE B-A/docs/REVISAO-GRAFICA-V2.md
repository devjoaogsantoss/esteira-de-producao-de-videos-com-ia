# Revisão de visibilidade e comunicação gráfica — V2

Escopo: comparação com o MP4 final aprovado de 49,8s. As mudanças desta revisão são locais a esta peça; não alteram os manuais de identidade. Roteiro, voz, trilha, paleta e duração foram preservados. A composição anterior continua registrada e o MP4 anterior permanece no mesmo caminho.

## Estudos e escolha

O título padrão anterior usa **88px** em Poppins Bold; na entrada havia escala uniforme de 1,05 (92,4px aparentes). Foram exportados os estudos antes da implementação completa:

- **A:** 110px reais, aumento de 25% sobre 88px, preservando a largura de 810px e a quebra natural. Na frase “UMA VAGA / DIRETA EM JOGO.”, a linha longa se quebra separando “EM” de “JOGO”.
- **B:** três linhas curtas, “UMA VAGA / DIRETA / EM JOGO.”, com 110/115/110px e destaque rosa em “DIRETA”. Escolhida por manter a unidade “EM JOGO”, reforçar a ação e ocupar melhor a altura. Não há esticamento vertical de letras.

As duas alternativas, o quadro de acesso direto e o quadro de playoff foram exportados em 1080×1920 e 360×640. A solução B foi aplicada ao sistema de títulos, com ajustes por comprimento: 96px para Novorizontino, 100–115px nos demais títulos principais. A acomodação usa tamanho real de fonte e posição; a proporção dos caracteres é preservada.

## Composições

- `SerieB2026-Grafica-V2`: revisão completa, 1494 frames, 1080×1920, 30fps.
- `Estudo-Titulo-A` e `Estudo-Titulo-B`: alternativas estáticas.
- `Estudo-Acesso-Direto` e `Estudo-Playoff`: diagramas completos estáticos.
- `SerieB2026-Final`: composição anterior preservada para comparação.

Fontes de implementação: `src/GraphicRevision.tsx` (elementos, tipografia e diagramas) e `src/GraphicFilm.tsx` (montagem, continuidade e sincronização). O encerramento original é reutilizado; a única mudança no arquivo anterior foi exportar esse componente para reutilização.

## Comunicação gráfica

**Acesso direto:** duas vagas “SÉRIE A 2027” recebem cartões neutros 1º/Campeão e 2º/Vice. Os cartões atravessam uma linha horizontal de acesso para cima durante “sobem direto” e permanecem acomodados. A regra é explicada com posições, sem atribuição de clubes.

**Continuidade:** os mesmos cartões e vagas diretas se acomodam em um resumo menor, acima da explicação de playoffs. A linha horizontal se divide nas conexões verticais. Aparecem explicitamente “OUTRAS DUAS VAGAS”, evitando confundir as duas diretas com as duas adicionais.

**Playoffs gerais:** duas colunas 3º × 6º e 4º × 5º, cada uma ligada a uma única vaga “SÉRIE A 2027”. Setas IDA e VOLTA aparecem durante a expressão correspondente. Duas fichas neutras “VENCEDOR” percorrem as conexões durante “cada vencedor”; não há escolha de clube vencedor.

**Novorizontino:** o selo de acesso garantido também atravessa uma linha e se acomoda na vaga durante a fala confirmada do acesso. É um fato já sustentado pela CBF, separado das disputas em aberto.

**Juventude/Vila Nova:** uma única vaga direta é destino de dois caminhos. Os escudos ocupam cartões de mesmas dimensões e tratamento, com alturas iguais de 150px. A aproximação é simultânea e simétrica, de 16px por lado. Nenhum escudo preenche a vaga. A posição do Juventude continua identificada como cenário.

**Confrontos com clubes:** escudos de 140px, nomes separados, × central, setas IDA/VOLTA e uma seta até uma única vaga por duelo. Vila Nova × CRB continua projetado; Fortaleza × Criciúma continua confirmado. As vagas permanecem sem vencedor.

**Fotografias:** os arquivos locais fornecidos mantêm cores naturais, fade escuro, blur localizado e movimento suave. A mudança de foto na explicação da regra acompanha a transição do acesso direto para os playoffs. Logos não foram redesenhados.

**Hierarquia:** textos de explicação em 40–44px, nomes de clubes em 34–38px, escudos em 140–150px e créditos em 28px. Rótulos de diagramas e destinos usam escala própria, a partir de 28px. O conteúdo crítico foi verificado na área x=90–900 / y=240–1500. A timeline fica subordinada abaixo da informação principal, com barras menores, progresso global e a análise da percussão original a partir de 10s.

## Sincronização

Os tempos foram obtidos da transcrição local do áudio aprovado e confrontados com os quadros do trecho exportado. Não houve alteração de áudio ou duração nesta revisão.

| Palavra ou expressão | Fala aproximada | Ação no vídeo |
|---|---|---|
| “playoff” do gancho | 4,18–4,76s | Destaque “AGORA, TEM PLAYOFF!” a partir do frame 125. |
| “sobem direto” | 8,26–9,20s | Subida dos cartões nos frames 248–272; estado final estável antes da reorganização. |
| “terceiro contra sexto” | 11,10–12,56s | Entrada do primeiro confronto a partir do frame 333. |
| “quarto contra quinto” | 12,94–13,92s | Entrada do segundo confronto a partir do frame 388. |
| “ida e volta” | 14,16–15,40s | Revelação das setas nos frames 425–436. |
| “cada vencedor” | 15,80–16,64s | Percurso das fichas neutras nos frames 474–499. |
| “garantiu o acesso” | 19,16–20,20s | Selo confirmado do Novorizontino sobe nos frames 575–594. |
| “disputam” | 22,22–22,56s | Aproximação equilibrada dos clubes nos frames 667–680. |

## Processo de revisão

1. Inspeção do projeto, manuais, decisões e quadros extraídos do MP4 final.
2. Exportação dos dois estudos de título e dos dois diagramas completos.
3. Escolha de B após comparação em 360px de largura.
4. Implementação separada e auditoria de 37 estados de layout, incluindo estados intermediários das ações.
5. Correção da sobreposição inicial entre posição e destino, do rodapé das ligas e dos créditos em duas linhas. Ajuste da ficha VENCEDOR para entrar no campo inferior do destino sem atravessar o texto “SÉRIE A 2027”.
6. Nova auditoria: zero transbordamentos de área segura e zero interseções de tinta dos textos nos estados inspecionados; conferência visual dos PNGs, inclusive a 360px. O cálculo distingue a tinta real das letras dos espaços da caixa tipográfica.
7. Render e reprodução integral do trecho frames 216–523, com 308 frames e aproximadamente 10,28s. Decodificação sem erros e playback sem quadros descartados. Amostras extraídas do próprio MP4 foram conferidas antes da exportação completa.
8. Render do vídeo completo, com cópia direta do fluxo AAC do MP4 anterior, preservando a narração e a trilha aprovadas sem recodificação. Verificação de identidade do áudio por SHA-256 do fluxo codificado e do WAV de mixagem original.

A inspeção de áudio desta revisão se limita à reprodução técnica e à identidade do fluxo aprovado; não há nova interpretação vocal nem nova mixagem. Não se afirma escuta subjetiva pelo agente.

### Resultado da verificação final

MP4 revisado com 1494 frames (49,8s de imagem; 49,813s no contêiner AAC), H.264, 1080×1920, 30fps, 33.607.052 bytes. Decodificação integral sem erros. Reprodução completa até o fim no navegador, sem quadros descartados. O fluxo AAC tem o mesmo SHA-256 do MP4 aprovado e o WAV de mixagem permanece inalterado: voz e trilha foram preservadas integralmente. Medidas mantidas: -16,29 LUFS e pico verdadeiro -4,50dBTP. Os quadros extraídos do próprio MP4 completo foram inspecionados, incluindo o encerramento.

## Entrega e reprodução

Arquivos em `entrega/revisao-grafica`:

- `Sportsmatch-SerieB2026-GRAFICA-V2.mp4`.
- `Comparacao-Titulos.png` — atual, A e B, cada quadro com 360px de largura.
- `Comparacao-Antes-Depois.png` — acesso direto, playoff, disputa e confrontos.
- `01-Titulo-A.png`, `02-Titulo-B.png`, `03-Acesso-Direto.png`, `04-Playoff.png` e suas versões de 360px.
- `Quadro-Acesso-Direto.png`, `Quadro-Playoff.png`, `Quadro-Disputa.png`, `Quadro-Confrontos.png` — capturas da composição completa revisada, também em 360px.
- `Trecho-Acesso-Playoffs-V2.mp4`.
- `VERIFICACAO-GRAFICA-V2.json`.

```powershell
npm.cmd run studio
node scripts/render-graphic.mjs proof
node scripts/qa-graphic.mjs excerpt
node scripts/render-graphic.mjs full
node scripts/qa-graphic.mjs full
```

Studio: `http://localhost:3000/SerieB2026-Grafica-V2`. O comando `full` reutiliza o bundle revisado apenas se a impressão digital dos fontes e do áudio corresponder; alterações posteriores provocam novo bundle.
