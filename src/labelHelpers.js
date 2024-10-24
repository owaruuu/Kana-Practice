import { CreateComplex, CreateAndClass } from "./domHelpers.js";
import { romajiConsonants } from "./romaji.js";
import { sets } from "./sets.js";

/**
 * Creates the base for a config label button
 * @param {HTMLElement} parent
 * @param {String} id
 * @param {Function} callback
 * @returns {HTMLElement} the new label element
 */
function CreateConfigButton(parent, id, callback) {
    let label = CreateAndClass("label", parent, ["select-box"]);
    label.setAttribute("for", id);

    let input = CreateComplex("input", label, id, ["setup-input"], null);
    input.setAttribute("type", "checkbox");
    input.addEventListener("click", callback);

    return label;
}

/**
 * Creates a config label button with a custom callback
 * @param {Element} parent
 * @param {String} id
 * @param {String} text
 */
export function CreateGroupConfigButton(parent, id, labelClass, text) {
    let label = CreateConfigButton(parent, id, ClickGroupInput);
    label.classList.add(labelClass);

    let node = document.createTextNode(text);
    label.appendChild(node);

    return label;
}

/**
 * Creates a normal config label button
 * @param {HTMLElement} parent
 * @param {String} id
 * @param {String} text
 */
export function CreateNormalConfigButton(parent, id, text, refs) {
    console.log("🚀 ~ CreateNormalConfigButton ~ refs:", refs);
    let label = CreateConfigButton(parent, id, () => {
        normalButtonChecker(label, refs);
        // label.classList.toggle("check");
    });

    //Create the div for the reference consonant
    let consonant = CreateAndClass("div", label, ["consonantLabel"]);
    consonant.textContent = romajiConsonants[id];

    //Create the div for the kana letters
    let kanaLabel = CreateAndClass("div", label, ["kanaLabel"]);
    kanaLabel.textContent = text;
}

function normalButtonChecker(label, refs) {
    console.log("🚀 ~ normalButtonChecker ~ refs:", refs);
    refs.forEach((ref) => {
        if (ref.classList.contains("check")) {
            ref.classList.remove("check");
        }
    });

    label.classList.toggle("check");
}

/**
 * Changes the label on of off along
 * with the corresponding group of labels
 * @param {PointerEvent} event
 */
function ClickGroupInput(event) {
    //selecciona el label y cambia su clase
    let label = event.target.parentElement;
    label.classList.toggle("check");

    //obtiene todos los labels del grupo
    let base = label.getAttribute("for");
    let object = BaseToObject(base);
    let labels = GetAllLabels(object);

    if (label.classList.contains("check")) {
        labels.forEach((element) => {
            element.classList.add("check");
        });
    } else {
        labels.forEach((element) => {
            element.classList.remove("check");
        });
    }
}

/**
 * Get the corresponding kana from a base
 * @param {String} base The value of 'for' attribute
 * @returns {{}} An object with all the kana to select
 */
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
        default:
            throw new Error("Wrong base");
    }
}

/**
 * Get all label elements
 * @param {*} kanaset
 * @returns {Array<Element>} An array with all the labels
 */
function GetAllLabels(kanaset) {
    let labels = [];

    Object.keys(kanaset).forEach((key) => {
        let input = document.querySelector(`#${key}`);
        labels.push(input.parentElement);
    });

    return labels;
}
