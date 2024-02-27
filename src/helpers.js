export { CreateSimple, CreateAndClass, CreateAndId };

function CreateSimple(component, parent) {
    let newComponent = document.createElement(component);
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
