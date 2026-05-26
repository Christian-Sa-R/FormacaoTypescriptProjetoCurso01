import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacoes } from "./GrupoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem("saldo") || "0");
const transacoes: Transacao[] = JSON.parse(
  localStorage.getItem("transacoes") || "[]",
  (key: string, value: string) => {
    if (key === "data") {
      return new Date(value);
    }
    return value;
  },
);

function debitar(valor: number): void {
  if (valor <= 0) {
    throw new Error("Valor debitado deve ser maior que 0");
  }
  if (valor > saldo) {
    throw new Error("Saldo insuficiente");
  }
  saldo -= valor;
  localStorage.setItem("saldo", saldo.toString());
}
function depositar(valor: number): void {
  if (valor <= 0) {
    throw new Error("Valor depositado deve ser maior que 0");
  }
  saldo += valor;
  localStorage.setItem("saldo", saldo.toString());
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso(): Date {
    return new Date();
  },

  getGruposTransacoes(): GrupoTransacoes[] {
    const gruposTransacoes: GrupoTransacoes[] = [];
    const listaTransacoes: Transacao[] = structuredClone(transacoes);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime(),
    );
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacoes: string = transacao.data.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" },
      );
      if (labelAtualGrupoTransacao != labelGrupoTransacoes) {
        labelAtualGrupoTransacao = labelGrupoTransacoes;
        gruposTransacoes.push({
          label: labelGrupoTransacoes,
          transacoes: [],
        });
      }
      gruposTransacoes.at(-1)?.transacoes.push(transacao);
    }
    return gruposTransacoes;
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO
    ) {
      debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Transação inválida");
    }

    transacoes.push(novaTransacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    console.log(this.getGruposTransacoes());
  },
};

export default Conta;
