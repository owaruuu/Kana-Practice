export let state = {
    learnSets: [],
    currentSet: [],
    currentPage: "home",
    failCounter: 0,
};

export function setState(newState) {
    return (state = newState);
}
