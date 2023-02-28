import { ORIGIN } from "https://stocks.thonly.org/global.mjs";
import TDA from "https://stocks.thonly.org/library/TDA.mjs";

class TlProvider extends HTMLBodyElement {
    #tda = new TDA();

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.#tda.hasExpired()) {
            document.body.querySelector('header button').onclick = event => this.#connect(event.target);
            document.body.querySelector('header').style.display = 'block';
        } else {
            this.#render();
        }
    }

    async #connect(button=null) {
        let pin;
        if (button) {
            button.disabled = true;
            pin = window.prompt("Please enter your PIN:");
        } else {
            button = document.body.querySelector('button');
            button.disabled = true;
            pin = window.prompt("Incorrect PIN. Please try again:");
        }
        if (pin) await this.#getCredentials(pin)
        else button.disabled = false;
    }

    async #getCredentials(pin) {
        const response = await fetch(ORIGIN, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ pin })
        });

        const credentials = await response.json();
        if (credentials.personal) {
            sessionStorage.setItem('credentials', JSON.stringify(credentials));
            await this.#render();
        } else await this.#connect();
    }

    async #render() {
        const data = await this.#tda.getAccount2(document.body.querySelector('main').dataset.account);
        document.body.querySelector('tl-account').render(data.account);
        document.body.querySelector('tl-actions').render(data);
        document.body.querySelector('tl-stocks').render(data.stocks);

        document.body.querySelector('header').style.display = 'none';
        document.body.querySelector('main').style.display = 'block';
        document.body.querySelector('footer button').onclick = event => window.location = '/';
    }
}

customElements.define("tl-provider", TlProvider, { extends: 'body' });