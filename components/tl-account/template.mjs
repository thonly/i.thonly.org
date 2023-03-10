import { THON } from 'https://stocks.thonly.org/global.mjs';
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THON}/components/tl-account/shadow.css">
    <h1 id="title"></h1>
    <h1><span id="value"></span> | <span id="net"></span></h1>
`;

export default template;