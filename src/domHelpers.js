//Deberian estar las funciones de creacion de DOM basicas

import { CreateAllLabelInput, CreateGroupLabelInput } from "./labelHelpers.js";

export { CreateSimple, CreateComplex, CreateAndClass, CreateAndId };

function CreateSimple(component, parent) {
    let newComponent = document.createElement(component);
    parent.appendChild(newComponent);

    return newComponent;
}

function CreateComplex(componentType, parent, id, classes, content) {
    let newComponent = document.createElement(componentType);

    if (classes.length > 0) {
        classes.forEach((clase) => {
            newComponent.classList.add(clase);
        });
    }

    if (id) {
        newComponent.setAttribute("id", id);
    }

    if (content) {
        newComponent.textContent = content;
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
