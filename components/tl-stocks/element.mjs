import template from './template.mjs';

class TlStocks extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(stocks) {

    }
}

customElements.define("tl-stocks", TlStocks);