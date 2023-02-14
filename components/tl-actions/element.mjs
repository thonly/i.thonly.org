import template from './template.mjs';

class TlActions extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render({ account, stocks }) {
        console.log(account, stocks)
    }
}

customElements.define("tl-actions", TlActions);