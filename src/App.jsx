import { useState } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"

function allNewDice(){
  let diceArray = []
  while(diceArray.length < 10){
    diceArray.push(
      {
        id: nanoid(),
        value: Math.ceil(Math.random() * 6), 
        isHeld: false
      }
      )
  }
  return diceArray
}

function App() {
  // start dice state as array of 10 random numbers (betw 1 & 6)
  const [dice, setDice] = useState(allNewDice())
     
  // 10 Die jsx elements
  const dieElements = dice.map(die => <Die isHeld={die.isHeld} key={die.id} value={die.value} />)

  function rollDice(){
    setDice(allNewDice())
  }

  return (
    <main>
      <div className="diceContainer">
        {dieElements}
      </div>
      <button className="roll shadow" onClick={rollDice}>
        Roll
      </button>
    </main>
  )
}

export default App
