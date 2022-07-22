import React from "react";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

export default function Anecdotes() {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  );
}
