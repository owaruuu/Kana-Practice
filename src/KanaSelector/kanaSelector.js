import { CreateAndClass, CreateSimple } from "../domHelpers.js";
import {
    groupButtonChangeEventName,
    normalButtonClickEventName,
} from "../enums.js";
import { JapaneseComaSeparatedArray } from "../helpers.js";
import { sets } from "../sets.js";
import {
    CreateGroupConfigButton,
    CreateNormalConfigButton,
    GetAllChildrenButtons,
} from "./labelHelpers.js";

/**
 * Creates the buttons to configure which elements to learn/study
 * @param {HTMLElement} parentDiv
 */
export function CreateSetupButtons(parentDiv) {
    CreateBaseKanaButtons(parentDiv);
    CreateDakutenButtons(parentDiv);
    CreateCombinationButtons(parentDiv);
}

/**
 *
 * @param {HTMLElement} parentDiv
 */
function CreateBaseKanaButtons(parentDiv) {
    let firstDiv = CreateSimple("div", parentDiv);

    //Boton Todos Kana Base
    const allKanaButton = CreateGroupConfigButton(
        firstDiv,
        null,
        "all-base",
        "all-main",
        "Todos Kana Base"
    );

    let mainGroupButtons = CreateAndClass("div", firstDiv, [
        "kanagroupbuttons",
    ]);

    //Boton Todos hiragana
    const allHiraganaButton = CreateGroupConfigButton(
        mainGroupButtons,
        allKanaButton,
        "all-hiragana-base",
        "all-hira",
        "Todos Hiragana"
    );

    let mainCheckBoxes = CreateAndClass("div", firstDiv, ["checkboxes"]);

    let hiraganaBase = CreateSimple("div", mainCheckBoxes);

    Object.keys(sets.mainkanasets).forEach((key) => {
        let array = structuredClone(sets.mainkanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(hiraganaBase, allHiraganaButton, key, text);
    });

    //boton todos katakana
    const allKatakanaButton = CreateGroupConfigButton(
        mainGroupButtons,
        allKanaButton,
        "all-katakana-base",
        "all-kata",
        "Todos Katakana"
    );

    let katakanaBase = CreateSimple("div", mainCheckBoxes);

    //botones katakana
    Object.keys(sets.mainkatakanasets).forEach((key) => {
        let array = structuredClone(sets.mainkatakanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(katakanaBase, allKatakanaButton, key, text);
    });

    //agregar listener a evento de cambio de ambos botones grupales
    allKanaButton.addEventListener(groupButtonChangeEventName, () =>
        CheckGroupButtonStatus(
            allKanaButton,
            allHiraganaButton,
            allKatakanaButton
        )
    );

    //agregar listener a evento de click de un boton normal
    allHiraganaButton.addEventListener(normalButtonClickEventName, () =>
        CheckNormalButtonStatus(allHiraganaButton)
    );

    allKatakanaButton.addEventListener(normalButtonClickEventName, () =>
        CheckNormalButtonStatus(allKatakanaButton)
    );
}

function CreateDakutenButtons(parentDiv) {
    let secondDiv = CreateSimple("div", parentDiv);

    const allKanaButton = CreateGroupConfigButton(
        secondDiv,
        null,
        "all-dakuten",
        "all-main",
        "Todos Dakuten/Handakuten"
    );

    let mainGroupButtons = CreateAndClass("div", secondDiv, [
        "kanagroupbuttons",
    ]);

    //all dakuten hiragana
    const allHiraganaButton = CreateGroupConfigButton(
        mainGroupButtons,
        allKanaButton,
        "all-hiragana-dakuten",
        "all-hira",
        "Todos Hiragana"
    );

    let dakutenCheckBoxes = CreateAndClass("div", secondDiv, ["checkboxes"]);

    let hiraganaBase = CreateSimple("div", dakutenCheckBoxes);

    Object.keys(sets.dakutenkanasets).forEach((key) => {
        let array = structuredClone(sets.dakutenkanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(hiraganaBase, allHiraganaButton, key, text);
    });

    let katakanaBase = CreateSimple("div", dakutenCheckBoxes);

    //all dakuten katakana
    const allKatakanaButton = CreateGroupConfigButton(
        mainGroupButtons,
        allKanaButton,
        "all-katakana-dakuten",
        "all-kata",
        "Todos Katakana"
    );

    Object.keys(sets.dakutenkatakanasets).forEach((key) => {
        let array = structuredClone(sets.dakutenkatakanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(katakanaBase, allKatakanaButton, key, text);
    });

    //extra katakana
    const allExtraKatakana = CreateGroupConfigButton(
        secondDiv,
        null,
        "all-extra",
        "all-extra",
        "Todos Katakana Extra"
    );

    let extraCheckBoxes = CreateAndClass("div", secondDiv, [
        "checkboxes",
        "extra",
    ]);

    let extra = CreateSimple("div", extraCheckBoxes);

    Object.keys(sets.extrasets).forEach((key) => {
        let array = sets.extrasets[key];
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(extra, allExtraKatakana, key, text);
    });
}

function CreateCombinationButtons(parentDiv) {
    let thirdDiv = CreateSimple("div", parentDiv);

    const allCombinationButton = CreateGroupConfigButton(
        thirdDiv,
        null,
        "all-comb",
        "all-main",
        "Todos Combinacion"
    );

    let mainGroupButtons = CreateAndClass("div", thirdDiv, [
        "kanagroupbuttons",
    ]);

    const allHiraganaButton = CreateGroupConfigButton(
        mainGroupButtons,
        allCombinationButton,
        "all-hiragana-comb",
        "all-hira",
        "Todos Hiragana"
    );

    let combCheckBoxes = CreateAndClass("div", thirdDiv, ["checkboxes"]);

    let hiraganaBase = CreateSimple("div", combCheckBoxes);

    Object.keys(sets.combkanasets).forEach((key) => {
        let array = structuredClone(sets.combkanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(hiraganaBase, allHiraganaButton, key, text);
    });

    let katakanaBase = CreateSimple("div", combCheckBoxes);

    //boton all katakana
    const allKatakanaButton = CreateGroupConfigButton(
        mainGroupButtons,
        allCombinationButton,
        "all-katakana-comb",
        "all-kata",
        "Todos Katakana"
    );

    //botones katakana
    Object.keys(sets.combkatakanasets).forEach((key) => {
        let array = structuredClone(sets.combkatakanasets[key]);
        let text = JapaneseComaSeparatedArray(array);
        CreateNormalConfigButton(katakanaBase, allKatakanaButton, key, text);
    });
}

/**
 * Recibe el evento de cambio de un boton de grupo
 * @param {HTMLElement} parentButton
 * @param {HTMLElement} firstGroupButton
 * @param {HTMLElement} secondGroupButton
 * @returns {void}
 */
function CheckGroupButtonStatus(
    parentButton,
    firstGroupButton,
    secondGroupButton
) {
    if (
        firstGroupButton.classList.contains("check") &&
        secondGroupButton.classList.contains("check")
    ) {
        parentButton.classList.add("check");
    } else {
        parentButton.classList.remove("check");
    }
}

/**
 *
 * @param {HTMLElement} parentButton
 */
function CheckNormalButtonStatus(parentButton) {
    let base = parentButton.getAttribute("for");
    let labels = GetAllChildrenButtons(base);

    if (
        labels.every((label) => {
            return label.classList.contains("check");
        })
    ) {
        parentButton.classList.add("check");
        parentButton.children[0].dispatchEvent(new Event("change"));
    } else {
        parentButton.classList.remove("check");
        parentButton.children[0].dispatchEvent(new Event("change"));
    }
}
