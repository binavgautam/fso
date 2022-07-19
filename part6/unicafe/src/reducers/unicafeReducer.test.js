import { createStore } from "@reduxjs/toolkit";
import deepFreeze from "deep-freeze";
import unicafeReducer from "./unicafeReducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = { good: 0, ok: 0, bad: 0 };
    const action = {
      type: "DO_NOTHING",
    };

    const newState = unicafeReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented twice", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = unicafeReducer(state, action);
    const newState2 = unicafeReducer(newState, action);
    expect(newState2).toEqual({
      good: 2,
      ok: 0,
      bad: 0,
    });
  });
});
