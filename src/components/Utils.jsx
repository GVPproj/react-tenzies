import { nanoid } from "nanoid"

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

export { allNewDice, newDieObject }