import { useState, useEffect } from "react"
import Confetti from "react-confetti"
import Die from "./components/Die"
import { allNewDice, newDieObject } from "./components/Utils"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [rollCount, setRollCount] = useState(0)
  const [timerTime, setTimerTime] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [tenzies, setTenzies] = useState(false) // win state
  const [lowScore, setLowScore] = useState(
    null || JSON.parse(localStorage.getItem("storedLowScore"))
  )
  const [newLowScore, setNewLowScore] = useState(false) // check if new low score is set
  let timeInt = parseInt(("0" + Math.floor((timerTime / 1000) % 60)).slice(-2))

  // LOW SCORE - setting and getting low scores from localStorage
  useEffect(() => {
    let gameScore = timeInt + rollCount
    if ((tenzies && !lowScore) || (tenzies && gameScore < lowScore)) {
      localStorage.setItem("storedLowScore", JSON.stringify(gameScore))
      setLowScore(gameScore)
      setNewLowScore(true)
    } else {
      setNewLowScore(false)
    }
  }, [tenzies])

  // TIMER
  useEffect(() => {
    let interval
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (!timerRunning) {
      clearInterval(interval) // stops interval from timerRunning based on state
    }
    return () => clearInterval(interval)
  }, [timerRunning]) // useEffect when {timerRunning} is true

  // WIN STATE
  useEffect(() => {
    const stillPlaying = dice.find((die) => die.isHeld === false) // any unheld dice?
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue) // all match dice #1?
    if (!stillPlaying && allSameValue) {
      setTimerRunning(false)
      setTenzies(true)
    }
  }, [dice])

  // ROLL BUTTON
  function rollDice() {
    setTimerRunning(true)
    setRollCount((prevCount) => prevCount + 1)
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : newDieObject()
      })
    )
  }

  // HOLD CLICKED DICE
  function holdDice(id) {
    !tenzies ? setTimerRunning(true) : setTimerRunning(false) // ??
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
  }

  function newGame() {
    setDice(allNewDice())
    setRollCount(0)
    setTimerTime(0)
    setTimerRunning(false)
    setTenzies(!tenzies)
  }

  // 10 Die jsx elements render into {dieElements}
  const dieElements = dice.map((die) => (
    <Die
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      {!tenzies && (
        <p className="instructions">
          Click dice to freeze between rolls.
          <br />
          Roll remaining dice until all match.
          <br />
          Score = rolls + time (lower is better).
        </p>
      )}
      {tenzies && (
        <>
          {newLowScore ? (
            <p>NEW LOW SCORE!  Just excellent.</p>
          ) : (
            <p>WINNER!  Nice one, you.  I know you can do better though.</p>
          )}
        </>
      )}
      <div className="diceContainer">{dieElements}</div>
      {!tenzies ? (
        <div className="stopwatch">
          {timerRunning ? (
            <div className="numbers">
              <div>
                <span>Rolls: </span>
                <span>{rollCount}</span>
              </div>
              <div>
                <span>Time: </span>
                <span>{timeInt} seconds</span>
              </div>
            </div>
          ) : (
            <span>Click dice / roll to begin!</span>
          )}
        </div>
      ) : (
        <p>
          You scored <span className="bold">{timeInt + rollCount}</span>
          <br />
          {`(${timeInt} seconds + ${rollCount} rolls)`}
          <br />
          <br />
          Low score:{" "}
          <span className="bold">
            {lowScore ? lowScore : timeInt + rollCount}
          </span>
        </p>
      )}
      <button className="roll shadow" onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New Game?" : "Roll"}
      </button>
    </main>
  )
}

export default App
