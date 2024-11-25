import { SetWindowHistory, ChangeScreen } from "./helpers/helpers.js";
import { BuildHomePage } from "./homepage.js";

const ver = "0.9.3 - fix location.reload bug";
console.log("Welcome to Hiragana & Katakana, ver:", ver);

SetWindowHistory();

//Set Title Button
document.getElementById("title").addEventListener("click", OnTitleClick);

function OnTitleClick() {
    ChangeScreen("home");
}

BuildHomePage();
