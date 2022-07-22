import React from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../reducers/anecdoteReducer";

export default function AnecdotesForm() {
  const dispatch = useDispatch();

  const notification = (message) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 1000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdotes.value;
    e.target.anecdotes.value = "";
    console.log(anecdote);
    dispatch(createAnecdote(anecdote));
    notification(`New blog added "${anecdote}"`);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input name="anecdotes" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}
