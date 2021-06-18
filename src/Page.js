export default class Page {
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
            if (this.result.value === '') {
                swal.fire({
                    icon: 'error',
                    title: 'Generate password first',
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.generate.focus();
                return;
            }

            this.result.select();
            this.result.setSelectionRange(0, 99999); /*For mobile devices*/

            /* Copy the text inside the text field */
            document.execCommand('copy');

            swal.fire({
                icon: 'success',
                title: 'Password Copied',
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
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
            this.generate,
        ];
    }
}
