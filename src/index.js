import { SetWindowHistory, ChangeScreen } from "./helpers/helpers.js";
import { BuildHomePage } from "./homepage.js";

SetWindowHistory();

//Set Title Button
document.getElementById("title").addEventListener("click", OnTitleClick);

function OnTitleClick() {
    ChangeScreen("home");
}

BuildHomePage();

// //next button de la parte learn

// function toggleTransitionWithTimeout(element, text) {
//     element.classList.remove("fade");
//     setTimeout(() => {
//         requestAnimationFrame(() => {
//             element.textContent = text;
//             element.classList.add("fade");
//         });
//     }, 225);
// }

// //pregunta denuevo el set de kanas actual

// function OnTakeNextButtonPress(event) {
//     event.target.disabled = true;
//     setTimeout(TakeNextQuizSet, 300);
// }

// //cambia al siguiente set de kana y arma la pagina

// function OnExitButtonPress() {
//     setTimeout(ReloadPage, 250);
// }

// //Sale a la pagina principal
// function ExitQuiz() {
//     location.reload();
// }

// // ---------------------- FUNCTIONS ----------------------  //
// //esto deberia simplemente hacer toggle a la clase 'check'
// function ToggleClass(element, clase) {
//     element.classList.toggle(clase);

//     //FIX check si los aprete todos y prender el label de all tambien
// }

// //construye pagina de practica basada en seleccion
// function CheckPracticeSelected() {
//     //get all labels
//     let buttons = document.querySelectorAll("div.checkboxes > div > label");

//     //hacer un array con todos los 'check'
//     let checked = [];

//     buttons.forEach((button) => {
//         if (button.classList.contains("check")) {
//             checked.push(button);
//         }
//     });

//     if (checked.length < 1) {
//         alert("Por favor selecciona cuales Kanas quieres practicar.");
//         return;
//     }

//     //construir con lo seleccionado
//     BuildPracticePage(checked);
// }

// //construye la pagina de practica, basado en los kanas seleccionados
// function BuildPracticePage(selected) {
//     //scroll to top
//     window.scrollTo(0, 0);

//     failCounter = 0;

//     window.addEventListener("PageBuilt", AddMissClickListener);

//     state.currentPage = "practice";
//     window.history.pushState(state, null, "");

//     //clean page
//     let app = document.getElementById("app");
//     app.innerHTML = "";

//     //populate instruccions
//     let instContent = document.getElementById("instruccionescontent");
//     instContent.textContent = instrucciones.kanatable;

//     //HACER UN ARRAY de kana base desde selected
//     let kanasBase = [];

//     selected.forEach((label) => {
//         let kanaBase = label.getAttribute("for");
//         kanasBase.push(kanaBase);
//     });

//     //Hacer un array de todos los kanas necesarios ocupando los kana base
//     let kanas = [];
//     kanasBase.forEach((basekana) => {
//         let base = allkana[basekana];
//         base.forEach((kana) => {
//             kanas.push(kana);
//         });
//     });

//     //randomizar los kana
//     let randomkanas = shuffleArray(kanas);
//     //mandar a construir tarjetas con el array
//     let elements = BuildCards(randomkanas);
//     //agregar cada elemento al div correcto
//     let practiceDiv = CreateAndClass("div", app, ["practiceDiv"]);

//     elements.forEach((element) => {
//         practiceDiv.appendChild(element);
//     });

//     //select first card
//     let firstInput = document.querySelector("input");
//     firstInput.focus();
//     firstInput.parentElement.parentElement.classList.add("focus-card");

//     CreateAndClass("div", app, ["spacer"]);
//     //crear div para botones de again and exit
//     let buttonsDiv = CreateAndClass("div", app, ["practiceagainbuttons"]);

//     let againButton = CreateAndClass("button", buttonsDiv, [
//         "practiceagainbtn",
//     ]);
//     againButton.textContent = "Desde 0";
//     againButton.addEventListener("click", () => BuildPracticePage(selected));

//     let changeButton = CreateAndClass("button", buttonsDiv, [
//         "practicechangebtn",
//     ]);
//     changeButton.textContent = "Cambiar Kanas";
//     changeButton.addEventListener("click", BuildPracticeSetupPage);

//     window.addEventListener("mouseup", WaitForMouseUp);
// }

// function GetRandomKana() {
//     const keys = Object.keys(allkana);

//     return keys[Math.floor(Math.random() * keys.length)];
// }

// function GetRandomThatIsNot(array, nots) {
//     // let keys = Object.keys(object);
//     array = shuffleArray(array);
//     let random;

//     do {
//         random = array[Math.floor(Math.random() * array.length)];
//     } while (IsEqual(nots, random));

//     return random;
// }
