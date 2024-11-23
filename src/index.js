import { SetWindowHistory, ChangeScreen } from "./helpers/helpers.js";
import { BuildHomePage } from "./homepage.js";

SetWindowHistory();

//Set Title Button
document.getElementById("title").addEventListener("click", OnTitleClick);

function OnTitleClick() {
    ChangeScreen("home");
}

BuildHomePage();
