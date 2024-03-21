import {
    CleanAppPage,
    PopulateInstructions,
    CreateSetupButtons,
} from "./helpers.js";
import { instrucciones } from "./data.js";
import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
    CreateUiButton,
} from "./domHelpers.js";
import { BuildLearnPage } from "./learnPage.js";

export function BuildLearnSetupPage() {
    let app = CleanAppPage();

    PopulateInstructions(instrucciones.aprender);

    let practiceSetupDiv = CreateAndClass("div", app, ["setupDiv"]);

    CreateSetupButtons(practiceSetupDiv);

    let startButton = CreateUiButton(app, "Aprender");
    startButton.addEventListener("click", CheckLearnSelected);
}

function CheckLearnSelected() {
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
        alert("Por favor selecciona lo que quieres practicar.");
        return;
    }

    learnSets = PopulateLearnSet(checked);
    currentSet = learnSets[0];

    BuildLearnPage();
}
