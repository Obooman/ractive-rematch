import { init } from "@rematch/core";
import Ractive from "ractive";
import test from "./model";
import { connect, connectInstance, bindStore } from "../src/index";

Ractive.DEBUG = false;

describe("Init rematch value", function() {
  const store = init({ models: { test } });

  it("Store should init successfully", function() {
    const state = store.getState().test;
    expect(state.string).toBe(test.state.string);
  });

  it("Store should change successfully", function() {
    const nextStr = "nextStr";
    store.dispatch.test.updateStr(nextStr);
    const state = store.getState().test;
    expect(state.string).toBe(nextStr);
  });
});

describe("Instance Connection", function() {
  const store = init({ models: { test } });
  const element = document.createElement("div");
  bindStore(store);

  let instance = Ractive({
    el: element,
    template: "<div>{{string}}</div>"
  });

  const mapStateToData = function(state) {
    return {
      string: state.test.string
    };
  };
  instance = connectInstance(mapStateToData)(instance);

  it("should bind state to data", function() {
    var data = instance.get("string");
    expect(data).toBe(test.state.string);
  });

  it("should render successfully", function() {
    expect(element.children[0].innerHTML).toBe(test.state.string);
  });

  it("should update state to data", function() {
    const nextStr = "nextStr";
    store.dispatch.test.updateStr(nextStr);
    const state = store.getState().test;

    expect(state.string).toBe(nextStr);

    store.subscribe(function() {
      var data = instance.get("string");
      expect(data).toBe(nextStr);
      expect(element.children[0].innerHTML).toBe(nextStr);
    });
  });
});

describe("Class Connection", function() {
  const store = init({ models: { test } });
  bindStore(store);

  let Container = Ractive.extend({
    template: "<div>{{string}}</div>"
  });

  const mapStateToData = function(state) {
    return {
      string: state.test.string
    };
  };
  Container = connect(mapStateToData)(Container);

  it("should init successfully", function() {
    const element = document.createElement("div");
    var container = Container({ el: element });
    expect(container.get("string")).toBe(test.state.string);
  });

  it("should update successfully", function() {
    const nextStr = "nextStr";
    const element = document.createElement("div");
    var container = Container({ el: element });
    store.dispatch.test.updateStr(nextStr);
    expect(container.get("string")).toBe(nextStr);
  });

  it("should render right", function() {
    const nextStr = "nextStr";
    const element = document.createElement("div");
    var container = Container({ el: element });
    store.dispatch.test.updateStr(nextStr);
    expect(element.children[0].innerHTML).toBe(nextStr);
  });
});

describe("Connect Instance Passing Arguments", function() {
  const instance = () =>
    Ractive({
      el: document.createElement("div"),
      template: "<div>{{string}}</div>"
    });

  it("should ok with no arguments ", function() {
    connectInstance()(instance());
  });
  it("should ok with object as first arguments ", function() {
    connectInstance({})(instance());
    connectInstance([])(instance());
    connectInstance(new Date())(instance());
  });
  it("should ok with number as first arguments ", function() {
    connectInstance(0)(instance());
    connectInstance(-1)(instance());
    connectInstance(1)(instance());
    connectInstance(Infinity)(instance());
    connectInstance(-Infinity)(instance());
    connectInstance(Math.PI)(instance());
  });
  it("should ok with boolean as first arguments ", function() {
    connectInstance(false)(instance());
    connectInstance(true)(instance());
  });
  it("should ok with null as first arguments ", function() {
    connectInstance(null)(instance());
  });
  it("should ok with string as first arguments ", function() {
    connectInstance("")(instance());
    connectInstance("string")(instance());
  });
  it("should ok with function -> void as first arguments ", function() {
    connectInstance(function() {})(instance());
  });
  it("should ok with function -> string as first arguments ", function() {
    connectInstance(() => "")(instance());
  });
  it("should ok with function -> boolean as first arguments ", function() {
    connectInstance(() => true)(instance());
  });
  it("should ok with function -> null as first arguments ", function() {
    connectInstance(() => null)(instance());
  });
  it("should ok with function -> number as first arguments ", function() {
    connectInstance(() => 0)(instance());
    connectInstance(() => -1)(instance());
    connectInstance(() => 1)(instance());
    connectInstance(() => Infinity)(instance());
    connectInstance(() => -Infinity)(instance());
    connectInstance(() => Math.PI)(instance());
  });
  it("should ok with function -> array as first arguments ", function() {
    connectInstance(() => [])(instance());
  });
  it("should ok with null as second arguments ", function() {
    connectInstance(() => {}, null)(instance());
  });
  it("should ok with string as second arguments ", function() {
    connectInstance(() => {}, "")(instance());
  });
  it("should ok with number as second arguments ", function() {
    connectInstance(() => {}, 0)(instance());
    connectInstance(() => {}, 1)(instance());
    connectInstance(() => {}, -1)(instance());
    connectInstance(() => {}, Infinity)(instance());
    connectInstance(() => {}, -Infinity)(instance());
    connectInstance(() => {}, Math.PI)(instance());
  });
  it("should ok with boolean as second arguments ", function() {
    connectInstance(() => {}, true)(instance());
    connectInstance(() => {}, false)(instance());
  });
  it("should ok with object as second arguments ", function() {
    connectInstance(() => {}, {})(instance());
    connectInstance(() => {}, [])(instance());
    connectInstance(() => {}, new Date())(instance());
  });
  it("should ok with undefined as second arguments ", function() {
    const nextStr = "nextStr";
    connectInstance(() => {}, undefined)(instance());
  });
  it("should ok with function -> void as second arguments ", function() {
    connectInstance(
      () => {},
      () => {}
    )(instance());
  });
  it("should ok with function -> string as second arguments ", function() {
    connectInstance(
      () => {},
      () => "string"
    )(instance());
  });
  it("should ok with function -> boolean as second arguments ", function() {
    connectInstance(
      () => {},
      () => true
    )(instance());
    connectInstance(
      () => {},
      () => false
    )(instance());
  });
  it("should ok with function -> null as second arguments ", function() {
    connectInstance(
      () => {},
      () => null
    )(instance());
  });
  it("should ok with function -> number as second arguments ", function() {
    connectInstance(
      () => {},
      () => 0
    )(instance());
    connectInstance(
      () => {},
      () => 1
    )(instance());
    connectInstance(
      () => {},
      () => -1
    )(instance());
    connectInstance(
      () => {},
      () => Infinity
    )(instance());
    connectInstance(
      () => {},
      () => -Infinity
    )(instance());
    connectInstance(
      () => {},
      () => Math.PI
    )(instance());
  });
  it("should ok with function -> array as second arguments ", function() {
    connectInstance(
      () => {},
      () => []
    )(instance());
  });
  it("should ok with function -> empty object as second arguments ", function() {
    connectInstance(
      () => {},
      () => ({})
    )(instance());
  });
  it("should ok with function -> object as second arguments ", function() {
    const nextStr = "nextStr";
    connectInstance(
      () => {},
      () => ({
        someMethod: () => {}
      })
    )(instance());
  });

  it("should ok with function -> array as second arguments ", function() {
    connectInstance(
      () => {},
      () => []
    )(instance());
  });
});

describe("Class Connect Passing Arguments", function() {
  const createClass = () =>
    Ractive.extend({ template: "<div>{{string}}</div>" });

  it("class should ok with no arguments ", function() {
    connect()(createClass())();
  });
  it("class should ok with number as first arguments ", function() {
    connect(0)(createClass())();
    connect(1)(createClass())();
    connect(-1)(createClass())();
    connect(Infinity)(createClass())();
    connect(-Infinity)(createClass())();
    connect(Math.PI)(createClass())();
  });
  it("class should ok with string as first arguments ", function() {
    connect("")(createClass())();
  });
  it("class should ok with boolean as first arguments ", function() {
    connect(true)(createClass())();
    connect(false)(createClass())();
  });
  it("class should ok with null as first arguments ", function() {
    connect(null)(createClass())();
  });
  it("class should ok with object as first arguments ", function() {
    connect({})(createClass())();
  });
  it("class should ok with function -> void as first arguments ", function() {
    connect(() => {})(createClass())();
  });
  it("class should ok with function -> string as second arguments ", function() {
    connect(() => "")(createClass())();
  });
  it("class should ok with function -> boolean as second arguments ", function() {
    connect(() => true)(createClass())();
    connect(() => false)(createClass())();
  });
  it("class should ok with function -> null as second arguments ", function() {
    connect(() => null)(createClass())();
  });
  it("class should ok with function -> number as second arguments ", function() {
    connect(() => 0)(createClass())();
    connect(() => 1)(createClass())();
    connect(() => -1)(createClass())();
    connect(() => Infinity)(createClass())();
    connect(() => -Infinity)(createClass())();
    connect(() => Math.PI)(createClass())();
  });
  it("class should ok with no second arguments ", function() {
    connect(() => {})(createClass())();
  });
  it("class should ok with number as second arguments ", function() {
    connect(() => {}, 0)(createClass())();
    connect(() => {}, 1)(createClass())();
    connect(() => {}, -1)(createClass())();
    connect(() => {}, Infinity)(createClass())();
    connect(() => {}, -Infinity)(createClass())();
    connect(() => {}, Math.PI)(createClass())();
  });
  it("class should ok with string as second arguments ", function() {
    connect(() => {}, "")(createClass())();
  });
  it("class should ok with boolean as second arguments ", function() {
    connect(() => {}, true)(createClass())();
    connect(() => {}, false)(createClass())();
  });
  it("class should ok with object as second arguments ", function() {
    connect(() => {}, {})(createClass())();
  });
  it("class should ok with function -> void as second arguments ", function() {
    connect(
      () => {},
      () => {}
    )(createClass())();
  });
  it("class should ok with function -> number as second arguments ", function() {
    connect(
      () => {},
      () => 0
    )(createClass())();
    connect(
      () => {},
      () => 1
    )(createClass())();
    connect(
      () => {},
      () => -1
    )(createClass())();
    connect(
      () => {},
      () => Infinity
    )(createClass())();
    connect(
      () => {},
      () => -Infinity
    )(createClass())();
    connect(
      () => {},
      () => Math.PI
    )(createClass())();
  });
  it("class should ok with function -> string as second arguments ", function() {
    connect(
      () => {},
      () => ""
    )(createClass())();
  });
  it("class should ok with function -> array as second arguments ", function() {
    connect(
      () => {},
      () => []
    )(createClass())();
  });
  it("class should ok with function -> boolean as second arguments ", function() {
    connect(
      () => {},
      () => true
    )(createClass())();
    connect(
      () => {},
      () => false
    )(createClass())();
  });
  it("class should ok with function -> null as second arguments ", function() {
    connect(
      () => {},
      () => null
    )(createClass())();
  });
  it("class should ok with function -> empty object as second arguments ", function() {
    connect(
      () => {},
      () => ({})
    )(createClass())();
  });
  it("class should ok with function -> object as second arguments ", function() {
    connect(
      () => {},
      () => ({
        method: () => {}
      })
    )(createClass())();
  });
});
