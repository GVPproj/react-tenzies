import { useState, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

function App() {
  // start dice state as array of 10 random numbers (betw 1 & 6)
  const [dice, setDice] = useState(allNewDice())
  // set win state (false by default)
  const [tenzies, setTenzies] = useState(false)
  // count rolls
  const [count, setCount] = useState(0)
  // timer time (number)
  const [time, setTime] = useState(0)
  // timer running?  (boolean)
  const [running, setRunning] = useState(false)
  const [lowScore, setLowScore] = useState(
    null || JSON.parse(localStorage.getItem("storedLowScore"))
  )
  const [newLowScore, setNewLowScore] = useState(false)

  let timeInt = parseInt(("0" + Math.floor((time / 1000) % 60)).slice(-2))

  //localStorage
  useEffect(() => {
    if (tenzies && !lowScore) {
      localStorage.setItem("storedLowScore", JSON.stringify(timeInt + count))
      setLowScore(timeInt + count)
      setNewLowScore(true)
    } else if (tenzies && timeInt + count < lowScore) {
      localStorage.setItem("storedLowScore", JSON.stringify(timeInt + count))
      setLowScore(timeInt + count)
      setNewLowScore(true)
    } else {
      setNewLowScore(false)
    }
  }, [tenzies])

  // timer side effect
  useEffect(() => {
    let interval
    // runs every 10 ms
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (!running) {
      clearInterval(interval) // stops interval from running based on state
    }
    return () => clearInterval(interval)
  }, [running]) // useEffect when {running} is true

  // check state of game
  useEffect(() => {
    const stillPlaying = dice.find((die) => die.isHeld === false)

    //store a value to check against the rest!
    const firstValue = dice[0].value
    const allSameValue = dice.every((die) => die.value === firstValue)

    if (!stillPlaying && allSameValue) {
      setRunning(false)
      setTenzies(true)
    }
  }, [dice])

  // create our initial array of random numbers betw 1 and 6
  function allNewDice() {
    let diceArray = []
    while (diceArray.length < 10) {
      diceArray.push(newDieObject())
    }
    return diceArray
  }

  // return a new rolled die with all props
  function newDieObject() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }
  }

  // set our state
  function rollDice() {
    setRunning(true)
    setCount((prevCount) => prevCount + 1)
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : newDieObject()
      })
    )
  }

  function newGame() {
    setCount(1)
    setTenzies(!tenzies)
    setDice(allNewDice())
    setTime(0)
    setRunning(false)
  }

  function holdDice(id) {
    !tenzies ? setRunning(true) : setRunning(false)
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      })
    )
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
            <p>NEW LOW SCORE! Just excellent.</p>
          ) : (
            <p>WINNER! Nice one, you.</p>
          )}
        </>
      )}

      <div className="diceContainer">{dieElements}</div>
      {!tenzies ? (
        <div className="stopwatch">
          {running ? (
            <div className="numbers">
              <div>
                <span>Rolls: </span>
                <span>{count}</span>
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
          You scored <span className="bold">{timeInt + count}</span>
          <br />
          {`(${timeInt} seconds + ${count} rolls)`}
          <br />
          <br />
          Low score:{" "}
          <span className="bold">{lowScore ? lowScore : timeInt + count}</span>
        </p>
      )}
      <button className="roll shadow" onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New Game?" : "Roll"}
      </button>
    </main>
  )
}

export default App
