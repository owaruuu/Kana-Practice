/**
 * Creates the buttons to configure which elements to learn/study
 * @param {HTMLElement} parentDiv
 */
export function CreateSetupButtons(parentDiv) {
    CreateBaseKanaButtons(parentDiv);
    CreateDakutenButtons(parentDiv);
    CreateCombinationButtons(parentDiv);
}

function CreateBaseKanaButtons(parentDiv) {
    let firstDiv = CreateSimple("div", parentDiv);

    //Boton Todos Kana Base
    const botonAllKanaBase = CreateGroupConfigButton(
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
        botonAllKanaBase,
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
        botonAllKanaBase,
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
    botonAllKanaBase.addEventListener(groupButtonChangeEventName, () =>
        CheckGroupButtonStatus(
            botonAllKanaBase,
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
