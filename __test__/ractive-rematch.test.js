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

describe("Instance connection", function() {
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

describe("class connection", function() {
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

describe("Passing arguments", function() {
  const createInstanceConfig = () => {
    const element = document.createElement("div");
    return {
      el: element,
      instance: Ractive({ template: "<div>{{string}}</div>" })
    };
  };

  it("should ok with no arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance()(instance);
  });
  it("should ok with object as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance({})(instance);
    connectInstance([])(instance);
    connectInstance(new Date())(instance);
  });
  it("should ok with number as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(0)(instance);
    connectInstance(-1)(instance);
    connectInstance(1)(instance);
    connectInstance(Infinity)(instance);
    connectInstance(-Infinity)(instance);
    connectInstance(Math.PI)(instance);
  });
  it("should ok with boolean as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(false)(instance);
    connectInstance(true)(instance);
  });
  it("should ok with null as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(null)(instance);
  });
  it("should ok with string as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance("")(instance);
    connectInstance("string")(instance);
  });
  it("should ok with function<void> as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(function() {})(instance);
  });
  it("should ok with function<string> as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => "")(instance);
  });
  it("should ok with function<boolean> as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => true)(instance);
  });
  it("should ok with function<null> as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => null)(instance);
  });
  it("should ok with function<number> as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => 0)(instance);
    connectInstance(() => -1)(instance);
    connectInstance(() => 1)(instance);
    connectInstance(() => Infinity)(instance);
    connectInstance(() => -Infinity)(instance);
    connectInstance(() => Math.PI)(instance);
  });
  it("should ok with function<array> as first arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => [])(instance);
  });
  it("should ok with null as second arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => {}, null)(instance);
  });
  it("should ok with string as second arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => {}, "")(instance);
  });
  it("should ok with boolean as second arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => {}, true)(instance);
    connectInstance(() => {}, false)(instance);
  });
  it("should ok with object as second arguments ", function() {
    const instance = Ractive(createInstanceConfig());
    connectInstance(() => {}, {})(instance);
    connectInstance(() => {}, [])(instance);
    connectInstance(() => {}, new Date())(instance);
  });
});

describe("class connect passing arguments", function() {
  const createClass = () =>
    Ractive.extend({ template: "<div>{{string}}</div>" });

  it("test", function() {
    expect(1).toBe(1);
  });

  it("class should ok with no arguments ", function() {
    const ractiveClass = createClass();
    connect()(ractiveClass);
    ractiveClass();
  });
  it("class should ok with function<void> as first arguments ", function() {
    const ractiveClass = createClass();
    connect(() => {})(ractiveClass);
    ractiveClass();
  });
  it("class should ok with function<string> as second arguments ", function() {
    const ractiveClass = createClass();
    connect(() => "")(ractiveClass);
    ractiveClass();
  });
  it("class should ok with function<boolean> as second arguments ", function() {
    const ractiveClass = createClass();
    connect(() => true)(ractiveClass);
    connect(() => false)(ractiveClass);
    ractiveClass();
  });
  it("class should ok with function<null> as second arguments ", function() {
    const ractiveClass = createClass();
    connect(() => null)(ractiveClass);
    ractiveClass();
  });
  it("class should ok with function<number> as second arguments ", function() {
    const ractiveClass = createClass();
    connect(() => 0)(ractiveClass);
    ractiveClass();
    connect(() => 1)(ractiveClass);
    ractiveClass();
    connect(() => -1)(ractiveClass);
    ractiveClass();
    connect(() => Infinity)(ractiveClass);
    ractiveClass();
    connect(() => -Infinity)(ractiveClass);
    ractiveClass();
    connect(() => Math.PI)(ractiveClass);
    ractiveClass();
  });
});
