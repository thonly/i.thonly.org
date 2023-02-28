import { THON } from 'https://stocks.thonly.org/global.mjs';
const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="${THON}/components/tl-stocks/shadow.css">
    <h1>Mom's Stocks</h1>
    <h1 id="value">$0</h1>
    <fieldset>
        <legend>NIO</legend>
        <article>
            <h2>Profit: <span id="dollar-profit">$0</span></h2>
            <!--<h2>% Profit: <span id="percent-profit">0%</span></h2>-->
        </article>
        <hr>
        <article>
            <h3>Price: <span id="price">$0</span></h3>
            <h3>Cost: <span id="cost">$0</span></h3>
            <h3>Quantity: <span id="quantity">0</span></h3>
        </article>
    </fieldset>
`;

export default template;