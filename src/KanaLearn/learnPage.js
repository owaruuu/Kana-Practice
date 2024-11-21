import {
    CleanAppPage,
    PopulateInstructions,
    JapaneseComaSeparatedArray,
    shuffleArray,
    getObjKey,
    CreateStackedButton,
} from "../helpers.js";
import { CreateSimple, CreateAndClass } from "../domHelpers.js";
import { instrucciones, explanationtext, KanaToInfo } from "../data.js";
import { kanaAnswers } from "../romaji.js";
import { sets } from "../sets.js";
import { state } from "../state.js";

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
        CreateLearnCard(learnCard);
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
        //si no, construir el kana card desde 0
        let cardParent = document.querySelector(".learncard");

        CreateLearnCard(cardParent);
    }
}

/**
 *
 * @param {HTMLDivElement} cardParent
 */
function CreateLearnCard(cardParent) {
    //remueve el elemento de explicacion detallada si se encuentra activo
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

function BuildQuiz() {
    let app = CleanAppPage();
    PopulateInstructions(instrucciones.kanaquiz);

    let quizDiv = CreateAndClass("div", app, ["quizdiv"]);

    //randomize kana set
    let base = getObjKey(sets.allkana, state.currentSet);

    state.currentSet = shuffleArray(state.currentSet);

    //build kana
    let kanaQuizPrompt = CreateAndClass("div", quizDiv, ["quizprompt"]);
    let kanaQuizPromptText = CreateSimple("p", kanaQuizPrompt);
    kanaQuizPromptText.classList.add("fade");
    kanaQuizPromptText.classList.add("quizprompttext");
    kanaQuizPromptText.textContent = state.currentSet[0];

    CreateAndClass("div", quizDiv, ["spacer"]);

    let answerButtons = CreateAndClass("div", quizDiv, ["quizbuttonsdiv"]);
    //build answer button array
    let answerButtonsArray = [];
    //first the answer button.
    let answerButton = document.createElement("button");
    answerButton.classList.add("correctquizanswerbtn");
    let correctAnswer = kanaAnswers[state.currentSet[0]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener("click", AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement("button");
    firstWrongAnswer.classList.add("incorrectquizanswerbtn");

    let randomKana = GetRandomKanaFromBaseThatsNot(base, [state.currentSet[0]]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement("button");
    secondWrongAnswer.classList.add("incorrectquizanswerbtn");
    //randomKanaBase = GetRandomThatIsNot(currentSet, nots = [currentSet[0], randomKanaBase]);
    randomKana = GetRandomKanaFromBaseThatsNot(base, [
        state.currentSet[0],
        randomKana,
    ]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, answerButtons);
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

function AppendQuizButtons(arr, parent) {
    console.log("🚀 ~ AppendQuizButtons ~ arr:", arr);
    arr = shuffleArray(arr);

    arr.forEach((element) => {
        parent.appendChild(element);
    });
}

function GetRandomKanaFromBaseThatsNot(base, nots) {
    let arr = sets.allkana[base];

    let random;

    do {
        random = arr[Math.floor(Math.random() * arr.length)];
    } while (IsEqual(nots, random));

    return random;

    // arr = shuffleArray(arr);
    // return arr[0];
}

function IsEqual(obj, prompt) {
    let exit = false;

    obj.forEach((key) => {
        // thekey = key;
        if (key === prompt) {
            exit = true;
        }
    });

    return exit;
}

function AnswerQuiz(event) {
    event.target.classList.add("correctquiz");
    event.target.disabled = true;

    setTimeout(GoToNextQuiz, 850);
}

function GoToNextQuiz() {
    //get kana display
    let kanatext = document.querySelector(".quizprompt p");
    let kanaindisplay = kanatext.textContent;
    //see if can get next kana
    let currentindex = state.currentSet.indexOf(kanaindisplay);
    let nextindex = currentindex + 1;
    if (nextindex >= state.currentSet.length) {
        //aqui deberia reemplazar los botones
        ShowAgainNextButtons();
    } else {
        //change display kana
        //kanatext.textContent = currentSet[nextindex];
        toggleTransitionWithTimeout(kanatext, state.currentSet[nextindex]);

        //erase buttons
        let buttonsdiv = document.querySelector(".quizbuttonsdiv");
        buttonsdiv.innerHTML = "";

        //create buttons again
        CreateQuizButtons(nextindex, buttonsdiv);
    }
}

function CreateQuizButtons(currentindex, parent) {
    //build answer button array
    let answerButtonsArray = [];
    //first the answer button.
    let answerButton = document.createElement("button");
    answerButton.classList.add("correctquizanswerbtn");
    let correctAnswer = kanaAnswers[state.currentSet[currentindex]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener("click", AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement("button");
    firstWrongAnswer.classList.add("incorrectquizanswerbtn");
    //let randomKanaBase= GetRandomThatIsNot(currentSet, nots = [currentSet[currentindex]]);
    let base = getObjKey(sets.allkana, state.currentSet);

    let randomKana = GetRandomKanaFromBaseThatsNot(base, [
        state.currentSet[currentindex],
    ]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement("button");
    secondWrongAnswer.classList.add("incorrectquizanswerbtn");
    //randomKanaBase = GetRandomThatIsNot(currentSet, nots = [currentSet[currentindex], randomKanaBase]);
    randomKana = GetRandomKanaFromBaseThatsNot(base, [
        state.currentSet[currentindex],
        randomKana,
    ]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, parent);
}

function FailQuiz(event) {
    event.preventDefault();
    event.target.classList.add("incorrectquiz");
    //event.target.disabled = true;
    //event.target.focus();
    event.target.removeEventListener("click", FailQuiz);
}

function ShowAgainNextButtons() {
    let buttonsdiv = /**@type {HTMLElement}*/ (
        document.querySelector(".quizbuttonsdiv")
    );
    buttonsdiv.innerHTML = "";

    let againbutton = CreateAndClass("button", buttonsdiv, ["againbtn"]);
    againbutton.textContent = "Una vez mas";
    againbutton.addEventListener("click", OnAgainButtonPress);

    let currentIndex = state.learnSets.indexOf(state.currentSet);
    let nextindex = currentIndex + 1;
    if (nextindex >= state.learnSets.length) {
        //mostrar boton de salir
        let exitbutton = CreateAndClass("button", buttonsdiv, ["exitbtn"]);
        exitbutton.textContent = "Salir";
        exitbutton.addEventListener("click", OnExitButtonPress);
    } else {
        //mostrar boton de next set
        let nextsetbutton = CreateAndClass("button", buttonsdiv, [
            "nextsetbtn",
        ]);
        nextsetbutton.textContent = "Seguir";
        nextsetbutton.addEventListener("click", OnTakeNextButtonPress);
    }
}

function OnAgainButtonPress(event) {
    event.target.disabled = true;
    setTimeout(TakeQuizAgain, 300);
}

function TakeQuizAgain() {
    BuildQuiz();
}

function OnExitButtonPress() {
    setTimeout(() => {
        location.reload();
    }, 250);
}

function OnTakeNextButtonPress(event) {
    event.target.disabled = true;
    setTimeout(TakeNextQuizSet, 300);
}

function toggleTransitionWithTimeout(element, text) {
    element.classList.remove("fade");
    setTimeout(() => {
        requestAnimationFrame(() => {
            element.textContent = text;
            element.classList.add("fade");
        });
    }, 225);
}

function TakeNextQuizSet() {
    let currentIndex = state.learnSets.indexOf(state.currentSet);
    let nextindex = currentIndex + 1;

    state.currentSet = state.learnSets[nextindex];
    BuildLearnPage();
}
