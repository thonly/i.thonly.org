import template from './template.mjs';
import { formatToDollar, formatToDollars, formatToQuantity } from "https://stocks.thonly.org/library/utils.mjs";

class TlStocks extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(stocks) {
        console.log(stocks);
        this.shadowRoot.querySelector('main').replaceChildren(this.#renderPosition(stocks));
    }

    #renderPosition(stocks) {
        const fragment = document.createDocumentFragment();

        for (let stock in stocks) {
            if (stocks[stock].position) {
                const fieldset = document.createElement('fieldset');

                const legend = document.createElement('legend');
                legend.textContent = stock;
                
                const h2 = document.createElement('h2');
                const span = document.createElement('span');
                formatToDollar(span, (stocks[stock].position.averagePrice - stocks[stock].mark) * stocks[stock].position.shortQuantity || (stocks[stock].mark - stocks[stock].position.averagePrice) * stocks[stock].position.longQuantity);
                h2.append("Profit: ", span);

                const hr = document.createElement('hr');

                const price = document.createElement('h3');
                price.textContent = `Price: ${formatToDollars(stocks[stock].mark)}`;

                const cost = document.createElement('h3');
                cost.textContent = `Cost: ${formatToDollars(stocks[stock].position.averagePrice)}`;

                const quantity = document.createElement('h3');
                quantity.textContent = `Quantity: ${formatToQuantity(-stocks[stock].position.shortQuantity || stocks[stock].position.longQuantity)}`;
    
                fieldset.append(legend, h2, hr, price, cost, quantity);
                fragment.append(fieldset);
            }
        }

        return fragment;
    }
}

customElements.define("tl-stocks", TlStocks);