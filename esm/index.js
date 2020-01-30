var store = null;
var freezeObjectField = function (obj, property) {
    Object.defineProperty(obj, property, {
        configurable: false,
        writable: false
    });
};
var connectInstance = function (mapStateToData, mapDispatchToMethods) { return function (ractiveInstance) {
    var initialState = mapStateToData(store.getState());
    ractiveInstance.set(initialState);
    ractiveInstance["dispatch"] = store.dispatch;
    freezeObjectField(ractiveInstance, "dispatch");
    var methods = mapDispatchToMethods(store.dispatch);
    Object.keys(methods).forEach(function (method) {
        ractiveInstance[method] = methods[method];
    });
    store.subscribe(function () {
        var data = mapStateToData(store.getState());
        ractiveInstance.set(data);
    });
}; };
var connet = function (mapStateToData, mapDispatchToMethods) { return function (ractiveClass) { return function (args) {
    var newInstance = new ractiveClass(args);
    connectInstance(mapStateToData, mapDispatchToMethods)(newInstance);
    return newInstance;
}; }; };
var bindStore = function (reduxStore) {
    if (store) {
        throw new Error("Store has been binded");
    }
    store = reduxStore;
};

export { bindStore, connectInstance, connet };
