import { ContextHelper, Ractive } from "ractive/typings/ractive";
import {
  RematchStore,
  RematchRootState
} from "@rematch/core/src/typings/index";

export type MapFunc = (state: any) => any;

export type FreezeObjectFunc = (obj: any, property: string) => void;

export type ConnectInstanceFunc = (
  mapStateToData: MapFunc,
  mapDispatchToMethods: MapFunc
) => (ractiveInstance: ContextHelper) => void;

export type ConnectFunc = (
  mapStateToData: MapFunc,
  mapDispatchToMethods: MapFunc
) => (ractiveClass: any) => (args: any) => ContextHelper;

export type BindStoreFunc = (reduxStore: RematchStore) => void;
