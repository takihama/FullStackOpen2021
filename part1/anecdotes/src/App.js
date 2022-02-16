import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [anecdotesScores, setAnecdotesScores] = useState(Array(anecdotes.length).fill(0))

  const randomInteger = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomAnecdote = () => setSelected(randomInteger(0, anecdotes.length - 1))
  const maxScoreAnecdote = () => {
    const max = Math.max(...anecdotesScores)
    return anecdotesScores.indexOf(max)
  }
  const voteAnecdote = () => {
    const copyScores = [...anecdotesScores]
    copyScores[selected] += 1
    setAnecdotesScores(copyScores)
  }

  return (
    <div>
      <DisplayTitle text="Anecdote of the day" />
      <DisplayText text={anecdotes[selected]} />
      <DisplayText text={'Has ' + anecdotesScores[selected] + ' scores'} />     
      
      <Button text="vote" onClick={() => voteAnecdote()} />
      <Button text="next anecdote" onClick={() => randomAnecdote()} />

      <DisplayTitle text="Anecdote with most votes" />
      <DisplayText text={anecdotes[maxScoreAnecdote()]} />
      <DisplayText text={'Has ' + anecdotesScores[maxScoreAnecdote()] + ' scores'} />     
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const DisplayTitle = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
)

const DisplayText = ({ text }) => (
  <div>
    <p>{text}</p>
  </div>
)
export default App