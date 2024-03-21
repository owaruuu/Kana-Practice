import { CleanAppPage, PopulateInstructions } from "./helpers.js";
import { instrucciones } from "./data.js";
import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
    CreateUiButton,
    CreateSetupButtons,
} from "./domHelpers.js";

export function BuildLearnSetupPage() {
    let app = CleanAppPage();

    PopulateInstructions(instrucciones.aprender);

    let practiceSetupDiv = CreateAndClass("div", app, ["setupDiv"]);

    CreateSetupButtons(practiceSetupDiv);

    let startButton = CreateUiButton(app, "Aprender");
    startButton.addEventListener("click", CheckLearnSelected);
}
