import {
    CleanAppPage,
    PopulateInstructions,
    JapaneseComaSeparatedArray,
} from "../helpers/helpers.js";
import { CreateAndClass } from "../helpers/domHelpers.js";
import { instrucciones, explanationtext, KanaToInfo } from "../data/data.js";
import { kanaAnswers } from "../data/romaji.js";
import { sets } from "../data/sets.js";
import { state } from "../state/state.js";
import { BuildQuiz } from "./Quiz/quiz.js";

export function BuildLearnPage() {
    let app = CleanAppPage();

    //Populate instrucciones
    PopulateInstructions(instrucciones.kanalearn);

    let spacer = CreateAndClass("div", app, ["spacer"]);

    let titleKana = CreateAndClass("div", app, ["titleKana"]);
    titleKana.textContent = JapaneseComaSeparatedArray(
        sets.allkana[state.currentSet[0]]
    );

    spacer = CreateAndClass("div", app, ["spacer"]);

    //Armar divs
    let learnDiv = CreateAndClass("div", app, ["learndiv"]);
    let learnCard = CreateAndClass("div", learnDiv, ["learncard"]);

    let info = document.createElement("div");
    info.classList.add("info");

    spacer = CreateAndClass("div", learnDiv, ["spacer"]);
    spacer.appendChild(info);

    let explanation = explanationtext[state.currentSet[0]];
    if (explanation.length > 0) {
        createExplanationCard(learnCard, explanation);
    } else {
        CreateLearnCard();
        info.textContent = KanaToInfo(state.currentSet[0]);
    }

    spacer = CreateAndClass("div", learnDiv, ["spacer"]);

    let buttonsdiv = CreateAndClass("div", learnDiv, ["btn-div"]);

    let prevButton = CreateAndClass("button", buttonsdiv, ["prevbtn"]);
    prevButton.textContent = "Atras";
    prevButton.disabled = true;

    let nextButton = CreateAndClass("button", buttonsdiv, ["nextbtn"]);
    nextButton.textContent = "Siguiente";

    prevButton.addEventListener("click", () =>
        PreviousButton(prevButton, nextButton)
    );
    nextButton.addEventListener("click", () =>
        NextButton(nextButton, prevButton)
    );
}

/**
 *
 * @param {HTMLButtonElement} prevButton
 * @param {HTMLButtonElement} nextButton
 */
function PreviousButton(prevButton, nextButton) {
    //aqui decidir si estoy en una explicacion o no ?
    //get kana div
    let kanaelement = document.querySelector(".learnkana");

    if (kanaelement != null) {
        let kana = kanaelement.textContent;

        let index = state.currentSet.indexOf(kana);

        let indexminusone = index - 1;
        let prevkana = state.currentSet[indexminusone];

        if (indexminusone >= 0) {
            kanaelement.textContent = prevkana;

            //buscar el romaji correspondiente al nuevo kana y ponerlo tambien
            let romaji = kanaAnswers[prevkana];
            let info = document.querySelector(".info");
            info.textContent = KanaToInfo(prevkana);

            let romajielement = document.querySelector(".learnromaji");
            romajielement.textContent = romaji;

            //aqui tengo que cambiar el comportamiento del button
            //necesito revisar si quede en el primer kana y desactivar el button
            let previndex = indexminusone - 1;
            if (previndex < 0) {
                // let prevbutton = document.querySelector(".prevbtn");
                prevButton.disabled = true;
            }
        }

        // let nextbutton = document.querySelector(".nextbtn");
        if (nextButton.classList.contains("quiz")) {
            nextButton.classList.remove("quiz");
            nextButton.textContent = "Siguiente";
            nextButton.disabled = false;
        }
    }
}

/**
 *
 * @param {HTMLButtonElement} nextButton
 * @param {HTMLButtonElement} prevButton
 */
function NextButton(nextButton, prevButton) {
    //tomando el kana actual, buscarlo en el array y cambiar al siguiente si es posible
    let kanaelement = document.querySelector(".learnkana");

    //si existe el kana construir la siguiente carta
    if (kanaelement != null) {
        let kana = kanaelement.textContent;

        let index = state.currentSet.indexOf(kana);

        let indexplusone = index + 1;
        let nextkana = state.currentSet[indexplusone];

        if (indexplusone >= state.currentSet.length) {
            BuildQuiz();
        } else {
            kanaelement.textContent = nextkana;

            //buscar el romaji correspondiente al nuevo kana y ponerlo tambien
            let romaji = kanaAnswers[nextkana];
            let info = document.querySelector(".info");
            info.textContent = KanaToInfo(nextkana);

            let romajielement = document.querySelector(".learnromaji");
            romajielement.textContent = romaji;

            //aqui tengo que cambiar el comportamiento del button
            //necesito revisar si quede en el ultimo kana y cambiar el boton por el quiz
            let nextindex = indexplusone + 1;
            if (nextindex >= state.currentSet.length) {
                nextButton.textContent = "Quiz! ->";
                nextButton.classList.add("quiz");
                nextButton.disabled = true;
                setTimeout(function () {
                    nextButton.disabled = false;
                }, 500);
            }
        }

        //Check for prev button disable
        // let prevbutton = document.querySelector(".prevbtn");

        if (indexplusone > 0 && prevButton != null) {
            prevButton.disabled = false;
        }
    } else {
        CreateLearnCard();
    }
}

function CreateLearnCard() {
    //remueve el elemento de explicacion detallada si se encuentra activo
    let cardParent = /**@type {HTMLDivElement} */ (
        document.querySelector(".learncard")
    );
    let explanation = document.querySelector(".explanation");
    if (explanation != null) explanation.remove();

    PopulateInstructions(instrucciones.kanalearn);

    let learnKanaSection = CreateAndClass("div", cardParent, ["kanasection"]);
    let learnKanaTitle = CreateAndClass("div", learnKanaSection, [
        "learnkanatitle",
    ]);
    let learnKana = CreateAndClass("div", learnKanaSection, ["learnkana"]);
    let learnRomajiSection = CreateAndClass("div", cardParent, [
        "romajisection",
    ]);
    let learnRomaji = CreateAndClass("div", learnRomajiSection, [
        "learnromaji",
    ]);
    let learnRomajiTitle = CreateAndClass("div", learnRomajiSection, [
        "learnromajititle",
    ]);

    //popular contenido
    learnKanaTitle.textContent = "Kana";
    learnKana.textContent = state.currentSet[0];
    learnRomaji.textContent = kanaAnswers[state.currentSet[0]];
    learnRomajiTitle.textContent = "Romaji";

    let info = document.querySelector(".info");
    info.textContent = KanaToInfo(state.currentSet[0]);
}

/**
 *
 * @param {HTMLElement} parent
 * @param {String} explanation
 */
function createExplanationCard(parent, explanation) {
    let explanationSection = CreateAndClass("div", parent, ["explanation"]);
    explanationSection.textContent = explanation;
    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = instrucciones.explanation;
}
