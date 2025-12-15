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

function hookSortSelector() {
    console.log('-------------------------')
    console.log('hook sort selector');
    console.log('-------------------------')
    const sortSelector = document.querySelector("#sorting-selector");
    if (sortSelector) {
        sortSelector.addEventListener('change', () => {
            const selected = sortSelector.value;
            const url = new URL(window.location.href);

            if (selected)
                url.searchParams.set('sort', selected);
            
            window.location.href = url.toString();
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    // document.querySelector("#search-button").addEventListener("click", searchHandler);
    // document.querySelector("#sorting-selector").addEventListener("change", sort)
    hookSortSelector();
    document.querySelector("#menu-icon").addEventListener("click", () => {
        const menu = document.querySelector("#normal-menu");
        menu.classList.toggle("is-active");
    })

    window.addEventListener("resize", () => {
        if (window.innerWidth > 810) {
            const menu = document.querySelector("#normal-menu");
            menu.classList.remove("is-active");
        }
    })
})

console.log('##############')
console.log('Home js')
console.log('##############')