import { state } from "./helpers.js";
import { instrucciones, bigButtonExplanations } from "./data.js";
import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
} from "./domHelpers.js";
import { BuildLearnSetupPage } from "./learnSetupPage.js";

export function BuildHomePage() {
    document.getElementById("title").addEventListener("click", OnTitleClick);

    //popular instrucciones
    document.getElementById("instruccionescontent").textContent =
        instrucciones.home;

    //cargar ambos botones
    let contentDiv = document.getElementById("app");

    let optionsContainer = CreateComplex(
        "div",
        contentDiv,
        "options-container",
        []
    );
    // let optionsContainer = document.createElement("div");
    // optionsContainer.setAttribute("id", "options-container");
    // contentDiv.appendChild(optionsContainer);

    CreateComplex("div", contentDiv, null, ["desktopHomeDiv"]);
    // let desktopHomeDiv = document.createElement("div");
    // desktopHomeDiv.classList.add("desktopHomeDiv");
    // contentDiv.appendChild(desktopHomeDiv);

    let homeDiv = CreateComplex("div", contentDiv, null, []);
    // let homeDiv = document.createElement("div");
    // homeDiv.classList.add("homediv");
    // contentDiv.appendChild(homeDiv);

    let bigButtonLearn = CreateBigButton(
        "Aprender",
        bigButtonExplanations.learn
    );
    optionsContainer.appendChild(bigButtonLearn);

    let bigButtonPractice = CreateBigButton(
        "Practicar",
        bigButtonExplanations.practice
    );
    optionsContainer.appendChild(bigButtonPractice);

    let buttonAprender = document.createElement("button");
    buttonAprender.classList.add("uibtn");
    buttonAprender.classList.add("homepage-button");
    homeDiv.appendChild(buttonAprender);

    let buttonAprenderTop = document.createElement("span");
    buttonAprenderTop.textContent = "Aprender";
    buttonAprenderTop.classList.add("uibtn-top");
    buttonAprender.appendChild(buttonAprenderTop);

    let buttonPractica = document.createElement("button");
    buttonPractica.classList.add("uibtn");
    buttonPractica.classList.add("homepage-button");
    homeDiv.appendChild(buttonPractica);

    let buttonPracticaTop = document.createElement("span");
    buttonPracticaTop.textContent = "Practicar";
    buttonPracticaTop.classList.add("uibtn-top");
    buttonPractica.appendChild(buttonPracticaTop);

    bigButtonLearn.addEventListener("click", OnLearnButtonPress);
    bigButtonPractice.addEventListener("click", OnPracticeButtonPress);

    buttonAprender.addEventListener("click", OnLearnButtonPress);
    buttonPractica.addEventListener("click", OnPracticeButtonPress);
}

function CreateBigButton(cardTitle, explanationText) {
    let button = document.createElement("button");
    button.classList.add("desktopButton");

    let card = document.createElement("div");
    card.classList.add("homepage-card");
    button.appendChild(card);

    let title = document.createElement("h2");
    title.textContent = cardTitle;
    title.classList.add("homepage-card-title");
    card.appendChild(title);

    let img = document.createElement("img");
    img.classList.add("homepage-img");

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
    card.appendChild(img);

    let explanation = document.createElement("p");
    explanation.classList.add("homepage-card-footer");
    explanation.textContent = explanationText;
    card.appendChild(explanation);

    return button;
}

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

function OnTitleClick() {
    state.currentPage = "home";
    window.history.pushState(state, null, "");

    location.reload();
}
