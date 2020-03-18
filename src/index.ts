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
  mapDispatchToMethods
) => ractiveInstance => {
  const initialState = mapStateToData(store.getState());

  ractiveInstance.set(initialState);

  ractiveInstance["dispatch"] = store.dispatch;
  freezeObjectField(ractiveInstance, "dispatch");

  if (mapDispatchToMethods && typeof mapDispatchToMethods === "function") {
    const methods = mapDispatchToMethods(store.dispatch);

    Object.keys(methods).forEach(method => {
      ractiveInstance[method] = methods[method];
    });
  }

  store.subscribe(function() {
    const data = mapStateToData(store.getState());

    ractiveInstance.set(data);
  });
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
