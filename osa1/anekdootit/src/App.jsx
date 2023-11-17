import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(8).fill(0));

  const nextRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <p>
        <button onClick={voteAnecdote}>vote</button>
        <button onClick={nextRandomAnecdote}>next anecdote</button>
      </p>
      <h1>Anectode with most votes</h1>
      <Best points={points} anecdotes={anecdotes} />
    </div>
  )
}

const Best = ({points, anecdotes}) => {
  console.log(points)
  if (Math.max(...points) === 0) return <p>Not votes yet</p>

  const maxIndex = points.indexOf(Math.max(...points))

  return (
    <div>
      <p>{anecdotes[maxIndex]}</p>
      <p>Has {points[maxIndex]} votes</p>
    </div>
  )
}

export default App
