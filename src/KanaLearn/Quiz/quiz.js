import { instrucciones } from "../../data.js";
import { CreateAndClass, CreateSimple } from "../../domHelpers.js";
import {
    CleanAppPage,
    getObjKey,
    PopulateInstructions,
    shuffleArray,
} from "../../helpers.js";
import { kanaAnswers } from "../../romaji.js";
import { sets } from "../../sets.js";
import { setState, state } from "../../state.js";
import { BuildLearnPage } from "../learnPage.js";

let currentSetShuffled = state.currentSet;

export function BuildQuiz() {
    let app = CleanAppPage();
    PopulateInstructions(instrucciones.kanaquiz);

    let quizDiv = CreateAndClass("div", app, ["quizdiv"]);

    //randomize kana set
    currentSetShuffled = shuffleArray(state.currentSet);

    //build kana
    let kanaQuizPrompt = CreateAndClass("div", quizDiv, ["quizprompt"]);
    let kanaQuizPromptText = CreateSimple("p", kanaQuizPrompt);
    kanaQuizPromptText.classList.add("fade");
    kanaQuizPromptText.classList.add("quizprompttext");
    kanaQuizPromptText.textContent = currentSetShuffled[0];

    CreateAndClass("div", quizDiv, ["spacer"]);

    let answerButtons = CreateAndClass("div", quizDiv, ["quizbuttonsdiv"]);
    //build answer button array
    let answerButtonsArray = [];
    //first the answer button.
    let answerButton = document.createElement("button");
    answerButton.classList.add("correctquizanswerbtn");
    let correctAnswer = kanaAnswers[currentSetShuffled[0]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener("click", AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement("button");
    firstWrongAnswer.classList.add("incorrectquizanswerbtn");

    let randomKana = GetRandomKanaFromBaseThatsNot([currentSetShuffled[0]]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement("button");
    secondWrongAnswer.classList.add("incorrectquizanswerbtn");
    //randomKanaBase = GetRandomThatIsNot(currentSet, nots = [currentSet[0], randomKanaBase]);
    randomKana = GetRandomKanaFromBaseThatsNot([
        currentSetShuffled[0],
        randomKana,
    ]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, answerButtons);
}

/**
 * Mezcla los botones elegidos para el quiz
 * @param {HTMLButtonElement[]} arr
 * @param {HTMLElement} parent
 */
function AppendQuizButtons(arr, parent) {
    let shuffledButtonsArray = shuffleArray(arr);

    shuffledButtonsArray.forEach((button) => {
        parent.appendChild(button);
    });
}

/**
 * Obtiene un kana que no existe aun en el set, eligiendo de los kana actuales
 * @param {*} nots
 * @returns
 */
function GetRandomKanaFromBaseThatsNot(nots) {
    let arr = state.currentSet;

    let random;

    do {
        random = arr[Math.floor(Math.random() * arr.length)];
    } while (nots.includes(random));

    return random;
}

/**
 *
 * @param {MouseEvent} event
 */
function AnswerQuiz(event) {
    const button = /**@type {HTMLButtonElement}  */ (event.target);
    button.classList.add("correctquiz");
    button.disabled = true;
    button.removeEventListener("click", AnswerQuiz);

    setTimeout(GoToNextQuiz, 850);
}

/**
 *
 * @param {MouseEvent} event
 */
function FailQuiz(event) {
    const button = /**@type {HTMLButtonElement}  */ (event.target);
    button.classList.add("incorrectquiz");
    button.removeEventListener("click", FailQuiz);
}

function GoToNextQuiz() {
    //get kana display
    let kanatext = document.querySelector(".quizprompt p");
    let kanaindisplay = kanatext.textContent;
    //see if can get next kana
    let currentindex = currentSetShuffled.indexOf(kanaindisplay);
    let nextindex = currentindex + 1;
    if (nextindex >= currentSetShuffled.length) {
        //aqui deberia reemplazar los botones
        ShowAgainNextButtons();
    } else {
        //change display kana
        //kanatext.textContent = currentSet[nextindex];
        toggleTransitionWithTimeout(kanatext, currentSetShuffled[nextindex]);

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
    let correctAnswer = kanaAnswers[currentSetShuffled[currentindex]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener("click", AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement("button");
    firstWrongAnswer.classList.add("incorrectquizanswerbtn");
    let randomKana = GetRandomKanaFromBaseThatsNot([
        currentSetShuffled[currentindex],
    ]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement("button");
    secondWrongAnswer.classList.add("incorrectquizanswerbtn");
    randomKana = GetRandomKanaFromBaseThatsNot([
        currentSetShuffled[currentindex],
        randomKana,
    ]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, parent);
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

/**
 * Cambia el current set al siguiente, que haya un siguiente en existencia es verificado antes de la llamada a la funcion
 */
function TakeNextQuizSet() {
    let currentIndex = state.learnSets.indexOf(state.currentSet);
    let nextindex = currentIndex + 1;

    setState({ ...state, currentSet: state.learnSets[nextindex] });

    BuildLearnPage();
}
