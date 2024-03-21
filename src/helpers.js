//En Helpers deberian estar todas las funciones que son ocupadas desde distintos lugares

import { Render } from "./render.js";
import {
    CreateAllLabelInput,
    CreateGroupLabelInput,
    CreateLabelInput,
} from "./labelHelpers.js";
import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
    CreateUiButton,
} from "./domHelpers.js";
import { sets } from "./sets.js";

//global state variables
export let state = {
    currentPage: "home",
};

export function SetWindowStateEvent() {
    window.onpopstate = function (event) {
        if (event.state) {
            state = event.state;
        }

        Render(state);
    };
}

export function CleanAppPage() {
    window.scrollTo(0, 0);
    let app = document.getElementById("app");
    app.innerHTML = "";

    return app;
}

export function PopulateInstructions(content) {
    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = content;
}

/**
 * Creates the buttons to configure which elemnts to learn/study
 * @param {*} parentDiv
 */
export function CreateSetupButtons(parentDiv) {
    let firstDiv = document.createElement("div");
    firstDiv.classList.add("firstDiv");
    parentDiv.appendChild(firstDiv);

    //creo boton all base
    let allbaseinput = CreateAllLabelInput(
        firstDiv,
        "all-base",
        "Todos Kana base"
    );
    allbaseinput.parentElement.classList.add("all-main");
    // document.addEventListener('onTurnOffBaseKana', TurnOffGroupButton);

    let maingroupbuttons = CreateAndClass("div", firstDiv, [
        "kanagroupbuttons",
    ]);

    //boton all base hiragana
    let btn = CreateGroupLabelInput(
        maingroupbuttons,
        "all-hiragana-base",
        "Todos Hiragana"
    );
    btn.parentElement.classList.add("all-hira");

    let maincheckboxes = document.createElement("div");
    maincheckboxes.classList.add("checkboxes");
    firstDiv.appendChild(maincheckboxes);

    let hiraganabase = CreateSimple("div", maincheckboxes);

    Object.keys(sets.mainkanasets).forEach((key) => {
        let array = sets.mainkanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(hiraganabase, key, text);
    });

    let katakanabase = CreateSimple("div", maincheckboxes);

    //boton all katakana
    btn = CreateGroupLabelInput(
        maingroupbuttons,
        "all-katakana-base",
        "Todos Katakana"
    );
    btn.parentElement.classList.add("all-kata");

    //botones katakana
    Object.keys(sets.mainkatakanasets).forEach((key) => {
        let array = sets.mainkatakanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(katakanabase, key, text);
    });

    let secondDiv = document.createElement("div");
    parentDiv.appendChild(secondDiv);

    let alldakuteninput = CreateAllLabelInput(
        secondDiv,
        "all-dakuten",
        "Todos Dakuten/Handakuten"
    );
    alldakuteninput.parentElement.classList.add("all-main");

    maingroupbuttons = CreateAndClass("div", secondDiv, ["kanagroupbuttons"]);

    //all dakuten hiragana
    btn = CreateGroupLabelInput(
        maingroupbuttons,
        "all-hiragana-dakuten",
        "Todos Hiragana"
    );
    btn.parentElement.classList.add("all-hira");

    let dakutencheckboxes = document.createElement("div");
    dakutencheckboxes.classList.add("checkboxes");
    secondDiv.appendChild(dakutencheckboxes);

    hiraganabase = CreateSimple("div", dakutencheckboxes);

    Object.keys(sets.dakutenkanasets).forEach((key) => {
        let array = sets.dakutenkanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(hiraganabase, key, text);
    });

    katakanabase = CreateSimple("div", dakutencheckboxes);

    //all dakuten katakana
    btn = CreateGroupLabelInput(
        maingroupbuttons,
        "all-katakana-dakuten",
        "Todos Katakana"
    );
    btn.parentElement.classList.add("all-kata");

    Object.keys(sets.dakutenkatakanasets).forEach((key) => {
        let array = sets.dakutenkatakanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(katakanabase, key, text);
    });

    //extra katakana
    let allextrainput = CreateAllLabelInput(
        secondDiv,
        "all-extra",
        "Todos Katakana Extra"
    );
    allextrainput.parentElement.classList.add("all-extra");

    let extracheckboxes = document.createElement("div");
    extracheckboxes.classList.add("checkboxes");
    extracheckboxes.classList.add("extra");
    secondDiv.appendChild(extracheckboxes);

    let extra = CreateSimple("div", extracheckboxes);

    Object.keys(sets.extrasets).forEach((key) => {
        let array = sets.extrasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(extra, key, text);
    });

    let thirdDiv = document.createElement("div");
    parentDiv.appendChild(thirdDiv);

    let allcombinput = CreateAllLabelInput(
        thirdDiv,
        "all-comb",
        "Todos Combinacion"
    );
    allcombinput.parentElement.classList.add("all-main");

    maingroupbuttons = CreateAndClass("div", thirdDiv, ["kanagroupbuttons"]);

    btn = CreateGroupLabelInput(
        maingroupbuttons,
        "all-hiragana-comb",
        "Todos Hiragana"
    );
    btn.parentElement.classList.add("all-hira");

    let combcheckboxes = document.createElement("div");
    combcheckboxes.classList.add("checkboxes");
    thirdDiv.appendChild(combcheckboxes);

    hiraganabase = CreateSimple("div", combcheckboxes);

    Object.keys(sets.combkanasets).forEach((key) => {
        let array = sets.combkanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(hiraganabase, key, text);
    });

    katakanabase = CreateSimple("div", combcheckboxes);

    //boton all katakana
    btn = CreateGroupLabelInput(
        maingroupbuttons,
        "all-katakana-comb",
        "Todos Katakana"
    );
    btn.parentElement.classList.add("all-kata");
    //botones katakana
    Object.keys(sets.combkatakanasets).forEach((key) => {
        let array = sets.combkatakanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(katakanabase, key, text);
    });
}

function JapaneseComaSeparatedArray(array) {
    return array.join("、");
}
