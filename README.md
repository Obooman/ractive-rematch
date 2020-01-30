# ractive-rematch
redux connector for ractivejs application, with rematch as redux api provider.


# Get Started

## Install dependencies
```bash
$ yarn add @rematch/core ractive-rematach
```

## Initialize store binding
```js
import Ractive from "ractive";
import { init } from "@rematch/core";
import { bindStore } from "ractive-rematch";
import models from "./models"

bindStore(init({models}));

const applicationContainerDOMElement = document.querySelector("#root");

const component = new Ractive({
  el:applicationContainerDOMElement,
  template:`<span>{variable}</span>`,
  data:{
    variable:12
  }
})

const mapStateToData = state => ({
  name: state.userInfo.name,
  age: state.userInfo.age
})

const mapDispatchToMethod = dispatch => ({
  changeName(name){
    dispatch.userInfo.changeName(name)
  }
})

/* 
 * Connect state to a subclass instead of instance please use `connect`
 * by passing second param bind the dispatch function to instance. 
 * (even passing an `null` object)
 * Use this.dispath as you like it
 */
connectInstance(mapStateToData,mapDispatchToMethod)(component)
```