
import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  
  if (good + neutral + bad > 0) {
    return (
      <div>
        <StatisticLine text='good' stats={good} />
        <StatisticLine text='neutral' stats={neutral} />
        <StatisticLine text='bad' stats={bad} />
        <StatisticLine text='all' stats={good + neutral + bad} />
        <StatisticLine text='average' stats={(good - bad) / (good + neutral + bad)} />
        <StatisticLine text='positive' stats={100 * good / (good + neutral + bad) + ' %'} />
      </div>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, stats }) => (
  <p>{text} {stats}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad'onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
        
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App;
