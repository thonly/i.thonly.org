import { THON } from 'https://stocks.thonly.org/global.mjs';
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THON}/components/tl-actions/shadow.css">
    <main>
        <select></select>
        <button>Buy</button>
        <button>Sell</button>
        <button>Short</button>
        <button>Cover</button>
        <br><br>
    </main>
`;

export default template;