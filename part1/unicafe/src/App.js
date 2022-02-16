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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const DisplayText = ({ text }) => (
  <div>
    <p>{text}</p>
  </div>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const DisplayTitle = ({ text }) => (
  <div>
    <h2>{text}</h2>
  </div>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <table>
        <thead>
          
        </thead>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={good + neutral + bad} />
          <StatisticsLine text="Average" value={(good - bad) / (good + neutral + bad)} />
          <StatisticsLine text="Positive" value={good / (good + neutral + bad) * 100 + '%'} />
        </tbody>
      </table>
    )
  }
  return (
    <DisplayText text="No feedback given" />
  )
}

export default App