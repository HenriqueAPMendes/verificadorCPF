
/**
 * Class CPF para validação de formulários
 * recebe como parâmetro string, preferencialmente o input
 */
class CPF {
    constructor(cpf) {
        Object.defineProperties(this, {
            cpf: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: cpf
            },
            cpfLimpo: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: cpf.replace(/\D+/g, '')
                // Regex para remover qualquer dado que nao seja um digito
            }
        });

        // Segundo defineProperties para que value possa receber 
        // retorno da funcao valida()
        Object.defineProperties(this, {
            valido: {
                writable: false,
                enumerable: false,
                configurable: false,
                value: this.valida()
            }
        });
    }

    get value() {
        return this.cpfLimpo;
    }

    get isValid() {
        return this.valido;
    }

    // Retorna true/false para documento valido/invalido
    valida() {
        if (this.cpfLimpo.length !== 11) return false;

        // Teste primeiro digito verificador

        // Acumula primeiros 9 digitos
        const digits = [];
        for (let i = 0; i < 9; i++) {
            digits.push(Number(this.cpfLimpo[i]));
        }

        let firstDigit = digits
            .map((value, index) => value *= (10 - index))
            .reduce((ac, value) => {
                ac += value;
                return ac;
            });

        firstDigit = ((firstDigit * 10) % 11) % 10;

        digits.push(Number(this.cpfLimpo[9]));
        if (firstDigit !== digits[9]) return false;

        // Teste segundo digito verificador

        let secondDigit = digits
            .map((value, index) => value *= (11 - index))
            .reduce((ac, value) => {
                ac += value;
                return ac;
            });

        secondDigit = ((secondDigit * 10) % 11) % 10;

        return (secondDigit === Number(this.cpfLimpo[10]));
    }
};