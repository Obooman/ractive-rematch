(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ractiveRematch = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

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
    var connect = function (mapStateToData, mapDispatchToMethods) {
        if (mapStateToData === void 0) { mapStateToData = function () { return ({}); }; }
        return function (ractiveClass) { return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var newInstance = new (ractiveClass.bind.apply(ractiveClass, __spreadArrays([void 0], args)))();
            connectInstance(mapStateToData, mapDispatchToMethods)(newInstance);
            return newInstance;
        }; };
    };
    var bindStore = function (reduxStore) {
        store = reduxStore;
    };

    exports.bindStore = bindStore;
    exports.connect = connect;
    exports.connectInstance = connectInstance;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
