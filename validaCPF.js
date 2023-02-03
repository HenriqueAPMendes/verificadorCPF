/**
     * Função para validar CPF a partir de string
     * 
     * @param {*} cpf string CPF
     * @returns valido: (true/false)
     */
function validaCPF(cpf) {

    // Regex: remove qualquer char que nao for um dígito.
    cpf = cpf.replace(/\D+/g, '');

    if (cpf.length !== 11) return false;

    // Acumula primeiros 9 digitos
    const digits = [];
    for (let i = 0; i < 9; i++) {
        digits.push(Number(cpf[i]));
    }

    let firstDigit = digits
        .map((value, index) => value *= (10 - index))
        .reduce((ac, value) => {
            ac += value;
            return ac;
        });

    firstDigit = ((firstDigit * 10) % 11) % 10;

    digits.push(Number(cpf[9]));
    if (firstDigit !== digits[9]) return false;

    // continua para ultimo digito

    let secondDigit = digits
        .map((value, index) => value *= (11 - index))
        .reduce((ac, value) => {
            ac += value;
            return ac;
        });


    secondDigit = ((secondDigit * 10) % 11) % 10;

    return (secondDigit === Number(cpf[10]));
}