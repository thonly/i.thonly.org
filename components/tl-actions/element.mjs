import template from './template.mjs';

class TlActions extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(type, { account, stocks }) {
        this.#select(stocks);
        this.shadowRoot.querySelector('main').style.display = type === 'mom' ? 'none' : 'block';
    } 

    #select(stocks) {
        const select = this.shadowRoot.querySelector('select');
        for (let stock in stocks) {
            const option = document.createElement('option');
            option.textContent = stock;
            select.append(option);
        }
    }
}

customElements.define("tl-actions", TlActions);