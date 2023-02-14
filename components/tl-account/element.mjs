import template from './template.mjs';

class TlAccount extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(account) {

    }
}

customElements.define("tl-account", TlAccount);