import { formatarMoeda, formatarData } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";
const elementoSaldo = document.querySelector(".valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
renderizarSaldo();
function renderizarSaldo() {
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
}
const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    },
};
export default SaldoComponent;
/* exercício aula 3
function registroTransacao(valor: number, data: Date): string {
  return `${formatarMoeda(valor)} - ${formatarData(data, FormatoData.DIA_MES)}`;
}
*/
