import { useState, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

function App() {
  // start dice state as array of 10 random numbers (betw 1 & 6)
  const [dice, setDice] = useState(allNewDice())
  // set win state (false by default)
  const [tenzies, setTenzies] = useState(false)

  useEffect(()=>{
    
    const stillPlaying = dice.find(die => die.isHeld === false)
    
    //store a value to check against the rest!
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    
    if(!stillPlaying && allSameValue){
      setTenzies(true)
      console.log("winner")
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
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : newDieObject()
      })
    )
  }

  function holdDice(id) {
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
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="diceContainer">{dieElements}</div>
      <button className="roll shadow" onClick={rollDice}>
        Roll
      </button>
    </main>
  )
}

export default App
