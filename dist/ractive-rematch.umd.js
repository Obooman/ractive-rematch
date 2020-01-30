(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ractiveRematch = {}));
}(this, (function (exports) { 'use strict';

  var store = null;
  var freezeObjectField = function (obj, property) {
      Object.defineProperty(obj, property, {
          configurable: false,
          writable: false
      });
  };
  var connectInstance = function (mapStateToData, mapDispatchToMethods) {
      if (mapStateToData === void 0) { mapStateToData = function () { return ({}); }; }
      return function (ractiveInstance) {
          var initialState = mapStateToData(store.getState());
          ractiveInstance.set(initialState);
          ractiveInstance["dispatch"] = store.dispatch;
          freezeObjectField(ractiveInstance, "dispatch");
          if (mapDispatchToMethods && typeof mapDispatchToMethods === "function") {
              var methods_1 = mapDispatchToMethods(store.dispatch);
              Object.keys(methods_1).forEach(function (method) {
                  ractiveInstance[method] = methods_1[method];
              });
          }
          store.subscribe(function () {
              var data = mapStateToData(store.getState());
              ractiveInstance.set(data);
          });
      };
  };
  var connet = function (mapStateToData, mapDispatchToMethods) {
      if (mapStateToData === void 0) { mapStateToData = function () { return ({}); }; }
      return function (ractiveClass) { return function (args) {
          var newInstance = new ractiveClass(args);
          connectInstance(mapStateToData, mapDispatchToMethods)(newInstance);
          return newInstance;
      }; };
  };
  var bindStore = function (reduxStore) {
      store = reduxStore;
  };

  exports.bindStore = bindStore;
  exports.connectInstance = connectInstance;
  exports.connet = connet;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
