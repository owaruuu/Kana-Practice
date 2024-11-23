import {
    CleanAppPage,
    PopulateInstructions,
    ChangeScreen,
} from "../helpers/helpers.js";
import { CreateSetupButtons } from "./kanaSelector.js";
import { instrucciones } from "../data/data.js";
import { GetKanaSets, setState, state } from "../state/state.js";

import { CreateComplex, CreateAndClass } from "../helpers/domHelpers.js";

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
    let labels = /**@type {NodeListOf<HTMLElement>} */ (
        document.querySelectorAll("div.checkboxes > div > label")
    );

    //hacer un array con todos los 'check'
    let checked = /**@type {HTMLElement[]} */ ([]);

    labels.forEach((label) => {
        if (label.classList.contains("check")) {
            checked.push(label);
        }
    });

    if (checked.length < 1) {
        startButton.addEventListener("click", CheckSelected);
        alert("Por favor selecciona lo que quieres practicar.");
        return;
    }

    const type = startButton.getAttribute("type");

    if (type === "learn") {
        const sets = GetKanaSets(checked);
        setState({ ...state, learnSets: sets, currentSet: sets[0] });
    } else {
        const sets = GetKanaSets(checked);
        setState({ ...state, practiceSets: sets });
    }

    ChangeScreen(startButton.getAttribute("type"));
}
