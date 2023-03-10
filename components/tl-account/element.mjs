import template from './template.mjs';
import { formatToDollar, formatToDollars } from "https://stocks.thonly.org/library/utils.mjs";

class TlAccount extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(type, { account, stocks }) {
        this.shadowRoot.getElementById('title').textContent = `${type}'s Stocks`;
        this.shadowRoot.getElementById('value').textContent = formatToDollars(this.#sum(stocks));
        formatToDollar(this.shadowRoot.getElementById('net'), this.#net(stocks));
    }

    #sum(stocks) {
        let total = 0;
        for (let stock in stocks) {
            total += stocks[stock].position ? stocks[stock].position.marketValue : 0;
        }
        return total;
    }

    #net(stocks) {
        let total = 0;
        for (let stock in stocks) {
            if (stocks[stock].position) {   
                total += (stocks[stock].position.averagePrice - stocks[stock].mark) * stocks[stock].position.shortQuantity || (stocks[stock].mark - stocks[stock].position.averagePrice) * stocks[stock].position.longQuantity;
            }
        }
        return total;
    }
}

customElements.define("tl-account", TlAccount);