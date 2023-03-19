function createStore(reducer) {
    let state = reducer(undefined, { type: "@@INIT" });
    const listeners = [];
    return {
        dispatch: (action) => {
            if (!action?.type) {
                throw Error("Az actionnal nincs typeja")
            }
            state = reducer(state, action);
            console.log(listeners);
            listeners.forEach((listener) => {
                listener();
            });
        },
        subscribe: (listener) => {
            listeners.push(listener);
        },
        getState: () => state,
    };
}

const myRedux = {
    createStore,
};