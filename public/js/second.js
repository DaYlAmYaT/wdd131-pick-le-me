function hookPreferenceSelector() {
    const preferenceSelect = document.querySelector("#preference-selector");
    if (preferenceSelect) {
        preferenceSelect.addEventListener('change', () => {
            const selectedPreference = preferenceSelect.value;
            const url = new URL(window.location.href);

            if (selectedPreference)
                url.searchParams.set('preference', selectedPreference);
            

            window.location.href = url.toString();
        });
    }
}

function plusSlides(n) {
    slideIndex+=n
    showSlides();
}

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    if (slideIndex > slides.length)
        slideIndex = 10
    if (slideIndex < 1) 
        slideIndex = 1
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';

    console.log(slideIndex)
}

let slideIndex = 10;
document.addEventListener('DOMContentLoaded', (event) => {
    showSlides();
    // document.querySelector("#preference-selector").addEventListener("change", change);
    document.querySelector("#menu-icon").addEventListener("click", () => {
        const menu = document.querySelector("#normal-menu");
        menu.classList.toggle("is-active");
    });
    hookPreferenceSelector();
    window.addEventListener("resize", () => {
        if (window.innerWidth > 810) {
            const menu = document.querySelector("#normal-menu");
            menu.classList.remove("is-active");
        }
    });
    document.querySelector(".prev").addEventListener("click", () => {
        plusSlides(1);
    })

    document.querySelector(".next").addEventListener("click", () => {
        plusSlides(-1);
    })
})