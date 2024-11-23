import { sets } from "../data/sets.js";

/**
 * @typedef {String[]} KanaSet
 */

/**
 * @typedef {Object} State
 * @property {KanaSet[]} learnSets
 * @property {KanaSet[]} practiceSets
 * @property {String[]} currentSet
 * @property {String} currentPage
 * @property {Number} failCounter
 */

/**
 * @type {State}
 */
export let state = {
    learnSets: /**@type {KanaSet[]} */ [],
    currentSet: /**@type {String[]} */ [],
    practiceSets: /**@type {KanaSet[]} */ [],
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
 * @returns {KanaSet[]}
 */
export function GetKanaSets(elementsArray) {
    let kanaArray = [];
    elementsArray.forEach((element) => {
        let kana = element.getAttribute("for");
        kanaArray.push(sets.allkana[kana]);
    });

    return kanaArray;
}
