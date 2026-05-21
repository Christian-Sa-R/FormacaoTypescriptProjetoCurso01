//primitivos
let numero: number = 300;
let texto: string = "";
let boleano: boolean = true;
let qualquer: any = true;
qualquer = "verdadeiro";

//arrays
const lista = [];
lista.push("texto", 2, true, [2, "texto"]);
const lista2: number[] = [];
lista2.push(1, 2, 3, 4);

//personalizados (type alias)
type Transacao = {
  tipoTransacao: TipoTransacao;
  data: Date;
  valor: number;
};

//enums
enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}

const novaTransacao: Transacao = {
  tipoTransacao: TipoTransacao.DEPOSITO,
  data: new Date(),
  valor: 0,
};
