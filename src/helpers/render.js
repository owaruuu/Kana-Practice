import { BuildSetupPage } from "../KanaSelector/setupPage.js";
import { BuildLearnPage } from "../KanaLearn/learnPage.js";
import { state } from "../state/state.js";
import { BuildPracticePage } from "../KanaPractice/practicePage.js";
import { BuildHomePage } from "../homepage.js";

export function Render() {
    switch (state.currentPage) {
        case "home":
            BuildHomePage();
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
