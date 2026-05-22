"use strict";
let saldo = 3000;
const elementoSaldo = document.querySelector(".valor");
const elementoDataAcesso = document.querySelector(".block-saldo time");
elementoSaldo.textContent = saldo.toLocaleString("pt-br", {
    currency: "BRL",
    style: "currency",
});
const dataAcesso = new Date();
elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
});
