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

const instance = new Ractive({
  el:applicationContainerDOMElement,
  template:`<span>{variable}</span>`,
  data:{
    variable:12
  }
})

const Component = Ractive.extend({
  data:{
    variable:13
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
 * the dispatch function will be attached to instance. 
 */
export const connectedInstance = connectInstance(mapStateToData,mapDispatchToMethod)(instance)

// Connect state to a subclass instead of instance please use `connect`
export const connectedComponent = connect(mapStateToData,mapDispatchToMethod)(Component)
```
