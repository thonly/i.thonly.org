import { THON } from 'https://stocks.thonly.org/global.mjs';
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THON}/components/tl-actions/shadow.css">
    <h1 id="value"></h1>
`;

export default template;