let saldo = 3000;

const elementoSaldo = document.querySelector(".valor");
elementoSaldo.textContent = saldo;

const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", () => {
  event.preventDefault();
  if (!elementoFormulario.checkValidity()) {
    alert("Preencha todos os campos");
    return;
  }
});
