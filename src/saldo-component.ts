let saldo: number = 3000;

const elementoSaldo = document.querySelector(".valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(
  ".block-saldo time",
) as HTMLElement;

elementoSaldo.textContent = formatarMoeda(saldo);

const dataAcesso: Date = new Date();
elementoDataAcesso.textContent = formatarData(
  dataAcesso,
  FormatoData.DIA_SEMANA_DIA_MES_ANO,
);

/* exercício aula 3
function registroTransacao(valor: number, data: Date): string {
  return `${formatarMoeda(valor)} - ${formatarData(data, FormatoData.DIA_MES)}`;
}
*/
