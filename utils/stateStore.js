import { atom, selector } from "recoil";
import { STATUS, PAGE } from "./constants";

export const timeState = atom({
  key: "time", // 必須唯一，不可有相同的key
  default: 0, // 預設值
});

export const actionState = atom({
  key: "action",
  default: STATUS.PAUSE,
});

const minState = atom({
  key: "minState",
  default: 0,
});

export const mState = selector({
  key: "min",
  get: ({ get }) => {
    return get(minState);
  },
  set: ({ set }, newValue) => {
    if (isNaN(newValue)) {
      set(minState, 0);
    } else {
      set(minState, newValue);
    }
  },
});

const secState = atom({
  key: "secState",
  default: 0,
});

export const sState = selector({
  key: "sec",
  get: ({ get }) => {
    return get(secState);
  },
  set: ({ set }, newValue) => {
    if (isNaN(newValue)) {
      set(secState, 0);
    } else {
      set(secState, newValue);
    }
  },
});

export const pageState = atom({
  key: "page",
  default: PAGE.TIMER,
});
