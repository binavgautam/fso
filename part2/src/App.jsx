import { useState } from "react";
import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const [topVoted, setTopVoted] = useState(0);

  const handleClick = () => {
    const newVotes = [...votes];
    console.log(newVotes);
    newVotes[selected] += 1;
    setVotes(newVotes);
    if (newVotes[selected] > newVotes[topVoted]) setTopVoted(selected);
  };
  return (
    <div>
      <h1>Anectode of The Day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button
        text="next anecdote"
        handleClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      />
      <Button text="vote" handleClick={handleClick} />
      <h1>Top Voted Anecdote</h1>
      {anecdotes[topVoted]} <br />
      {votes[topVoted]} votes
    </div>
  );
};

export default App;
