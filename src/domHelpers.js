import { CreateAllLabelInput, CreateGroupLabelInput } from "./labelHelpers.js";

export { CreateSimple, CreateComplex, CreateAndClass, CreateAndId };

function CreateSimple(component, parent) {
    let newComponent = document.createElement(component);
    parent.appendChild(newComponent);

    return newComponent;
}

function CreateComplex(component, parent, id, classes) {
    let newComponent = document.createElement(component);

    if (classes.length > 0) {
        classes.forEach((clase) => {
            newComponent.classList.add(clase);
        });
    }

    if (id) {
        newComponent.setAttribute("id", id);
    }

    parent.appendChild(newComponent);

    return newComponent;
}

function CreateAndClass(component, parent, classes) {
    let newComponent = document.createElement(component);

    classes.forEach((clase) => {
        newComponent.classList.add(clase);
    });

    parent.appendChild(newComponent);

    return newComponent;
}

function CreateAndId(component, parent, id) {
    let newComponent = document.createElement(component);

    newComponent.setAttribute("id", id);

    parent.appendChild(newComponent);

    return newComponent;
}

export function CreateUiButton(parent, text) {
    let button = document.createElement("button");
    button.classList.add("uibtn");
    parent.appendChild(button);

    let buttonTop = document.createElement("span");
    buttonTop.textContent = text;
    buttonTop.classList.add("uibtn-top");
    button.appendChild(buttonTop);

    return button;
}

export function CreateSetupButtons(parentDiv) {
    let firstDiv = document.createElement("div");
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

    Object.keys(mainkanasets).forEach((key) => {
        let array = mainkanasets[key];
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
    Object.keys(mainkatakanasets).forEach((key) => {
        let array = mainkatakanasets[key];
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

    Object.keys(dakutenkanasets).forEach((key) => {
        let array = dakutenkanasets[key];
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

    Object.keys(dakutenkatakanasets).forEach((key) => {
        let array = dakutenkatakanasets[key];
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

    Object.keys(extrasets).forEach((key) => {
        let array = extrasets[key];
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

    Object.keys(combkanasets).forEach((key) => {
        let array = combkanasets[key];
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
    Object.keys(combkatakanasets).forEach((key) => {
        let array = combkatakanasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateLabelInput(katakanabase, key, text);
    });
}
