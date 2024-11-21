import { sets } from "./sets.js";

/**
 * @typedef {Object} State
 * @property {LearnSet[]} learnSets
 * @property {String[]} currentSet
 * @property {String} currentPage
 * @property {Number} failCounter
 */

/**
 * @typedef {String[]} LearnSet
 */

/**
 * @type {State}
 */
export let state = {
    learnSets: /**@type {LearnSet[]} */ [],
    currentSet: /**@type {String[]} */ [],
    currentPage: "home",
    failCounter: 0,
};

/**
 *
 * @param {State} newState
 * @returns
 */
export function setState(newState) {
    return (state = newState);
}

/**
 *
 * @param {HTMLElement[]} elementsArray
 * @returns {LearnSet[]}
 */
export function PopulateLearnSet(elementsArray) {
    let learnArray = [];
    elementsArray.forEach((element) => {
        let kana = element.getAttribute("for");
        learnArray.push(sets.allkana[kana]);
    });

    return learnArray;
}
