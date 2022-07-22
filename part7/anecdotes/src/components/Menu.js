import { useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./About";
import AnecdoteList from "./AnecdoteList";
import NewForm from "./NewForm";

export default function Menu() {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
  const padding = {
    padding: 5,
  };
  return (
    <div>
      {" "}
      <Router>
        <div>
          <Link style={padding} to="/anecdotes">
            anecdotes
          </Link>
          <Link style={padding} to="/create">
            create new
          </Link>
          <Link style={padding} to="/about">
            about
          </Link>
        </div>
        <Routes>
          <Route
            path="/anecdotes"
            element={<AnecdoteList anecdotes={anecdotes} />}
          />
          <Route path="/create" element={<NewForm addNew={addNew} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}
