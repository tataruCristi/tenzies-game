import React from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import SaveScoreModal from './SaveScoreModal';
import ClassementModal from './ClassementModal';

function App() {

  const [dices, setDices] = React.useState(allDices())
  const [tenzies, setTenzies] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  const [showModal, setShowModal] = React.useState(false)
  const [showClassement, setShowClassement] = React.useState(false)
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    const held = dices.every((die) => die.isHeld)
    const sameValue = dices.every((die) => die.value === dices[0].value)
    
    if(held && sameValue) {
      setTenzies(true)
    }
  }, [dices])

  function newDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allDices() {
    const arr = []

    for(let i=0; i<10; i++) {
      arr.push(newDice())
    }
    return arr
  }

  function rollDice() {
    if(tenzies) {
      setTenzies(false)
      setDices(allDices())
      setCounter(0)
    } else {
      setDices(oldDice => {
        return oldDice.map(die => {
          return die.isHeld ? die : newDice()
        })
      })
      setCounter(counter + 1)
    }
    
  }

  function freezeDice(id) {
    setDices(oldDice => {
      return oldDice.map(die => {
        return die.id !== id ? die : {...die, isHeld: !die.isHeld}
      })
    })
  }

  function toggleModal(value) {
    setShowModal(value)
  }

  function toggleClassment(value) {
    setShowClassement(value)
  }

  function handleChange(e) {
    setName(e.target.value)
  }

  function saveName() {
    let allNames = []

    if(localStorage.getItem("name") !== null) {
      allNames = JSON.parse(localStorage.getItem("name"))
    } else {
      localStorage.setItem("name", [])
    }

    allNames.push({name, score: counter})

    localStorage.setItem("name", JSON.stringify(allNames))

    setName("")
    toggleModal(false)
  }

  const dieElements = dices.map(item => {
    return (<Die 
                number={item.value} 
                key={item.id}
                isHeld={item.isHeld}
                freezeDice={() => freezeDice(item.id)}/>)
  })

  return (
    <>
      <main className="app">
          <h1>{tenzies ? "Congratulations!" : "Tenzies"}</h1>
          <p>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </p>
          <div className="dice-container">
            {dieElements}
          </div>
          <button 
            className="roll-btn"
            onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
          {tenzies && <Confetti />}
          <h1>{tenzies ? `You won with ${counter} rolls!` : `Rolls: ${counter}`}</h1>
          <div className='buttons-container'>
            <button
              className='button-4'
              onClick={() => toggleClassment(true)}
              >
                Show Classement
              </button>
            <button 
              className='button-4'
              onClick={() => toggleModal(true)}
              disabled={!tenzies}
              >Save Score
            </button>
          </div>
          {showModal && <SaveScoreModal 
                          closeModal={() => toggleModal(false)}
                          handleChange={handleChange}
                          name={name}
                          saveName={saveName}
                          />}
          {showClassement && <ClassementModal 
                                closeClassement={() => toggleClassment(false)}/>}
      </main>
    </>
  )

}

export default App;
