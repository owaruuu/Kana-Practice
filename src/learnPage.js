export function BuildLearnPage() {
    //SCROLL to top
    window.scrollTo(0, 0);

    //Push history state
    state.currentPage = "learn";
    window.history.pushState(state, null, "");

    //Clean App
    let app = document.getElementById("app");
    app.innerHTML = "";

    //Populate instrucciones
    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = instrucciones.kanalearn;

    let spacer = CreateAndClass("div", app, ["spacer"]);

    let titleKana = CreateAndClass("div", app, ["titleKana"]);
    titleKana.textContent = JapaneseComaSeparatedArray(allkana[currentSet[0]]);

    spacer = CreateAndClass("div", app, ["spacer"]);

    //Armar divs
    let learnDiv = CreateAndClass("div", app, ["learndiv"]);
    let learnCard = CreateAndClass("div", learnDiv, ["learncard"]);

    let info = document.createElement("div");
    info.classList.add("info");

    spacer = CreateAndClass("div", learnDiv, ["spacer"]);
    spacer.appendChild(info);

    let explanationExist = CheckForExplanation(learnCard);

    spacer = CreateAndClass("div", learnDiv, ["spacer"]);

    let buttonsdiv = CreateAndClass("div", learnDiv, ["btn-div"]);

    let prevButton = CreateAndClass("button", buttonsdiv, ["prevbtn"]);
    prevButton.addEventListener("click", PreviousButton);
    prevButton.textContent = "Atras";
    prevButton.disabled = true;

    let nextButton = CreateAndClass("button", buttonsdiv, ["nextbtn"]);
    nextButton.addEventListener("click", NextButton);
    nextButton.textContent = "Siguiente";

    if (!explanationExist) info.textContent = KanaToInfo(currentSet[0]);
}
