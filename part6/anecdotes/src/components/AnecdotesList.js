import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export default function AnecdotesList() {
  const anecdotes = useSelector((state) => state.anecdote);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const notification = (message) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 1000);
  };

  const handleVote = (id, anecdote) => {
    dispatch(vote(id));
    notification(`You voted for ${anecdote}`);
  };
  return (
    <div>
      {anecdotes
        .filter((a) => a.anecdote.toLowerCase().includes(filter))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.anecdote}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() => handleVote(anecdote.id, anecdote.anecdote)}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
