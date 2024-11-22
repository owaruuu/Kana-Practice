import { BuildSetupPage } from "../KanaSelector/learnSetupPage.js";
import { BuildLearnPage } from "../KanaLearn/learnPage.js";
import { state } from "../state/state.js";

export function Render() {
    switch (state.currentPage) {
        case "home":
            ReloadPage();
            break;
        case "learnSetup":
            BuildSetupPage("learn");
            break;
        case "learn":
            BuildLearnPage();
            break;
        case "practiceSetup":
            BuildSetupPage("practice");
            break;
        case "practice":
            BuildPracticePage();
            break;
        default:
            console.error("unknown page: " + state.currentPage);
            break;
    }
}

function ReloadPage() {
    window.location.reload();
}
