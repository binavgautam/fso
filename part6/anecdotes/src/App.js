import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer";
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdotesList from "./components/AnecdotesList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

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
