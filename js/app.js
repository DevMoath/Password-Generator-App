class Page {
    constructor() {
        this.result = document.getElementById('result');
        this.copy = document.getElementById('copy');
        this.length = document.getElementById('length');
        this.uppercase = document.getElementById('uppercase');
        this.lowercase = document.getElementById('lowercase');
        this.number = document.getElementById('number');
        this.symbol = document.getElementById('symbol');
        this.generate = document.getElementById('generate');
    }

    init(app) {
        this.result.addEventListener('focus', () => {
            this.result.parentElement.classList.add('custom-shadow');
        });

        this.result.addEventListener('blur', () => {
            this.result.parentElement.classList.remove('custom-shadow');
        });

        this.generate.addEventListener('click', () => {
            let hasLower = this.lowercase.checked;
            let hasUpper = this.uppercase.checked;
            let hasNumber = this.number.checked;
            let hasSymbol = this.symbol.checked;
            let length = this.length.value;

            app.generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
        });

        this.copy.addEventListener('click', () => {

            if(this.result.value === '') {
                swal.fire({
                    type: 'error',
                    title: 'Generate password first',
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000
                });
                this.generate.focus();
                return;
            }

            this.result.select();
            this.result.setSelectionRange(0, 99999); /*For mobile devices*/

            /* Copy the text inside the text field */
            document.execCommand("copy");

            swal.fire({
                type: 'success',
                title: 'Password Copied',
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000
            });
        });
    }

    print() {
        return [
            this.result,
            this.copy,
            this.length,
            this.uppercase,
            this.lowercase,
            this.number,
            this.symbol,
            this.generate
        ];
    }
}

class PasswordGenerator {
    constructor(dom) {
        this.dom = dom;
    }

    getRandomLowercase() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }

    getRandomUppercase() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    }

    getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }

    getRandomSymbols() {
        const symbols = '!@#$%^&*(){}[]=<>?,.';
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    generatePassword(lower, upper, number, symbol, length) {

        if(length < 8) {
            swal.fire({
                type: 'error',
                title: 'The minimum length of password is 8',
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000
            });
            this.dom.length.focus();
            return;
        } else if (length > 256) {
            swal.fire({
                type: 'error',
                title: 'The maximum length of password is 256',
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000
            });
            this.dom.length.focus();
            return;
        }

        const types = [
            {lower},
            {upper},
            {number},
            {symbol}
        ].filter(item => Object.values(item)[0]);

        if(types.length === 0) {
            swal.fire({
                type: 'error',
                title: 'Select at least one type',
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000
            });
            this.dom.uppercase.focus();
            return;
        }

        let password = [];

        for (let i = 0; i < length; i++) {
            let random = Math.floor(Math.random() * types.length);
            let func = Object.keys(types[random])[0];
            switch (func) {
                case 'upper':
                    password.push(this.getRandomUppercase());
                    break;
                case 'lower':
                    password.push(this.getRandomLowercase());
                    break;
                case 'number':
                    password.push(this.getRandomNumber());
                    break;
                case 'symbol':
                    password.push(this.getRandomSymbols());
                    break;
                default:
                    break;
            }
        }

        this.dom.result.value = password.join('');
        this.dom.result.focus();
    }
}

window.onload = () => {
    const dom = new Page();
    const app = new PasswordGenerator(dom);
    dom.init(app);
    dom.generate.click();
};