import paddles from "./paddles.mjs"

function paddleTemplate(paddle, rank) {
    return `
        <div class="paddle">
            <h3>${rank}. ${paddle.name}</h3>
            <div class="detail">
                <img src="${paddle.image}" alt="${paddle.name}">
                <p>${paddle.description}</p>
            </div>
        </div>
    `;
}

function renderPaddles(paddles) {
    const element = document.querySelector("#top-10s");
    element.innerHTML = ``;
    for (let i = 1; i <= 10; i++) {
        const html = paddleTemplate(paddles[i - 1], i);
        element.innerHTML += html;
    }
}

function change() {
    const titleElement = document.querySelector("h2");
    const element = document.querySelector("#preference-selector");
    const output = element.value;
    let sortedPaddles = [];
    if (output == "power") {
        sortedPaddles = paddles.sort((a, b) => b.power - a.power);
        titleElement.innerText = "Top 10 Power Paddles";
    } else if (output == "control") {
        sortedPaddles = paddles.sort((a, b) => b.control - a.control);
        titleElement.innerText = "Top 10 Control Paddles";
    } else if (output == "spin") {
        sortedPaddles = paddles.sort((a, b) => b.spin - a.spin);
        titleElement.innerText = "Top 10 Spin Paddles";
    }
    const top10s = sortedPaddles.slice(0, 10);
    renderPaddles(top10s);
}

function init() {
    change();
}

init();
document.querySelector("#preference-selector").addEventListener("change", change);