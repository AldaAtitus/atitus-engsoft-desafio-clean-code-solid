function encontrarProdutosComuns(listaA, listaB) {
  const setA = new Set(listaA);   // índice O(1) para lookup
  const vistos = new Set();       // evita duplicatas no resultado
  const comuns = [];

  for (const item of listaB) {
    if (setA.has(item) && !vistos.has(item)) {
      vistos.add(item);
      comuns.push(item);
    }
  }
  return comuns;
}

module.exports = encontrarProdutosComuns;