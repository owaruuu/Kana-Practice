export function BuildPracticePage(selected) {
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
