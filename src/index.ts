import {
  FreezeObjectFunc,
  ConnectInstanceFunc,
  ConnectFunc,
  BindStoreFunc
} from "../typing";

let store: any = null;

const freezeObjectField: FreezeObjectFunc = (obj, property) => {
  Object.defineProperty(obj, property, {
    configurable: false,
    writable: false
  });
};

export const connectInstance: ConnectInstanceFunc = (
  mapStateToData = () => ({}),
  ...args
) => ractiveInstance => {
  let mapDispatchToMethods;
  if (typeof mapStateToData !== "function") {
    mapStateToData = () => {};
  }

  const initialState = mapStateToData(store.getState());

  if (
    initialState &&
    typeof initialState === "object" &&
    !(initialState instanceof Array)
  ) {
    ractiveInstance.set(initialState);
  }

  if (args.length > 0) {
    ractiveInstance["dispatch"] = store.dispatch;
    freezeObjectField(ractiveInstance, "dispatch");
    mapDispatchToMethods = args[0];
  }

  if (mapDispatchToMethods && typeof mapDispatchToMethods === "function") {
    const methods = mapDispatchToMethods(store.dispatch);

    if (methods && typeof methods === "object" && !(methods instanceof Array)) {
      Object.keys(methods).forEach(method => {
        ractiveInstance[method] = methods[method];
      });
    }
  }

  store.subscribe(function() {
    const data = mapStateToData(store.getState());

    ractiveInstance.set(data);
  });

  return ractiveInstance;
};

export const connect: ConnectFunc = (
  mapStateToData = () => ({}),
  mapDispatchToMethods
) => ractiveClass => (...args) => {
  const newInstance = new ractiveClass(...args);
  connectInstance(mapStateToData, mapDispatchToMethods)(newInstance);
  return newInstance;
};

export const bindStore: BindStoreFunc = reduxStore => {
  store = reduxStore;
};
