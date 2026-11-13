# Retrospectiva executiva — 13/11/2026

Entregas: `Retrospectiva-Executiva.pdf` (8 páginas) e `Retrospectiva-Executiva.pptx` (8 slides; textos, formas e três gráficos nativos editáveis, com planilhas incorporadas).

## O que os números significam

- Tempo: soma entre `task_started` e `task_complete` de turnos concluídos do agente principal. Inclui execução de ferramentas e esperas por renderização dentro desses turnos. Não mede horas humanas, tempo de GPU nem o prazo inteiro da pauta.
- Janela decorrida do primeiro ao último turno: Série B 87,0 min; Raphinha 146,9 min; EP01 78,0 min; EP02 75,5 min. Essa janela inclui intervalos entre os turnos. Não foi usada como tempo de execução nos gráficos.
- Tokens: soma de `usage` dos registros `token_usage_record`, deduplicados por `response_id`, atribuídos ao turno e ao modelo registrado no contexto. Entrada em cache é subconjunto da entrada; raciocínio é subconjunto da saída e não é somado novamente.
- A comparação cobre os ciclos locais registrados de produção, incluindo revisões da mesma pauta. Não cobre todo o esforço humano prévio na criação da marca ou nos dados. Raphinha inclui as versões V1, V2 e V3; Série B inclui prévia, final e revisão gráfica.
- Cortes: Série B, 10/11 16:59–18:27 UTC; Raphinha, 12/11 00:05–02:33 UTC; EP01, 12/11 18:58–20:17 UTC; EP02, 13/11 15:45–17:02 UTC. A apresentação usa a data local. Os registros individuais ficam no computador de origem, fora da publicação.
- Excluídos: revisão automática de aprovações, publicação do repositório, consolidação posterior dos manuais/relatórios e esta retrospectiva. Portanto, os valores não representam o consumo integral da conta.

## Custos: estimativa, não fatura

Não foi localizada uma fatura discriminada por vídeo. Por isso, não há afirmação de custo pago em reais ou dólares. Os créditos equivalentes são uma simulação com tarifas Standard vigentes na consulta, aplicadas ao mix histórico de tokens/modelos. Não estimam o percentual de franquia da assinatura, nem o débito histórico em outro modo de velocidade.

Fórmula por modelo: `[(entrada - cache) × tarifa_entrada + cache × tarifa_cache + saída × tarifa_saída] / 1.000.000`.

Tarifas (entrada / cache / saída): gpt-6.1-sol = 50 / 2,5 / 250 créditos; gpt-6-astra = 250 / 25 / 1.250 créditos. Fonte oficial consultada em 13/11/2026: https://learn.chatgpt.com/docs/pricing . O preço monetário do crédito depende do plano/contrato. Não foi assumido um câmbio ou preço de compra.

Não incluídos: ElevenLabs, geração de imagens, infraestrutura, energia, equipe ou outras ferramentas. Atribuir redução de tempo ao modelo exigiria um teste com briefing e critérios de qualidade iguais.

## Projeção

Média dos dois episódios da série: 40,0 min de execução e 82,9 créditos equivalentes por episódio. Base para 10 episódios: 400,2 min e 829,4 créditos. Meta hipotética de redução de 20%: 320,1 min e 663,5 créditos. O cenário pressupõe redução de tempo e de consumo ponderado; uma não garante a outra. Não é extrapolação estatística, orçamento fechado ou compromisso de entrega. A faixa de apenas duas observações não é intervalo de confiança.

O aprendizado descrito é operacional: instruções, componentes, dados e verificações foram incorporados ao projeto. Não significa treinamento ou alteração dos pesos do modelo.

## Base e verificação

`metricas.csv` e `metricas.json` permitem conferir os agregados por pauta. A publicação não inclui históricos privados, trechos de conversas, identificadores de turnos ou o extrator dos históricos locais. `gerar.cjs` gera os dois documentos a partir de `metricas.json`, sem precisar desses registros privados.

O PDF foi renderizado e as oito páginas foram revisadas visualmente. A estrutura do PPTX foi conferida: oito slides, três gráficos e três planilhas incorporadas. A abertura e a renderização no aplicativo PowerPoint não foram executadas; o PDF é a referência visual conferida. Poppins deve estar instalada para manter a tipografia no editor.
