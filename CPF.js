/**
 * Class CPF para validação de formulários
 * recebe como parâmetro string, preferencialmente o input
 * Também é capaz de gerar um novo CPF válido
 */
export default class CPF {
    constructor(cpf = '') {
        if (typeof cpf === 'number')
            throw new TypeError('Parameter "cpf" must be String');

        Object.defineProperties(this, {
            cpfLimpo: {
                writable: true,
                enumerable: false,
                configurable: false,
                value: cpf.replace(/\D+/g, '')
                // Regex para remover qualquer dado que nao seja um digito
            }
        });

        if (!cpf) this.geraCPF();

        /* Segundo defineProperties para que value possa receber retorno da funcao valida */
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
        if (!this.cpfLimpo) return false;
        if (this.cpfLimpo.length !== 11) return false;
        if (this.cpfLimpo[0].repeat(11) === this.cpfLimpo) return false;

        // Teste primeiro digito verificador

        // Acumula primeiros 9 digitos
        const digits = Array.from(this.cpfLimpo.slice(0, -2));

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

    geraCPF() {
        let newCPF = String(Math.floor(Math.random() * 10**9));
        // Separa os digitos em um array
        const digits = Array.from(newCPF);

        while (digits.length < 9) {
            digits.unshift('0');
        }

        // Obtem primeiro digito verificador

        let firstDigit = digits
            .map((value, index) => value *= (10 - index))
            .reduce((ac, value) => {
                ac += value;
                return ac;
            });

        firstDigit = ((firstDigit * 10) % 11) % 10;
        digits.push(firstDigit);

        // Obtem segundo digito verificador

        let secondDigit = digits
            .map((value, index) => value *= (11 - index))
            .reduce((ac, value) => {
                ac += value;
                return ac;
            });

        secondDigit = ((secondDigit * 10) % 11) % 10;

        this.cpfLimpo = digits.join('') + String(secondDigit);
    }
};
