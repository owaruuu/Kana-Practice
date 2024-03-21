import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
    CreateUiButton,
    CreateSetupButtons,
} from "./domHelpers.js";

export function CreateAllLabelInput(parent, id, text) {
    //crea los label en el menu de setup
    let label = CreateAndClass("label", parent, ["select-box"]);
    //label.setAttribute('id', id);
    let input = CreateAndId("input", label, id);
    input.classList.add("setup-input");
    label.setAttribute("for", id);
    let node = document.createTextNode(text);
    label.appendChild(node);
    input.setAttribute("type", "checkbox");
    input.addEventListener("click", ClickAllInput);

    return input;
}

export function CreateGroupLabelInput(parent, id, text) {
    //crea los label en el menu de setup
    let label = CreateAndClass("label", parent, ["select-box"]);

    //label.setAttribute('id', id);
    let input = CreateAndId("input", label, id);
    input.classList.add("setup-input");
    label.setAttribute("for", id);
    let node = document.createTextNode(text);
    label.appendChild(node);
    input.setAttribute("type", "checkbox");
    input.addEventListener("click", ClickGroupInput);

    return input;
}

function ClickAllInput(event) {
    let element = event.target.parentElement;
    element.classList.toggle("check");

    let base = event.target.parentElement.getAttribute("for");
    let object = BaseToObject(base);
    let labels = GetAllLabels(object);

    let otherbuttonsattribute = BaseToGroupLabel(base);

    if (element.classList.contains("check")) {
        TurnAllOn(labels);
        TurnBothButtons(otherbuttonsattribute, true);
    } else {
        TurnAllOff(labels);
        TurnBothButtons(otherbuttonsattribute, false);
    }
}

function TurnAllOn(group) {
    //por cada label en el grupo
    group.forEach((element) => {
        if (!element.classList.contains("check")) {
            element.classList.add("check");
        }
    });
    //si no tiene la clase check, agregar clase check
}

function TurnAllOff(group) {
    //por cada label en el grupo
    group.forEach((element) => {
        if (element.classList.contains("check")) {
            element.classList.remove("check");
        }
    });
    //si no tiene la clase check, agregar clase check
}

function TurnBothButtons(buttonsattribute, onoff) {
    if (onoff) {
        buttonsattribute.forEach((attr) => {
            let button = document.querySelector(`[for=${attr}]`);
            button.classList.add("check");
        });
    } else {
        buttonsattribute.forEach((attr) => {
            let button = document.querySelector(`[for=${attr}]`);
            button.classList.remove("check");
        });
    }
}

function BaseToObject(base) {
    switch (base) {
        case "all-base":
            return allmainbase;
        case "all-dakuten":
            return alldakuten;
        case "all-comb":
            return allcomb;
        case "all-hiragana-base":
            return mainkanasets;
        case "all-hiragana-dakuten":
            return dakutenkanasets;
        case "all-hiragana-comb":
            return combkanasets;
        case "all-katakana-base":
            return mainkatakanasets;
        case "all-katakana-dakuten":
            return dakutenkatakanasets;
        case "all-katakana-comb":
            return combkatakanasets;
        case "all-extra":
            return extrasets;
    }
}

function GetAllLabels(kanaset) {
    let labels = [];

    Object.keys(kanaset).forEach((key) => {
        let label = document.querySelector(`#${key}`);
        labels.push(label.parentElement);
    });

    return labels;
}

function GetAllLabelsFromBase(element) {
    let base = element.getAttribute("for");
    let object = BaseToObject(base);
    let labels = GetAllLabels(object);

    return labels;
}
