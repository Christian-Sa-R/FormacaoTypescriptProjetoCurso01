"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector(".valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
elementoSaldo.textContent = formatarMoeda(saldo);
const dataAcesso = new Date();
elementoDataAcesso.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DIA_MES_ANO);
/* exercício aula 3
function registroTransacao(valor: number, data: Date): string {
  return `${formatarMoeda(valor)} - ${formatarData(data, FormatoData.DIA_MES)}`;
}
*/
