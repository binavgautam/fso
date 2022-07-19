import anecdoteReducer from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

describe("anecdoteReducer", () => {
  test("NEW_ANECDOTE", () => {
    const state = [];
    const action = {
      type: "NEW_ANECDOTE",
      data: {
        anecdote: "anecdote",
        votes: 0,
        id: 1,
      },
    };

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.data);
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
      type: "VOTE",
      data: {
        id: 2,
      },
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
