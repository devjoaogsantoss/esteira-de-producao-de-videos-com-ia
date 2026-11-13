# Por que o EP02 usou mais tokens?

O EP02 reutilizou o escopo e exigiu menos execução do agente, mas foi produzido na mesma conversa extensa do EP01, após a publicação do repositório. O histórico transportado cresceu. A publicação foi excluída do consumo atribuído ao EP02, mas o contexto resultante continuou disponível nas chamadas seguintes.

| Indicador | EP01 | EP02 |
|---|---:|---:|
| Chamadas ao modelo | 93 | 66 |
| Entrada média por chamada | 154.849 tokens | 380.476 tokens |
| Saída | 91.026 tokens | 70.669 tokens |
| Entrada total | 14.400.927 tokens | 25.111.408 tokens |
| Entrada em cache | 14.215.808 tokens | 24.734.976 tokens |

O número de chamadas caiu, mas a entrada média ficou 2,46 vezes maior. Cerca de 98% do aumento de tokens totais veio da entrada em cache. Isso não representa conteúdo novo criado na mesma proporção. Ambos os episódios usaram `gpt-6.1-sol`.

O aumento de 74% nos tokens totais corresponde a aproximadamente 46% na simulação de créditos Standard da apresentação; não é uma medição de cobrança. Cache e saída têm pesos diferentes nessa simulação.

Próxima melhoria proposta: uma conversa por episódio, com briefing, referências e componentes preservados nos arquivos. Isso deve ser testado e medido; ainda não há redução percentual demonstrada para esse novo fluxo.
