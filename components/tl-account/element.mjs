import template from './template.mjs';

class TlAccount extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(type, account) {
        console.log(account);
        this.shadowRoot.getElementById('title').textContent = `${type}'s Stocks`;
    }
}

customElements.define("tl-account", TlAccount);