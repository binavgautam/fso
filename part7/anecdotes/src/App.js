import { useState } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import About from "./components/About";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import Login from "./components/Login";
import NewForm from "./components/NewForm";
import Notification from "./components/Notification";

const App = () => {
  const [notification, setNotification] = useState("");
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
  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/", { replace: true });
    notif(`"${anecdote.content} added"`);
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

  const login = (user) => {
    setUser(user);
    navigate("/", { replace: true });
    notif("Logged In");
  };

  const match = useMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  const notif = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 1000);
  };

  return (
    <div>
      <h1>Software Anecdote</h1>
      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        {user && (
          <Link style={padding} to="/create">
            create new
          </Link>
        )}
        <Link style={padding} to="/about">
          about
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
        <div>{notification && <Notification message={notification} />}</div>
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/create" element={<NewForm addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </div>
  );
};

export default App;
