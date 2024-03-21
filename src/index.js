//jshint esversion:9
import {
    instrucciones,
    infotext,
    explanationtext,
    bigButtonExplanations,
} from "./data.js";

import { BuildHomePage } from "./homePage.js";

import { state } from "./helpers.js";

import { romajiConsonants, kanaAnswers, kanaWrongs } from "./romaji.js";

import { CreateSimple, CreateAndClass, CreateAndId } from "./domHelpers.js";

import { SetWindowStateEvent } from "./helpers.js";

//set history starting value
window.history.replaceState(state, null, "");

SetWindowStateEvent();

let learnSets = [];
let currentSet = [];

let failCounter = 0;

//Set Title Button
document.getElementById("title").addEventListener("click", OnTitleClick);

//Esto es lo que deberia quedarse
BuildHomePage();

function Submit(event) {
    let cardDiv = event.target.parentElement;
    let form = event.target;
    let input = event.target[0];
    let inputValue = event.target[0].value;
    inputValue = inputValue.toLowerCase();
    let answer = cardDiv.dataset.answer;

    if (inputValue == answer) {
        failCounter = 0;
        form.children[1].classList.remove("show");
        event.target[0].disabled = true;
        form.classList.remove("incorrect");
        form.parentElement.classList.remove("focus-card");
        form.classList.add("correct");
        //pass focus
        FocusNext(event);
    } else {
        //TODO aqui incrementar contador
        failCounter += 1;
        if (failCounter > 1) {
            form.children[1].classList.add("show");
        }

        form.classList.add("incorrect");
        input.value = "";
    }

    //cardDiv.setAttribute('data-some', 20);

    event.preventDefault();
}

function CheckForExplanation(cardParent) {
    //aqui agregar check, if true, hacer otro tipo de tarjeta
    let explanation = explanationtext[currentSet[0]];

    if (explanation.length > 0) {
        let explanationSection = CreateAndClass("div", cardParent, [
            "explanation",
        ]);
        explanationSection.textContent = explanation;
        let instContent = document.getElementById("instruccionescontent");
        instContent.textContent = instrucciones.explanation;

        return true;
    } else {
        CreateLearnCard(cardParent);
        return false;
    }
}

function CreateLearnCard(cardParent) {
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
    learnKana.textContent = currentSet[0];
    learnRomaji.textContent = kanaAnswers[currentSet[0]];
    learnRomajiTitle.textContent = "Romaji";

    let info = document.querySelector(".info");
    info.textContent = KanaToInfo(currentSet[0]);
}

function PreviousButton() {
    //aqui decidir si estoy en una explicacion o no ?
    //get kana div
    let kanaelement = document.querySelector(".learnkana");

    if (kanaelement != null) {
        let kana = kanaelement.textContent;

        let index = currentSet.indexOf(kana);

        let indexminusone = index - 1;
        let prevkana = currentSet[indexminusone];

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
                let prevbutton = document.querySelector(".prevbtn");
                prevbutton.disabled = true;
            }
        }

        let nextbutton = document.querySelector(".nextbtn");
        if (nextbutton.classList.contains("quiz")) {
            nextbutton.classList.remove("quiz");
            nextbutton.textContent = "Siguiente";
            nextbutton.disabled = false;
        }
    }
}

//next button de la parte learn
function NextButton() {
    //tomando el kana actual, buscarlo en el array y cambiar al siguiente si es posible
    let kanaelement = document.querySelector(".learnkana");

    //si existe el kana construir la siguiente carta
    if (kanaelement != null) {
        let kana = kanaelement.textContent;

        let index = currentSet.indexOf(kana);

        let indexplusone = index + 1;
        let nextkana = currentSet[indexplusone];

        if (indexplusone >= currentSet.length) {
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
            if (nextindex >= currentSet.length) {
                let nextbutton = document.querySelector(".nextbtn");
                nextbutton.textContent = "Quiz! ->";
                nextbutton.classList.add("quiz");
                nextbutton.disabled = true;
                setTimeout(function () {
                    nextbutton.disabled = false;
                }, 500);
            }
        }

        //Check for prev button disable
        let prevbutton = document.querySelector(".prevbtn");

        if (indexplusone > 0 && prevbutton != null) {
            prevbutton.disabled = false;
        }
    } else {
        //si no, construir el kana card desde 0
        let cardParent = document.querySelector(".learncard");

        CreateLearnCard(cardParent);
    }
}

function BuildQuiz() {
    let app = CleanAppPage();
    PopulateInstructions(instrucciones.kanaquiz);

    let quizDiv = CreateAndClass("div", app, ["quizdiv"]);

    //randomize kana set
    let base = getObjKey(allkana, currentSet);

    currentSet = shuffleArray(currentSet);

    //build kana
    let kanaQuizPrompt = CreateAndClass("div", quizDiv, ["quizprompt"]);
    let kanaQuizPromptText = CreateSimple("p", kanaQuizPrompt);
    kanaQuizPromptText.classList.add("fade");
    kanaQuizPromptText.classList.add("quizprompttext");
    kanaQuizPromptText.textContent = currentSet[0];

    CreateAndClass("div", quizDiv, ["spacer"]);

    let answerButtons = CreateAndClass("div", quizDiv, ["quizbuttonsdiv"]);
    //build answer button array
    let answerButtonsArray = [];
    //first the answer button.
    let answerButton = document.createElement("button");
    answerButton.classList.add("correctquizanswerbtn");
    let correctAnswer = kanaAnswers[currentSet[0]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener("click", AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement("button");
    firstWrongAnswer.classList.add("incorrectquizanswerbtn");

    let randomKana = GetRandomKanaFromBaseThatsNot(base, [currentSet[0]]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement("button");
    secondWrongAnswer.classList.add("incorrectquizanswerbtn");
    //randomKanaBase = GetRandomThatIsNot(currentSet, nots = [currentSet[0], randomKanaBase]);
    randomKana = GetRandomKanaFromBaseThatsNot(base, [
        currentSet[0],
        randomKana,
    ]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, answerButtons);
}

function GoToNextQuiz() {
    //get kana display
    let kanatext = document.querySelector(".quizprompt p");
    let kanaindisplay = kanatext.textContent;
    //see if can get next kana
    let currentindex = currentSet.indexOf(kanaindisplay);
    let nextindex = currentindex + 1;
    if (nextindex >= currentSet.length) {
        //aqui deberia reemplazar los botones
        ShowAgainNextButtons();
    } else {
        //change display kana
        //kanatext.textContent = currentSet[nextindex];
        toggleTransitionWithTimeout(kanatext, currentSet[nextindex]);

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
    let correctAnswer = kanaAnswers[currentSet[currentindex]];
    answerButton.textContent = correctAnswer;
    answerButton.addEventListener("click", AnswerQuiz);
    answerButtonsArray.push(answerButton);

    let firstWrongAnswer = document.createElement("button");
    firstWrongAnswer.classList.add("incorrectquizanswerbtn");
    //let randomKanaBase= GetRandomThatIsNot(currentSet, nots = [currentSet[currentindex]]);
    let base = getObjKey(allkana, currentSet);

    let randomKana = GetRandomKanaFromBaseThatsNot(base, [
        currentSet[currentindex],
    ]);
    firstWrongAnswer.textContent = kanaAnswers[randomKana];
    firstWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(firstWrongAnswer);

    let secondWrongAnswer = document.createElement("button");
    secondWrongAnswer.classList.add("incorrectquizanswerbtn");
    //randomKanaBase = GetRandomThatIsNot(currentSet, nots = [currentSet[currentindex], randomKanaBase]);
    randomKana = GetRandomKanaFromBaseThatsNot(base, [
        currentSet[currentindex],
        randomKana,
    ]);
    secondWrongAnswer.textContent = kanaAnswers[randomKana];
    secondWrongAnswer.addEventListener("click", FailQuiz);
    answerButtonsArray.push(secondWrongAnswer);

    AppendQuizButtons(answerButtonsArray, parent);
}

function AnswerQuiz(event) {
    event.target.classList.add("correctquiz");
    event.target.disabled = true;

    setTimeout(GoToNextQuiz, 850);
}

function FailQuiz(event) {
    event.preventDefault();
    event.target.classList.add("incorrectquiz");
    //event.target.disabled = true;
    //event.target.focus();
    event.target.removeEventListener("click", FailQuiz);
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

function ShowAgainNextButtons() {
    let buttonsdiv = document.querySelector(".quizbuttonsdiv");
    buttonsdiv.innerHTML = "";

    let againbutton = CreateAndClass("button", buttonsdiv, ["againbtn"]);
    againbutton.textContent = "Una vez mas";
    againbutton.addEventListener("click", OnAgainButtonPress);

    let currentIndex = learnSets.indexOf(currentSet);
    let nextindex = currentIndex + 1;
    if (nextindex >= learnSets.length) {
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

//pregunta denuevo el set de kanas actual
function TakeQuizAgain() {
    BuildQuiz();
}

function OnTakeNextButtonPress(event) {
    event.target.disabled = true;
    setTimeout(TakeNextQuizSet, 300);
}

//cambia al siguiente set de kana y arma la pagina
function TakeNextQuizSet() {
    let currentIndex = learnSets.indexOf(currentSet);
    let nextindex = currentIndex + 1;

    currentSet = learnSets[nextindex];
    StartLearning();
}

function OnExitButtonPress() {
    setTimeout(ReloadPage, 250);
}

//Sale a la pagina principal
function ExitQuiz() {
    location.reload();
}

function PopulateLearnSet(arr) {
    let learnArray = [];
    arr.forEach((element) => {
        let kana = element.getAttribute("for");
        learnArray.push(allkana[kana]);
    });

    return learnArray;
}

// ---------------------- FUNCTIONS ----------------------  //
//esto deberia simplemente hacer toggle a la clase 'check'
function ToggleClass(element, clase) {
    element.classList.toggle(clase);

    //FIX check si los aprete todos y prender el label de all tambien
}

//construye pagina de practica basada en seleccion
function CheckPracticeSelected() {
    //get all labels
    let buttons = document.querySelectorAll("div.checkboxes > div > label");

    //hacer un array con todos los 'check'
    let checked = [];

    buttons.forEach((button) => {
        if (button.classList.contains("check")) {
            checked.push(button);
        }
    });

    if (checked.length < 1) {
        alert("Por favor selecciona cuales Kanas quieres practicar.");
        return;
    }

    //construir con lo seleccionado
    BuildPracticePage(checked);
}

//dumb but works
function WaitForMouseUp() {
    window.removeEventListener("mouseup", WaitForMouseUp);
    window.addEventListener("click", CheckClick);
}

//check if clicked outside input in practice page
function CheckClick(event) {
    if (event.target.localName != "input" && event.target.localName != "form") {
        let card = document.querySelector(".focus-card");
        if (card != null) card.classList.remove("focus-card");
    }
}

function AddMissClickListener() {
    window.addEventListener("click", CheckClick);
}

//construye la pagina de practica, basado en los kanas seleccionados
function BuildPracticePage(selected) {
    //scroll to top
    window.scrollTo(0, 0);

    failCounter = 0;

    window.addEventListener("PageBuilt", AddMissClickListener);

    state.currentPage = "practice";
    window.history.pushState(state, null, "");

    //clean page
    let app = document.getElementById("app");
    app.innerHTML = "";

    //populate instruccions
    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = instrucciones.kanatable;

    //HACER UN ARRAY de kana base desde selected
    let kanasBase = [];

    selected.forEach((label) => {
        let kanaBase = label.getAttribute("for");
        kanasBase.push(kanaBase);
    });

    //Hacer un array de todos los kanas necesarios ocupando los kana base
    let kanas = [];
    kanasBase.forEach((basekana) => {
        let base = allkana[basekana];
        base.forEach((kana) => {
            kanas.push(kana);
        });
    });

    //randomizar los kana
    let randomkanas = shuffleArray(kanas);
    //mandar a construir tarjetas con el array
    let elements = BuildCards(randomkanas);
    //agregar cada elemento al div correcto
    let practiceDiv = CreateAndClass("div", app, ["practiceDiv"]);

    elements.forEach((element) => {
        practiceDiv.appendChild(element);
    });

    //select first card
    let firstInput = document.querySelector("input");
    firstInput.focus();
    firstInput.parentElement.parentElement.classList.add("focus-card");

    CreateAndClass("div", app, ["spacer"]);
    //crear div para botones de again and exit
    let buttonsDiv = CreateAndClass("div", app, ["practiceagainbuttons"]);

    let againButton = CreateAndClass("button", buttonsDiv, [
        "practiceagainbtn",
    ]);
    againButton.textContent = "Desde 0";
    againButton.addEventListener("click", () => BuildPracticePage(selected));

    let changeButton = CreateAndClass("button", buttonsDiv, [
        "practicechangebtn",
    ]);
    changeButton.textContent = "Cambiar Kanas";
    changeButton.addEventListener("click", BuildPracticeSetupPage);

    window.addEventListener("mouseup", WaitForMouseUp);
}

function BuildCards(kanas) {
    let cardElements = [];

    kanas.forEach((kana) => {
        let newcard = BuildKanaCard(kana);
        cardElements.push(newcard);
    });

    return cardElements;
}

function BuildKanaCard(kana) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("data-answer", kanaAnswers[kana]);
    let question = document.createElement("div");
    cardDiv.appendChild(question);
    question.classList.add("question");
    let span = document.createElement("span");
    span.classList.add("question-span");
    span.textContent = kana;
    question.appendChild(span);
    let form = document.createElement("form");
    cardDiv.appendChild(form);
    form.classList.add("form");
    let input = document.createElement("input");
    form.appendChild(input);
    form.addEventListener("submit", Submit);
    form.addEventListener("click", SelectInput);
    input.addEventListener("focus", checkFocus);
    input.type = "text";
    input.autocomplete = "off";
    input.size = 4;
    input.maxLength = 5;
    input.autocapitalize = "off";

    let tooltipText = document.createElement("span");
    tooltipText.classList.add("tooltiptext");

    let text = `Respuesta: '${kanaAnswers[kana]}'`;
    tooltipText.textContent = text;
    form.appendChild(tooltipText);

    return cardDiv;
}

function SelectInput(event) {
    event.currentTarget[0].focus();
}

function checkFocus(event) {
    let card = document.querySelector(".focus-card");
    if (card != null) card.classList.remove("focus-card");
    event.target.parentElement.parentElement.classList.add("focus-card");
    failCounter = 0;
}

function shuffleArray(arr) {
    let currentIndex = arr.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex],
            arr[currentIndex],
        ];
    }

    return arr;
}

function FocusNext(event) {
    let inputs = Array.from(document.querySelectorAll("input"));
    let currentindex = inputs.indexOf(event.target[0]);

    let indexToCheck = LoopingIncrement(currentindex, inputs.length);

    //check todos los inputs hasta encontrar uno libre
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[indexToCheck].disabled) {
            inputs[indexToCheck].focus();
            return;
        } else {
            indexToCheck = LoopingIncrement(indexToCheck, inputs.length);
        }
    }

    document.querySelector(".practiceagainbtn").focus();
}

function LoopingIncrement(index, length) {
    let newindex = 0;

    if (index + 1 > length - 1) {
        newindex = 0;
    } else {
        newindex = index + 1;
    }

    return newindex;
}

function getObjKey(obj, value) {
    return Object.keys(obj).find((key) => obj[key] === value);
}

function GetRandomKana() {
    const keys = Object.keys(allkana);

    return keys[Math.floor(Math.random() * keys.length)];
}

function GetRandomKanaFromBaseThatsNot(base, nots) {
    let arr = allkana[base];

    let random;

    do {
        random = arr[Math.floor(Math.random() * arr.length)];
    } while (IsEqual(nots, random));

    return random;

    // arr = shuffleArray(arr);
    // return arr[0];
}

function GetRandomThatIsNot(array, nots) {
    // let keys = Object.keys(object);
    array = shuffleArray(array);
    let random;

    do {
        random = array[Math.floor(Math.random() * array.length)];
    } while (IsEqual(nots, random));

    return random;
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

function AppendQuizButtons(arr, parent) {
    arr = shuffleArray(arr);

    arr.forEach((element) => {
        parent.appendChild(element);
    });
}

function OnTitleClick() {
    state.currentPage = "home";
    window.history.pushState(state, null, "");

    location.reload();
}
