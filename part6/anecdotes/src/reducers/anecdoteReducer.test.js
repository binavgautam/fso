import anecdoteReducer from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("NEW_ANECDOTE", () => {
    const state = [];
    const action = {
      type: "anecdotes/createAnecdote",
      payload: "anecdote",
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState.map((s) => s.anecdote)).toContainEqual(action.payload);
  });

  test("VOTE", () => {
    const state = [
      {
        anecdote: "anecdote1",
        votes: 0,
        id: 1,
      },
      {
        anecdote: "anecdote2",
        votes: 0,
        id: 2,
      },
    ];

    const action = {
      type: "anecdotes/vote",
      payload: 2,
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(2);

    expect(newState).toContainEqual(state[0]);

    expect(newState).toContainEqual({
      anecdote: "anecdote2",
      votes: 1,
      id: 2,
    });
  });
});
