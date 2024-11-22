import {
    CleanAppPage,
    PopulateInstructions,
    CreateStackedButton,
    ChangeScreen,
} from "../helpers/helpers.js";
import { CreateSetupButtons } from "./kanaSelector.js";
import { instrucciones } from "../data/data.js";
import { GetLearnSets, setState, state } from "../state/state.js";

import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
} from "../helpers/domHelpers.js";

let startButton = null;

/**
 *
 * @param {"learn" | "practice"} type
 */
export function BuildSetupPage(type) {
    let app = CleanAppPage();

    PopulateInstructions(instrucciones[type]);

    let setupDiv = CreateAndClass("div", app, ["setupDiv"]);

    CreateSetupButtons(setupDiv);

    startButton = CreateComplex(
        "button",
        app,
        null,
        ["start-button"],
        type === "learn" ? "Aprender" : "Practicar"
    );
    startButton.setAttribute("type", type);

    startButton.addEventListener("click", CheckSelected);
}

function CheckSelected() {
    //remove listener
    startButton.removeEventListener("click", CheckSelected);

    //get all labels
    let buttons = document.querySelectorAll("div.checkboxes > div > label");

    //hacer un array con todos los 'check'
    let checked = [];

    buttons.forEach((button) => {
        if (button.classList.contains("check")) {
            checked.push(button);
        }
    });

    if (checked.length < 1) {
        startButton.addEventListener("click", CheckSelected);
        alert("Por favor selecciona lo que quieres practicar.");
        return;
    }

    const sets = GetLearnSets(checked);
    setState({ ...state, learnSets: sets, currentSet: sets[0] });

    ChangeScreen(startButton.getAttribute("type"));
}

// function BuildLearnSetupPage() {
//     let app = CleanAppPage();

//     PopulateInstructions(instrucciones.learn);

//     let practiceSetupDiv = CreateAndClass("div", app, ["setupDiv"]);

//     CreateSetupButtons(practiceSetupDiv);

//     startButton = CreateComplex(
//         "button",
//         app,
//         null,
//         ["start-button"],
//         "Aprender"
//     );

//     startButton.addEventListener("click", CheckLearnSelected);
// }

// /**
//  * Checks which config buttons are pressed and then builds the Learn Page
//  *
//  */
// function CheckLearnSelected() {
//     //remove listener
//     startButton.removeEventListener("click", CheckLearnSelected);

//     //get all labels
//     let buttons = document.querySelectorAll("div.checkboxes > div > label");

//     //hacer un array con todos los 'check'
//     let checked = [];

//     buttons.forEach((button) => {
//         if (button.classList.contains("check")) {
//             checked.push(button);
//         }
//     });

//     if (checked.length < 1) {
//         startButton.addEventListener("click", CheckLearnSelected);
//         alert("Por favor selecciona lo que quieres practicar.");
//         return;
//     }

//     const sets = GetLearnSets(checked);
//     setState({ ...state, learnSets: sets, currentSet: sets[0] });

//     ChangeScreen("learn");
// }
