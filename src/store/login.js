import { Store } from "laco";

export const RevitStore = new Store(
  {
    loginusers: {}
  },
  "RevitStore"
);

export const addLoginUser = text =>
  RevitStore.set(text => ({ loginusers: text }));

export const deleteLoginUser = () => RevitStore.set(() => ({ loginusers: {} }));
