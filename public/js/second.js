import paddles from "./paddles.mjs"

function paddleTemplate(paddle, rank) {
    return `
        <a class="mySlides fade" href="paddle.html?id=${paddle.id}">
            <div class="numbertext">${rank} / 10</div>
            <img src="${paddle.image}" style="width:45%; margin: auto;">
            <div class="text">${paddle.name}</div>
        </a>
    `;
}

function renderPaddles(paddles) {
    const element = document.querySelector(".slideshow-container");
    element.innerHTML = ``;
    for (let i = 10; i > 0; i--) {
        const html = paddleTemplate(paddles[i - 1], i);
        element.innerHTML += html;
    }
    element.innerHTML += `
            <a class="prev">&#10094;</a>
            <a class="next">&#10095;</a>`;
    slideIndex = 1;
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
    showSlides(slideIndex);
    document.querySelector(".prev").addEventListener("click", () => {
        plusSlides(-1);
    })

    document.querySelector(".next").addEventListener("click", () => {
        plusSlides(1);
    })
}

function init() {
    change();
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 10
    }
    if (n < 1) {slideIndex = 1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

let slideIndex = 1;
init();
showSlides(slideIndex);
document.querySelector("#preference-selector").addEventListener("change", change);
document.querySelector("#menu-icon").addEventListener("click", () => {
    const menu = document.querySelector("#normal-menu");
    menu.classList.toggle("is-active");
});
window.addEventListener("resize", () => {
    if (window.innerWidth > 810) {
        const menu = document.querySelector("#normal-menu");
        menu.classList.remove("is-active");
    }
});
console.log('###################################');
console.log('using second.js');
console.log('###################################');