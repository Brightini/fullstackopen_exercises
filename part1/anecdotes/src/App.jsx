import { useState } from "react";

const Header = (props) => {
  return <h1>{props.text}</h1>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const initialiseVoteCount = () => {
    const initialVotes = {};
    for (let i = 0; i < anecdotes.length; i++) initialVotes[i] = 0;
    return initialVotes;
  };
  const [selected, setSelected] = useState(0);
  const [voteCount, setCount] = useState(initialiseVoteCount());

  // So that anecdotes can be displayed randomly
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const nextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };

  const incrementCount = (index) => {
    const newCount = {
      ...voteCount,
      [index]: voteCount[index] + 1,
    };
    setCount(newCount);
    getHighestVote(anecdotes); // Highest vote is updated when voteCount changes
  };
  const getHighestVote = () => {
    const anecdoteValues = Object.values(voteCount);
    const maxVote = Math.max(...anecdoteValues);
    return maxVote;
  };

  const highestVote = getHighestVote();
  const mostVotedAnecdote =
    anecdotes[
      Object.keys(voteCount).reduce((a, b) =>
        voteCount[a] > voteCount[b] ? a : b
      )
    ];

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <p>has {voteCount[selected]} votes</p>
      <Button handleClick={() => incrementCount(selected)} text="votes" />
      <Button handleClick={nextAnecdote} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      {mostVotedAnecdote}
      <p>has {highestVote} votes</p>
    </div>
  );
};

export default App;
