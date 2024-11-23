import { instrucciones } from "../data/data.js";
import { kanaAnswers } from "../data/romaji.js";
import { CreateAndClass } from "../helpers/domHelpers.js";
import { shuffleArray } from "../helpers/helpers.js";
import { BuildSetupPage } from "../KanaSelector/setupPage.js";
import { state, setState } from "../state/state.js";

export function BuildPracticePage() {
    setState({ ...state, failCounter: 0 });

    window.addEventListener("PageBuilt", AddMissClickListener);

    state.currentPage = "practice";
    window.history.pushState(state, null, "");

    //clean page
    let app = document.getElementById("app");
    app.innerHTML = "";

    //populate instruccions
    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = instrucciones.kanatable;

    const selected = state.practiceSets;
    let kanas = [];

    selected.forEach((array) => {
        array.forEach((kana) => {
            kanas.push(kana);
        });
    });

    //randomizar los kana
    let randomkanas = shuffleArray(kanas);
    //mandar a construir tarjetas con el array
    let elements = BuildCards(randomkanas);
    //agregar cada elemento al div correcto
    let practiceDiv = CreateAndClass("div", app, ["practiceDiv"]);

    elements.forEach((element) => {
        practiceDiv.appendChild(element);
    });

    //select first card
    let firstInput = document.querySelector("input");
    firstInput.focus();
    firstInput.parentElement.parentElement.classList.add("focus-card");

    CreateAndClass("div", app, ["spacer"]);
    //crear div para botones de again and exit
    let buttonsDiv = CreateAndClass("div", app, ["practiceagainbuttons"]);

    let againButton = CreateAndClass("button", buttonsDiv, [
        "practiceagainbtn",
    ]);
    againButton.textContent = "Desde 0";
    againButton.addEventListener("click", BuildPracticePage);

    let changeButton = CreateAndClass("button", buttonsDiv, [
        "practicechangebtn",
    ]);
    changeButton.textContent = "Cambiar Kanas";
    changeButton.addEventListener("click", () => BuildSetupPage("practice"));

    window.addEventListener("mouseup", WaitForMouseUp);
}

function BuildCards(kanas) {
    let cardElements = [];

    kanas.forEach((kana) => {
        let newcard = BuildKanaCard(kana);
        cardElements.push(newcard);
    });

    return cardElements;
}

function BuildKanaCard(kana) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("data-answer", kanaAnswers[kana]);
    let question = document.createElement("div");
    cardDiv.appendChild(question);
    question.classList.add("question");
    let span = document.createElement("span");
    span.classList.add("question-span");
    span.textContent = kana;
    question.appendChild(span);
    let form = document.createElement("form");
    cardDiv.appendChild(form);
    form.classList.add("form");
    let input = document.createElement("input");
    form.appendChild(input);
    form.addEventListener("submit", Submit);
    form.addEventListener("click", SelectInput);
    input.addEventListener("focus", checkFocus);
    input.type = "text";
    input.autocomplete = "off";
    input.size = 4;
    input.maxLength = 5;
    input.autocapitalize = "off";

    let tooltipText = document.createElement("span");
    tooltipText.classList.add("tooltiptext");

    let text = `Respuesta: '${kanaAnswers[kana]}'`;
    tooltipText.textContent = text;
    form.appendChild(tooltipText);

    return cardDiv;
}

function Submit(event) {
    let cardDiv = event.target.parentElement;
    let form = event.target;
    let input = event.target[0];
    let inputValue = event.target[0].value;
    inputValue = inputValue.toLowerCase();
    let answer = cardDiv.dataset.answer;

    if (inputValue == answer) {
        setState({ ...state, failCounter: 0 });
        form.children[1].classList.remove("show");
        event.target[0].disabled = true;
        form.classList.remove("incorrect");
        form.parentElement.classList.remove("focus-card");
        form.classList.add("correct");
        //pass focus
        FocusNext(event);
    } else {
        //TODO aqui incrementar contador
        setState({ ...state, failCounter: state.failCounter + 1 });
        if (state.failCounter > 1) {
            form.children[1].classList.add("show");
        }

        form.classList.add("incorrect");
        input.value = "";
    }

    //cardDiv.setAttribute('data-some', 20);

    event.preventDefault();
}

function FocusNext(event) {
    let inputs = Array.from(document.querySelectorAll("input"));
    let currentindex = inputs.indexOf(event.target[0]);

    let indexToCheck = LoopingIncrement(currentindex, inputs.length);

    //check todos los inputs hasta encontrar uno libre
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[indexToCheck].disabled) {
            inputs[indexToCheck].focus();
            return;
        } else {
            indexToCheck = LoopingIncrement(indexToCheck, inputs.length);
        }
    }

    const button = /**@type {HTMLButtonElement} */ (
        document.querySelector(".practiceagainbtn")
    );
    button.focus();
}

function LoopingIncrement(index, length) {
    let newindex = 0;

    if (index + 1 > length - 1) {
        newindex = 0;
    } else {
        newindex = index + 1;
    }

    return newindex;
}

function SelectInput(event) {
    event.currentTarget[0].focus();
}

function checkFocus(event) {
    let card = document.querySelector(".focus-card");
    if (card != null) card.classList.remove("focus-card");
    event.target.parentElement.parentElement.classList.add("focus-card");
    setState({ ...state, failCounter: 0 });
}

function AddMissClickListener() {
    window.addEventListener("click", CheckClick);
}

//check if clicked outside input in practice page
function CheckClick(event) {
    if (event.target.localName != "input" && event.target.localName != "form") {
        let card = document.querySelector(".focus-card");
        if (card != null) card.classList.remove("focus-card");
    }
}

//dumb but works
function WaitForMouseUp() {
    window.removeEventListener("mouseup", WaitForMouseUp);
    window.addEventListener("click", CheckClick);
}
