import template from './template.mjs';
import { formatToDollars } from "https://stocks.thonly.org/library/utils.mjs";

class TlActions extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render({ account, stocks }) {
        console.log(account, stocks);
        this.shadowRoot.getElementById('value').textContent = formatToDollars(this.#sum(stocks));
    }

    #sum(stocks) {
        let total = 0;
        for (let stock in stocks) {
            total += stocks[stock].position ? stocks[stock].position.marketValue : 0;
        }
        return total;
    }
}

customElements.define("tl-actions", TlActions);