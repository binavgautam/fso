import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
    },
    deleteAnc(state, action) {
      return state.filter((s) => s.id !== action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteAnecdote = (id, anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes + 1 };
  return async (dispatch) => {
    const returnedAnecdote = await anecdoteService.vote(id, updated);
    dispatch(vote(returnedAnecdote));
  };
};

export const deleteAnecdote = (id) => {
  return async (dispatch) => {
    await anecdoteService.remove(id);
    dispatch(deleteAnc(id));
  };
};

export const { vote, appendAnecdote, setAnecdotes, deleteAnc } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
