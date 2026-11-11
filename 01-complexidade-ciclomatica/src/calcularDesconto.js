const REGRAS_DESCONTO = [
  { match: (c, v) => c.tipo === 'premium' && v > 1000 && c.anosCadastro > 5, percentual: 0.20 },
  { match: (c, v) => c.tipo === 'premium' && v > 1000, percentual: 0.15 },
  { match: (c, v) => c.tipo === 'premium' && v > 500, percentual: 0.10 },
  { match: (c) => c.tipo === 'premium', percentual: 0.05 },
  { match: (c, v) => c.tipo === 'gold' && v > 1000, percentual: 0.10 },
  { match: (c) => c.tipo === 'gold', percentual: 0.02 },
];

function calcularDesconto(cliente, valor) {
  const regra = REGRAS_DESCONTO.find((r) => r.match(cliente, valor));
  return regra ? valor * regra.percentual : 0;
}

module.exports = calcularDesconto;