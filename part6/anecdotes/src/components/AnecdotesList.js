import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, deleteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export default function AnecdotesList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes }) => anecdotes);
  const filter = useSelector(({ filter }) => filter);

  const notification = (message) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 1000);
  };

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id, anecdote));
    notification(`You voted for "${anecdote.content}"`);
  };

  const deleteVote = (id, anecdote) => {
    dispatch(deleteAnecdote(anecdote.id));
    notification(`You deleted "${anecdote.content}"`);
  };

  return (
    <ul>
      {anecdotes &&
        anecdotes
          .filter((a) => a.content.toLowerCase().includes(filter))
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <li key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
                <button onClick={() => deleteVote(anecdote)}>delete</button>
              </div>
            </li>
          ))}
    </ul>
  );
}
