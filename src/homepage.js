import { CreateStackedButton } from "./helpers.js";
import { state } from "./state.js";
import { instrucciones, bigButtonExplanations } from "./data.js";
import { CreateComplex, CreateAndClass } from "./domHelpers.js";
import { BuildLearnSetupPage } from "./learnSetupPage.js";

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
function OnLearnButtonPress() {
    //aqui deberia revisar que esta seleccionado y setear el 'learnsets'
    //esto deberia depender de lo que seleccione en el setup
    //en este punto el 'learnsets' ya deberia estar seteado y solo tengo que acceder al primero
    //currentSet = learnSets[0];

    // setTimeout(StartLearning,200);
    state.currentPage = "learnSetup";
    window.history.pushState(state, null, "");

    setTimeout(BuildLearnSetupPage, 200);
}

function OnPracticeButtonPress() {
    state.currentPage = "practiceSetup";
    window.history.pushState(state, null, "");

    setTimeout(BuildPracticeSetupPage, 200);
}
