import { GrupoTransacoes } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
  nome: string;
  saldo: number = JSON.parse(localStorage.getItem("saldo") || "0");
  transacoes: Transacao[] = JSON.parse(
    localStorage.getItem("transacoes") || "[]",
    (key: string, value: any) => {
      if (key === "data") {
        return new Date(value);
      }
      return value;
    },
  );

  constructor(nome: string) {
    this.nome = nome;
  }

  getGruposTransacoes(): GrupoTransacoes[] {
    const gruposTransacoes: GrupoTransacoes[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
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
  }

  getSaldo() {
    return this.saldo;
  }

  getDataAcesso(): Date {
    return new Date();
  }

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Transação inválida");
    }

    this.transacoes.push(novaTransacao);
    localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
    console.log(this.getGruposTransacoes());
  }

  debitar(valor: number): void {
    if (valor <= 0) {
      throw new Error("Valor debitado deve ser maior que 0");
    }
    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente");
    }
    this.saldo -= valor;
    localStorage.setItem("saldo", this.saldo.toString());
  }
  depositar(valor: number): void {
    if (valor <= 0) {
      throw new Error("Valor depositado deve ser maior que 0");
    }
    this.saldo += valor;
    localStorage.setItem("saldo", this.saldo.toString());
  }
}

const conta = new Conta("Chris");

export default conta;
