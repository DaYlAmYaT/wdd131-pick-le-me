import paddles from "./paddles.mjs"

let displayingPaddles = []

function paddleTemplate(paddle) {
    return `
        <a class="paddle" href="paddle.html?id=${paddle.id}">
            <img src="${paddle.image}" alt="${paddle.name}">
            <h3>${paddle.name}</h3>
        </a>
    `;
}

function renderPaddles(paddleList) {
    const element = document.querySelector("#paddles");
    let html = ``;
    paddleList.forEach(paddle => {
        html += paddleTemplate(paddle);
    });
    element.innerHTML = html;
}

function init() {
    displayingPaddles = paddles;
    renderPaddles(displayingPaddles);
}

function search(paddle, query) {
    if (paddle.name.toLowerCase().includes(query) ||
        paddle.brand.toLowerCase().includes(query) ||
        paddle.description.toLowerCase().includes(query)) {
        return true;
    }
    return false;
}

function filter(query) {
    displayingPaddles = [];
    paddles.forEach(paddle => {
        if (search(paddle, query))
        {
            displayingPaddles.push(paddle);
        }
    });
    return displayingPaddles;
}

function searchHandler() {
    // preventDefault();
    const input = document.querySelector("#search-input").value.toLowerCase();
    displayingPaddles = filter(input);
    // const sortedResult = filterResult.sort((a, b) => a.name.localeCompare(b.name));
    renderPaddles(displayingPaddles);
}

function sort() {
    const element = document.querySelector("#sorting-selector");
    const output = element.value;
    let sortedPaddles = []
    if (output == "price-up") {
        sortedPaddles = displayingPaddles.sort((a, b) => a.price - b.price);
    } else if (output == "price-down") {
        sortedPaddles = displayingPaddles.sort((a, b) => b.price - a.price);
    } else if (output == "alphabet-up") {
        sortedPaddles = displayingPaddles.sort((a, b) => a.name.localeCompare(b.name));
    } else if (output == "power") {
        sortedPaddles = displayingPaddles.sort((a, b) => b.power - a.power);
    } else if (output == "control") {
        sortedPaddles = displayingPaddles.sort((a, b) => b.control - a.control);
    } else if (output == "spin") {
        sortedPaddles = displayingPaddles.sort((a, b) => b.spin - a.spin);
    }
    displayingPaddles = sortedPaddles;
    renderPaddles(displayingPaddles);
}

init();
document.querySelector("#search-button").addEventListener("click", searchHandler);
document.querySelector("#sorting-selector").addEventListener("change", sort)
document.querySelector("#menu-icon").addEventListener("click", () => {
    console.log("clicked");
})