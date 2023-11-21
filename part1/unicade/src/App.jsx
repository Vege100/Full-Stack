import { useState } from 'react'

const App = () => {
  const otsikko = 'give feedback'
  const statistics = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeed = () => {
    setGood(good + 1)
  }
  
  const neutralFeed = () => {
    setNeutral(neutral + 1)
  }
  
  const badFeed = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Otsikko text={otsikko} />
      <Button handleClick={goodFeed} text='good' />
      <Button handleClick={neutralFeed} text='neutral' />
      <Button handleClick={badFeed} text='bad' />
      <Otsikko text={statistics} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (bad === 0 && neutral === 0 && good === 0) return <div>No feedback given</div>
  return (
    <table>
      <tbody>
        <tr>
          <StatisticLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value={good + bad + neutral} />
        </tr>
        <tr>
          <StatisticLine text="average" value={(good - bad)/(good + bad + neutral)} />
        </tr>
        <tr>
          <StatisticLine text="positive" value={`${good/(good + bad + neutral)*100}%`} />
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Otsikko = (props) => {
 return <h1>{props.text}</h1> 
}

export default App