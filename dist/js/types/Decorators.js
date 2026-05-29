export function ValidaDebito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDebito) {
        if (valorDoDebito <= 0) {
            throw new Error("O valor do débito precisa ser maior do que 0.");
        }
        if (valorDoDebito > this.saldo) {
            throw new Error("Saldo insuficiente.");
        }
        return originalMethod.apply(this, [valorDoDebito]);
    };
    return descriptor;
}
export function ValidaDeposito(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (valorDoDeposito) {
        if (valorDoDeposito <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que 0.");
        }
        return originalMethod.apply(this, [valorDoDeposito]);
    };
    return descriptor;
}
