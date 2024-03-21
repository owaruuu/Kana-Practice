import { instrucciones, bigButtonExplanations } from "./data.js";
import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
} from "./domHelpers.js";
import { state } from "./helpers.js";

export function Render(state) {
    switch (state.currentPage) {
        case "home":
            ReloadPage();
            break;
        case "learnSetup":
            BuildLearnSetupPage();
            break;
        case "learn":
            BuildLearnSetupPage();
            break;
        case "practiceSetup":
            BuildPracticeSetupPage();
            break;
        case "practice":
            BuildPracticeSetupPage();
            break;
        default:
            break;
    }
}

function BuildPracticeSetupPage() {
    let app = CleanAppPage();

    //remove listeners
    window.removeEventListener("click", CheckClick);

    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = instrucciones.practicar;

    let setupDiv = document.createElement("div");
    setupDiv.classList.add("setupDiv");
    app.appendChild(setupDiv);

    CreateSetupButtons(setupDiv);

    let startButton = CreateUiButton(app, "Empezar Practica");
    startButton.addEventListener("click", CheckPracticeSelected);
}
