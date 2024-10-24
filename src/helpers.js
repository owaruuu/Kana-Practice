//En Helpers deberian estar todas las funciones que son ocupadas desde distintos lugares

import { Render } from "./render.js";
import {
    CreateGroupConfigButton,
    CreateNormalConfigButton,
} from "./labelHelpers.js";
import { CreateSimple, CreateAndClass, CreateComplex } from "./domHelpers.js";
import { sets } from "./sets.js";

//global state variables
import { state } from "./state.js";

// TODO - mover funcion a helpers ?
/**
 * Hace todo lo necesario para cambiar de pantalla y crear un nuevo state en el browser history
 * @var {string} currentPage - la pantalla desde la cual me estoy moviendo
 * @var {function} pageCallback - la funcion que se ejecuta para cambiar de pantalla
 * @returns {void} - no devuelve nada, solo cambia la pantalla
 */
export function ChangeScreen(currentPage, pageCallback) {
    // Crear nueva state
    state.currentPage = currentPage;
    window.history.pushState(state, null, "");

    // Cambiar de pantalla
    setTimeout(pageCallback, 200);
}

/**
 * Configura el evento de pila para manejar el estado de la página
 */
export function SetWindowHistory() {
    //set history starting value
    window.history.replaceState(state, null, "");

    window.onpopstate = function (event) {
        if (event.state) {
            state.currentPage = event.state.currentPage;
        }

        Render(state);
    };
}

/**
 * Scrolls to the top and cleans the 'app' div
 * @returns {HTMLElement} Returns a reference to the 'app' element
 */
export function CleanAppPage() {
    window.scrollTo(0, 0);
    let app = document.getElementById("app");
    app.innerHTML = "";

    return app;
}

/**
 * Changes the text inside the instructions
 * @param {String} content The content to display
 */
export function PopulateInstructions(content) {
    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = content;
}

/**
 * Creates the buttons to configure which elements to learn/study
 * @param {HTMLElement} parentDiv
 */
export function CreateSetupButtons(parentDiv) {
    let firstDiv = CreateSimple("div", parentDiv);

    //Boton Todos kana base
    CreateGroupConfigButton(
        firstDiv,
        "all-base",
        "all-main",
        "Todos Kana base"
    );

    let mainGroupButtons = CreateAndClass("div", firstDiv, [
        "kanagroupbuttons",
    ]);

    //Boton Todos hiragana
    CreateGroupConfigButton(
        mainGroupButtons,
        "all-hiragana-base",
        "all-hira",
        "Todos Hiragana"
    );

    let mainCheckBoxes = CreateAndClass("div", firstDiv, ["checkboxes"]);

    let hiraganaBase = CreateSimple("div", mainCheckBoxes);

    Object.keys(sets.mainkanasets).forEach((key) => {
        let array = structuredClone(sets.mainkanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(hiraganaBase, key, text);
    });

    //boton all katakana
    CreateGroupConfigButton(
        mainGroupButtons,
        "all-katakana-base",
        "all-kata",
        "Todos Katakana"
    );

    let katakanaBase = CreateSimple("div", mainCheckBoxes);

    //botones katakana
    Object.keys(sets.mainkatakanasets).forEach((key) => {
        let array = structuredClone(sets.mainkatakanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(katakanaBase, key, text);
    });

    let secondDiv = CreateSimple("div", parentDiv);

    CreateGroupConfigButton(
        secondDiv,
        "all-dakuten",
        "all-main",
        "Todos Dakuten/Handakuten"
    );

    mainGroupButtons = CreateAndClass("div", secondDiv, ["kanagroupbuttons"]);

    //all dakuten hiragana
    CreateGroupConfigButton(
        mainGroupButtons,
        "all-hiragana-dakuten",
        "all-hira",
        "Todos Hiragana"
    );

    let dakutenCheckBoxes = CreateAndClass("div", secondDiv, ["checkboxes"]);

    hiraganaBase = CreateSimple("div", dakutenCheckBoxes);

    Object.keys(sets.dakutenkanasets).forEach((key) => {
        let array = structuredClone(sets.dakutenkanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(hiraganaBase, key, text);
    });

    katakanaBase = CreateSimple("div", dakutenCheckBoxes);

    //all dakuten katakana
    CreateGroupConfigButton(
        mainGroupButtons,
        "all-katakana-dakuten",
        "all-kata",
        "Todos Katakana"
    );

    Object.keys(sets.dakutenkatakanasets).forEach((key) => {
        let array = structuredClone(sets.dakutenkatakanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(katakanaBase, key, text);
    });

    //extra katakana
    CreateGroupConfigButton(
        secondDiv,
        "all-extra",
        "all-extra",
        "Todos Katakana Extra"
    );

    let extraCheckBoxes = CreateAndClass("div", secondDiv, [
        "checkboxes",
        "extra",
    ]);

    let extra = CreateSimple("div", extraCheckBoxes);

    Object.keys(sets.extrasets).forEach((key) => {
        let array = sets.extrasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(extra, key, text);
    });

    let thirdDiv = CreateSimple("div", parentDiv);

    CreateGroupConfigButton(
        thirdDiv,
        "all-comb",
        "all-main",
        "Todos Combinacion"
    );

    mainGroupButtons = CreateAndClass("div", thirdDiv, ["kanagroupbuttons"]);

    CreateGroupConfigButton(
        mainGroupButtons,
        "all-hiragana-comb",
        "all-hira",
        "Todos Hiragana"
    );

    let combCheckBoxes = CreateAndClass("div", thirdDiv, ["checkboxes"]);

    hiraganaBase = CreateSimple("div", combCheckBoxes);

    Object.keys(sets.combkanasets).forEach((key) => {
        let array = structuredClone(sets.combkanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(hiraganaBase, key, text);
    });

    katakanaBase = CreateSimple("div", combCheckBoxes);

    //boton all katakana
    CreateGroupConfigButton(
        mainGroupButtons,
        "all-katakana-comb",
        "all-kata",
        "Todos Katakana"
    );

    //botones katakana
    Object.keys(sets.combkatakanasets).forEach((key) => {
        let array = structuredClone(sets.combkatakanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(katakanaBase, key, text);
    });
}

export function CreateStackedButton(parent, textContent) {
    let button = CreateComplex(
        "button",
        parent,
        null,
        ["uibtn", "homepage-button"],
        null
    );

    CreateComplex("span", button, null, ["uibtn-top"], textContent);

    return button;
}

/**
 * Joins a String array with japanese commas.
 * @param {Array<String>} array
 * @returns {String} A string with all the array elements joined with a japanese comma
 */
export function JapaneseComaSeparatedArray(array) {
    let newArray = structuredClone(array);
    return newArray.join("、");
}

export function shuffleArray(arr) {
    let newArray = arr;
    let currentIndex = arr.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex],
            newArray[currentIndex],
        ];
    }

    return newArray;
}

export function getObjKey(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
}
