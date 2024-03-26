//Deberian estar las funciones de creacion de DOM basicas
/**
 * Creates a HTML element and parents it to another HTML element.
 * @param {String} componentType
 * @param {HTMLElement} parent
 * @returns {HTMLElement} the new component
 */
export function CreateSimple(componentType, parent) {
    let newComponent = document.createElement(componentType);
    parent.appendChild(newComponent);

    return newComponent;
}

/**
 * Creates a HTML element and parents it to another HTML element, add an id, adds classes, and changes the content
 * @param {String} componentType
 * @param {HTMLElement} parent
 * @param {String} id
 * @param {array<String>} classes
 * @param {String} content
 * @returns {HTMLElement} the new component
 */
export function CreateComplex(componentType, parent, id, classes, content) {
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

/**
 * Creates a HTML component and add classes to it.
 * @param {String} componentType The type of component to create
 * @param {Element} parent
 * @param {Array<String>} classes An array of strings to add as clasess
 * @returns {HTMLElement} the new component
 */
export function CreateAndClass(componentType, parent, classes) {
    let newComponent = CreateSimple(componentType, parent);
    classes.forEach((clase) => {
        newComponent.classList.add(clase);
    });

    return newComponent;
}

/**
 * Creates a HTML element and add an id to it.
 * @param {String} componentType
 * @param {HTMLElement} parent
 * @param {String} id
 * @returns {HTMLElement} the new element
 */
export function CreateAndId(componentType, parent, id) {
    let newComponent = CreateSimple(componentType, parent);
    newComponent.setAttribute("id", id);

    return newComponent;
}
