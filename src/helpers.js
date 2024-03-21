import { Render } from "./render.js";

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
    let app = document.getElementById("app");
    app.innerHTML = "";

    return app;
}

export function PopulateInstructions(content) {
    let instContent = document.getElementById("instruccionescontent");
    instContent.textContent = content;
}
