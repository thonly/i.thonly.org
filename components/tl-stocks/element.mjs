import template from './template.mjs';
import { formatToDollar, formatToPercent, formatToDollars, formatToQuantity } from "https://stocks.thonly.org/library/utils.mjs";

class TlStocks extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(stocks) {
        console.log(stocks)
        this.#renderPosition(stocks.NIO)
    }

    #renderPosition(stock) {
        if (stock.position) {
            this.shadowRoot.getElementById('cost').textContent = formatToDollars(stock.position.averagePrice);
            this.shadowRoot.getElementById('quantity').textContent = formatToQuantity(-stock.position.shortQuantity || stock.position.longQuantity);
            this.shadowRoot.getElementById('price').textContent = formatToDollars(stock.mark);
            this.shadowRoot.getElementById('value').textContent = formatToDollars(stock.position.marketValue);
            
            const currentPrice = parseFloat(this.shadowRoot.getElementById('price').textContent.replace('$', ''));
            formatToDollar(this.shadowRoot.getElementById('dollar-profit'), (stock.position.averagePrice - currentPrice) * stock.position.shortQuantity || (currentPrice - stock.position.averagePrice) * stock.position.longQuantity);
            //formatToPercent(this.shadowRoot.getElementById('percent-profit'), stock.position.shortQuantity > 0 ? (stock.position.averagePrice / currentPrice * 100 - 100) : (currentPrice / stock.position.averagePrice * 100 - 100));
        } else {
            
        }
    }
}

customElements.define("tl-stocks", TlStocks);