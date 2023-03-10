import template from './template.mjs';
import { formatToDollar, formatToDollars, formatToQuantity, formatToPercent } from "https://stocks.thonly.org/library/utils.mjs";

class TlStocks extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(stocks) {
        this.shadowRoot.querySelector('main').replaceChildren(this.#renderPosition(stocks));
    }

    #renderPosition(stocks) {
        const fragment = document.createDocumentFragment();

        for (let stock in stocks) {
            const fieldset = document.createElement('fieldset');
            const legend = document.createElement('legend');
            legend.textContent = stock;

            if (stocks[stock].position) {
                const h1 = document.createElement('h1');
                const span = document.createElement('span');
                const net = (stocks[stock].position.averagePrice - stocks[stock].mark) * stocks[stock].position.shortQuantity || (stocks[stock].mark - stocks[stock].position.averagePrice) * stocks[stock].position.longQuantity;
                formatToDollar(span, net);
                //h1.append(net < 0 ? "Loss: " : "Profit: ", span);
                h1.append(span);

                const hr = document.createElement('hr');

                const price = document.createElement('h3');
                price.textContent = `Price: ${formatToDollars(stocks[stock].mark)}`;

                const cost = document.createElement('h3');
                cost.textContent = `Cost: ${formatToDollars(stocks[stock].position.averagePrice)}`;

                const quantity = document.createElement('h2');
                quantity.textContent = `${formatToQuantity(-stocks[stock].position.shortQuantity || stocks[stock].position.longQuantity)} Shares`;
    
                fieldset.append(legend, h1, hr, quantity, price, cost);
            } else {
                const h1 = document.createElement('h1');
                h1.textContent = `${formatToDollars(stocks[stock].mark)}`;
                
                const h2 = document.createElement('h2');
                const span1 = document.createElement('span');
                const span2 = document.createElement('span');
                formatToDollar(span1, stocks[stock].mark - stocks[stock].closePrice);
                formatToPercent(span2, stocks[stock].mark / stocks[stock].closePrice * 100 - 100);
                h2.append(span1, " | ", span2);

                fieldset.append(legend, h1, h2);
            }

            fragment.append(fieldset);
        }

        return fragment;
    }
}

customElements.define("tl-stocks", TlStocks);