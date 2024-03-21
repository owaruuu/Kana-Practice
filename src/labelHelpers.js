import {
    CreateSimple,
    CreateComplex,
    CreateAndClass,
    CreateAndId,
    CreateUiButton,
} from "./domHelpers.js";

import { romajiConsonants } from "./romaji.js";
import { sets } from "./sets.js";

/**
 *
 * @param {Element} parent
 * @param {String} id
 * @param {String} text
 * @returns
 */
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

export function CreateLabelInput(parent, id, text) {
    let label = CreateAndClass("label", parent, ["select-box"]);
    let consonant = CreateAndClass("div", label, ["consonantLabel"]);
    consonant.textContent = romajiConsonants[id];

    let input = CreateAndId("input", label, id);
    input.classList.add("setup-input");
    label.setAttribute("for", id);

    let kanaLabel = CreateAndClass("div", label, ["kanaLabel"]);
    kanaLabel.textContent = text;

    input.setAttribute("type", "checkbox");
    input.addEventListener("change", () => {
        label.classList.toggle("check");
        // ToggleClass(label, "check");
    });

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

function ClickGroupInput(event) {
    let element = event.target.parentElement;
    element.classList.toggle("check");

    let labels = GetAllLabelsFromBase(element);

    if (element.classList.contains("check")) {
        TurnAllOn(labels);
    } else {
        TurnAllOff(labels);
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
            return sets.allmainbase;
        case "all-dakuten":
            return sets.alldakuten;
        case "all-comb":
            return sets.allcomb;
        case "all-hiragana-base":
            return sets.mainkanasets;
        case "all-hiragana-dakuten":
            return sets.dakutenkanasets;
        case "all-hiragana-comb":
            return sets.combkanasets;
        case "all-katakana-base":
            return sets.mainkatakanasets;
        case "all-katakana-dakuten":
            return sets.dakutenkatakanasets;
        case "all-katakana-comb":
            return sets.combkatakanasets;
        case "all-extra":
            return sets.extrasets;
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

function TurnOffGroupButton(base) {
    document.querySelector(`[for='${base}']`).classList.remove("check");
}

/**
 * Returns an array with the labels of the config buttons
 * @param {String} base
 * @returns {Array}
 */
function BaseToGroupLabel(base) {
    let groupLabel;
    switch (base) {
        case "all-base":
            groupLabel = ["all-hiragana-base", "all-katakana-base"];
            break;
        case "all-dakuten":
            groupLabel = ["all-hiragana-dakuten", "all-katakana-dakuten"];
            break;
        case "all-comb":
            groupLabel = ["all-hiragana-comb", "all-katakana-comb"];
            break;
        case "all-extra":
            groupLabel = ["all-extra"];
    }

    return groupLabel;
}
