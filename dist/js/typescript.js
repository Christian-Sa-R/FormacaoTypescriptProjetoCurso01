"use strict";
//primitivos
let numero = 300;
let texto = "";
let boleano = true;
let qualquer = true;
qualquer = "verdadeiro";
//arrays
const lista = [];
lista.push("texto", 2, true, [2, "texto"]);
const lista2 = [];
lista2.push(1, 2, 3, 4);
//enums
var TipoTransacao;
(function (TipoTransacao) {
    TipoTransacao["DEPOSITO"] = "Dep\u00F3sito";
    TipoTransacao["TRANSFERENCIA"] = "Transfer\u00EAncia";
    TipoTransacao["PAGAMENTO_BOLETO"] = "Pagamento de Boleto";
})(TipoTransacao || (TipoTransacao = {}));
const novaTransacao = {
    tipoTransacao: TipoTransacao.DEPOSITO,
    data: new Date(),
    valor: 0,
};
