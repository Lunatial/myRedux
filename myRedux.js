function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }

    let state = reducer(undefined, { type: "@@INIT" });
    const listeners = [];
    return {
        dispatch: (action) => {
            if (!action.type) {
                throw Error("Action doesen't have type")
            }
            state = reducer(state, action);
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

function applyMiddleware(middleware) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);
        return {
            ...store,
            dispatch: middleware({
                getState: store.getState,
                dispatch: store.dispatch,
            }),
        };
    };
}

function compose(...functions) {
    if (functions.length === 0) {
        return (arg) => arg;
    }

    return functions.reduce((a, b) => (arg) => a(b(arg)));
}

const myRedux = {
    applyMiddleware,
    createStore,
    compose,
};