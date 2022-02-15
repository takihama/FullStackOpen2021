import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = (value) => {
    setGood(value)
  }
    const setNeutralValue = (value) => {
    setNeutral(value)
  }
  const setBadValue = (value) => {
    setBad(value)
  }

  return (
    <div>
      <DisplayTitle text="Give feedback" />
      <div>
        <Button text="Good" onClick={() => setGoodValue(good + 1)} />
        <Button text="Neutral" onClick={() => setNeutralValue(neutral + 1)} />
        <Button text="Bad" onClick={() => setBadValue(bad + 1)} />
      </div>
      
      <DisplayTitle text="Statistics" />

      <DisplayText text="Good" value={good} />
      <DisplayText text="Neutral" value={neutral} />
      <DisplayText text="Bad" value={bad} />
      <DisplayText text="All" value={good + neutral + bad} />
      <DisplayText text="Average" value={(good - bad)/(good + neutral + bad)}/>
      <DisplayText text="Positive" value={good/(good + neutral + bad)*100 + '%'} />

    </div>
  )
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const DisplayText = ({ text, value }) => (
  <div>
    <p>{text} {value}</p>
  </div>
)

const DisplayTitle = ({ text }) => (
  <div>
    <h2>{text}</h2  >
  </div>
)

export default App