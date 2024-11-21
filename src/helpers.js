import { Render } from "./render.js";
import { CreateComplex } from "./domHelpers.js";

//global state variables
import { state, setState } from "./state.js";

/**
 * Hace todo lo necesario para cambiar de pantalla y crear un nuevo state en el browser history
 * @param {string} currentPage - la pantalla desde la cual me estoy moviendo
 * @returns {void} - no devuelve nada, solo cambia la pantalla
 */
export function ChangeScreen(currentPage) {
    // Crear nueva state
    state.currentPage = currentPage;
    window.history.pushState(state, null, "");

    // Cambiar de pantalla
    setTimeout(Render, 200);
}

/**
 * Configura el evento de pila para manejar el estado de la página
 */
export function SetWindowHistory() {
    //set history starting value
    window.history.replaceState(state, null, "");

    //set event for browser back action
    window.onpopstate = function (event) {
        if (event.state) {
            setState({ ...state, currentPage: event.state.currentPage });
        }

        Render();
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
 *
 * @param {HTMLElement} parent
 * @param {string} textContent
 * @returns {HTMLElement}
 */
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
 * @param {String[]} array
 * @returns {String} A string with all the array elements joined with a japanese comma
 */
export function JapaneseComaSeparatedArray(array) {
    let newArray = structuredClone(array);
    return newArray.join("、");
}

/**
 *
 * @param {*[]} arr
 * @returns {*[]}
 */
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

/**
 *
 * @param {Record<string, string[]>} obj
 * @param {String[]} value
 * @returns {String}
 */
export function getObjKey(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
}
