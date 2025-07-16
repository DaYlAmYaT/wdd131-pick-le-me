import paddles from "./paddles.mjs"


function getParam(param) {
    const paramString = window.location.search;
    const params = new URLSearchParams(paramString);
    return params.get(param);
}

function getPaddleDetails() {
    const id = getParam("id");
    if (id) {
        const paddle = paddles.find((p) => p.id == id);
        if (paddle) {
            const element = document.querySelector('#details-container');
            element.innerHTML = `
            <img src="${paddle.image}" alt="${paddle.name}">
            <div id='details'>
                <h3>${paddle.name}</h3>
                <p>Brand: ${paddle.brand}</p>
                <p>Price: $${paddle.price}</p>
                <p>Power:   ${paddle.power}/10</p>
                <p>Control: ${paddle.control}/10</p>
                <p>Spin:    ${paddle.spin}/10</p>
                <br>
                <p>${paddle.description}</p>
            </div>
            `
        }
    }
}

function init() {
    console.log('init called');
    getPaddleDetails();
}

init();
document.querySelector("#menu-icon").addEventListener("click", () => {
    const menu = document.querySelector("#normal-menu");
    menu.classList.toggle("is-active");
})