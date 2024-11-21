import { instrucciones, bigButtonExplanations } from "./data.js";
import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
} from "./domHelpers.js";
import { BuildLearnSetupPage } from "./KanaSelector/learnSetupPage.js";
import { BuildLearnPage } from "./KanaLearn/learnPage.js";
import { state } from "./state.js";

export function Render() {
    switch (state.currentPage) {
        case "home":
            ReloadPage();
            break;
        case "learnSetup":
            BuildLearnSetupPage();
            break;
        case "learn":
            BuildLearnPage();
            break;
        case "practiceSetup":
            // BuildPracticeSetupPage();
            break;
        case "practice":
            // BuildPracticeSetupPage(); //cambiar
            break;
        default:
            console.error("unknown page: " + state.currentPage);
            break;
    }
}

function ReloadPage() {
    window.location.reload();
}

// function BuildPracticeSetupPage() {
//     let app = CleanAppPage();

//     //remove listeners
//     window.removeEventListener("click", CheckClick);

//     let instContent = document.getElementById("instruccionescontent");
//     instContent.textContent = instrucciones.practicar;

//     let setupDiv = document.createElement("div");
//     setupDiv.classList.add("setupDiv");
//     app.appendChild(setupDiv);

//     CreateSetupButtons(setupDiv);

//     let startButton = CreateUiButton(app, "Empezar Practica");
//     startButton.addEventListener("click", CheckPracticeSelected);
// }
