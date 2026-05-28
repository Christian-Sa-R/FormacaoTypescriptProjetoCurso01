import { Armazenador } from "./Armazenador.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    nome;
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = Armazenador.obter("transacoes", (key, value) => {
        if (key === "data") {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(nome) {
        this.nome = nome;
    }
    getTitular() {
        return this.nome;
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = "";
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacoes = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
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
    getDataAcesso() {
        return new Date();
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao === TipoTransacao.TRANSFERENCIA ||
            novaTransacao.tipoTransacao === TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error("Transação inválida");
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
        console.log(this.getGruposTransacoes());
    }
    debitar(valor) {
        if (valor <= 0) {
            throw new Error("Valor debitado deve ser maior que 0");
        }
        if (valor > this.saldo) {
            throw new Error("Saldo insuficiente");
        }
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }
    depositar(valor) {
        if (valor <= 0) {
            throw new Error("Valor depositado deve ser maior que 0");
        }
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }
}
const conta = new Conta("Chris");
export default conta;
