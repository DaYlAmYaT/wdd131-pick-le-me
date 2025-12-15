import paddles from "./paddles.mjs"

let quiz_data = {}

async function load_quiz() {
    try {
        const response = await fetch("../quiz.json");

        if (!response.ok) {
            throw new Error("Unauthorized or error fetching data");
        }

        const data = await response.json();
        console.log(data);
        quiz_data = data;
    } catch (error) {
        console.error("Error:", error);
    }
}

function fieldset_template(question) {
    return `
        <fieldset id="${question.id}">
            <legend>${question.question_text}</legend>
            ${options_template(question.id, question.options)}
        </fieldset>
    `
}

function options_template(question, options) {
    let template = ``;
    for (let i = 1; i <= options.length; i++) {
        const id = question + "-" + i;
        template += `
                <div>
                    <input type="radio" id="${id}" name="${question}" value="${i}" required>
                    <label>${options[i-1].text}</label>
                </div>
            `
    }
    return template;
}

function render_quiz() {
    const quiz_questions = quiz_data.survey.questions;
    const form_element = document.querySelector("#quiz");
    quiz_questions.forEach(question => {
        form_element.innerHTML += fieldset_template(question);
    });
    form_element.innerHTML += `
        <fieldset>
            <legend>Email</legend>
            <label for="email"></label>
            <input type="text" id="fname" name="fname" placeholder="First Name" pattern="[A-Z]{1}[A-Za-z]{1,50}" required>
        </fieldset>
        `
        
}

function get_score(question, option) {
    const quiz_questions = quiz_data.survey.questions;
    return quiz_questions[question - 1].options[option - 1].score_value;
}

function calculate_score() {
    let total = 0;
    for (let i = 1; i <= 8; i++) {
        const selector = "input[name='q" + i + "']:checked"
        const selected_option = document.querySelector(selector);
        total += get_score(i,selected_option.value);
    }
    const score = total / 8;
    localStorage.setItem("score", score)
    return score;
}

function render_paddles(paddles) {
    const element = document.querySelector('#paddle-result');
    for (let i = 0; i < 5; i++) {
        element.innerHTML += `<img class="quiz-paddle" src="${paddles[i].image}" alt="${paddles[i].name}">`;
    }
}

function display_results() {
    let score = localStorage.getItem("score");
    if (!score) {
        score = calculate_score();
    }
    document.querySelector("#quiz-container").classList.add("hide");
    document.querySelector("#result").classList.remove("hide");
    let sortedPaddles = [];
    if (score > 65) {
        sortedPaddles = paddles.sort((a, b) => b.power - a.power);
    } else if (score > 35) {
        sortedPaddles = paddles.sort((a, b) => b.spin - a.spin);
    } else {
        sortedPaddles = paddles.sort((a, b) => b.control - a.control);
    }
    const top5s = sortedPaddles.slice(0, 5);
    render_paddles(top5s);
}

function check_for_score() {
    const score = localStorage.getItem("score");
    if (score) {
        display_results();
    } else {
        render_quiz();
    }
}

await load_quiz();
document.querySelector("#quiz-button").addEventListener("click", (e) => {
    e.preventDefault();
    const inputElement = document.querySelector("#fname");
    if (inputElement.checkValidity()) {
        display_results();
    } else {
        document.querySelector("h6").classList.remove("hide");
        window.scrollTo(0, 0);
    }
})
check_for_score();
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