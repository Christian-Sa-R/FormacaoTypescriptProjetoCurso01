let saldo: number = 3000;

const elementoSaldo = document.querySelector(".valor") as HTMLElement;
const elementoDataAcesso = document.querySelector(
  ".block-saldo time",
) as HTMLElement;

elementoSaldo.textContent = saldo.toLocaleString("pt-br", {
  currency: "BRL",
  style: "currency",
});

const dataAcesso: Date = new Date();
elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
