import React from "react";

export default function Anecdote({ anecdote }) {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>-by {anecdote.author}</p>
      <p>Votes: {anecdote.votes}</p>
      <h3>
        For more info see <p>{anecdote.info}</p>
      </h3>
    </div>
  );
}
