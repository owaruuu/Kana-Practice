import { CreateStackedButton, ChangeScreen } from "./helpers/helpers.js";
import { state } from "./state/state.js";
import { instrucciones, bigButtonExplanations } from "./data/data.js";
import { CreateComplex, CreateAndClass } from "./helpers/domHelpers.js";

export function BuildHomePage() {
    //popular instrucciones
    document.getElementById("instruccionescontent").textContent =
        instrucciones.home;

    //Build both buttons
    //Get app element
    let appDiv = document.getElementById("app");

    //Create desktop buttons container
    let desktopButtonsContainer = CreateComplex(
        "div",
        appDiv,
        "desktop-section-button-container",
        [],
        null
    );

    //Create mobile buttons container
    let mobileButtonContainer = CreateComplex(
        "div",
        appDiv,
        "mobile-section-button-container",
        [],
        null
    );

    //Create desktop buttons
    let desktopButtonLearn = CreateDesktopButton(
        "Aprender",
        bigButtonExplanations.learn,
        desktopButtonsContainer
    );

    let desktopButtonPractice = CreateDesktopButton(
        "Practicar",
        bigButtonExplanations.practice,
        desktopButtonsContainer
    );

    //Create mobile buttons
    let buttonAprender = CreateStackedButton(mobileButtonContainer, "Aprender");
    let buttonPractica = CreateStackedButton(
        mobileButtonContainer,
        "Practicar"
    );

    //Add click events
    desktopButtonLearn.addEventListener("click", OnLearnButtonPress);
    desktopButtonPractice.addEventListener("click", OnPracticeButtonPress);

    buttonAprender.addEventListener("click", OnLearnButtonPress);
    buttonPractica.addEventListener("click", OnPracticeButtonPress);
}

//Helper functions
function CreateDesktopButton(cardTitle, explanationText, parent) {
    let button = CreateAndClass("button", parent, ["desktopButton"]);

    let card = CreateAndClass("div", button, ["homepage-card"]);

    CreateComplex("h2", card, null, ["homepage-card-title"], cardTitle);

    let img = CreateAndClass("img", card, ["homepage-img"]);

    let imgFile = "";

    switch (cardTitle) {
        case "Aprender":
            imgFile = "../images/LearnButtonImg3.png";
            break;
        case "Practicar":
            imgFile = "../images/PracticeButtonImg1.png";
            break;
    }

    img.setAttribute("src", imgFile);
    img.setAttribute("alt", `Imagenes de la seccion ${cardTitle}`);

    CreateComplex("p", card, null, ["homepage-card-footer"], explanationText);

    return button;
}

//Callbacks

/**
 * Cambia la pantalla a la seleccion de kanas para la seccion de aprendizaje
 */
function OnLearnButtonPress() {
    ChangeScreen("learnSetup");
}

/**
 * Cambia la pantalla a la seleccion de kanas para la seccion de practica
 */
function OnPracticeButtonPress() {
    ChangeScreen("practiceSetup");
}
