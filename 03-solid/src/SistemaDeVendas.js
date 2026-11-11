// 1) Validação — SRP
class ValidarPedido {
  validar(pedido) {
    if (!pedido) throw new Error('Pedido inválido');
    if (!Array.isArray(pedido.itens) || pedido.itens.length === 0) {
      throw new Error('Pedido sem itens');
    }
  }
}

// 2) Cálculo do total — SRP
class CalculadoraTotal {
  calcular(pedido) {
    const subtotal = pedido.itens.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    return subtotal > 1000 ? subtotal * 0.9 : subtotal;
  }
}

// 3) Persistência — SRP
class RepositorioPedidos {
  constructor(logger = console) {
    this.logger = logger;
    this.pedidos = new Map();
  }
  salvar(pedido) {
    this.logger.log(`Salvando pedido ${pedido.id}...`);
    this.pedidos.set(pedido.id, pedido);
  }
}

// 4) Notificação — SRP
class NotificadorEmail {
  constructor(logger = console) {
    this.logger = logger;
  }
  notificar(pedido) {
    this.logger.log(`Enviando e-mail para ${pedido.clienteEmail}...`);
  }
}

// 5) Orquestrador — DIP
class SistemaDeVendas {
  constructor({
    validador = new ValidarPedido(),
    calculadora = new CalculadoraTotal(),
    repositorio = new RepositorioPedidos(),
    notificador = new NotificadorEmail(),
  } = {}) {
    this.validador = validador;
    this.calculadora = calculadora;
    this.repositorio = repositorio;
    this.notificador = notificador;
  }

  async processarVenda(pedido) {
    this.validador.validar(pedido);
    const total = this.calculadora.calcular(pedido);
    const pedidoProcessado = { ...pedido, total, status: 'pago' };
    this.repositorio.salvar(pedidoProcessado);
    this.notificador.notificar(pedidoProcessado);
    return pedidoProcessado;
  }
}

module.exports = SistemaDeVendas;