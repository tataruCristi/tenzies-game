import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import SaveScoreModal from "./components/SaveScoreModal";
import ClassementModal from "./components/ClassementModal";

function App() {
  const [dices, setDices] = React.useState(allDices());
  const [tenzies, setTenzies] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [showSaveScoreModal, setShowSaveScoreModal] = React.useState(false);
  const [showClassement, setShowClassement] = React.useState(false);
  const [classement, setClassement] = React.useState(
    JSON.parse(localStorage.getItem("classement")) || []
  );

  React.useEffect(() => {
    const held = dices.every((die) => die.isHeld);
    const sameValue = dices.every((die) => die.value === dices[0].value);

    if (held && sameValue) {
      setTenzies(true);
    }
  }, [dices]);

  React.useEffect(() => {
    localStorage.setItem("classement", JSON.stringify(classement));
  }, [classement]);

  function newDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allDices() {
    const arr = [];

    for (let i = 0; i < 10; i++) {
      arr.push(newDice());
    }
    return arr;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDices(allDices());
      setCounter(0);
    } else {
      setDices((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld ? die : newDice();
        });
      });
      setCounter(counter + 1);
    }
  }

  function freezeDice(item) {
    setDices((oldDice) => {
      return oldDice.map((die) => {
        return die.id !== item.id ? die : { ...die, isHeld: !die.isHeld };
      });
    });
  }

  const dieElements = dices.map((item) => {
    return (
      <Die
        number={item.value}
        key={item.id}
        isHeld={item.isHeld}
        freezeDice={() => freezeDice(item)}
      />
    );
  });

  return (
    <>
      <main className="app">
        <h1>{tenzies ? "Congratulations!" : "Tenzies"}</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{dieElements}</div>
        <button className="roll-btn" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        {tenzies && <Confetti />}
        <h1>
          {tenzies ? `You won with ${counter} rolls!` : `Rolls: ${counter}`}
        </h1>
        <div className="buttons-container">
          <button className="button" onClick={() => setShowClassement(true)}>
            Show Classement
          </button>
          <button
            className="button"
            onClick={() => setShowSaveScoreModal(true)}
            disabled={!tenzies}
          >
            Save Score
          </button>
        </div>
        {showSaveScoreModal && (
          <SaveScoreModal
            closeModal={() => setShowSaveScoreModal(false)}
            setClassement={setClassement}
            counter={counter}
            setShowSaveScoreModal={setShowSaveScoreModal}
          />
        )}
        {showClassement && (
          <ClassementModal
            classement={classement}
            setClassement={setClassement}
            setShowClassement={setShowClassement}
          />
        )}
      </main>
    </>
  );
}

export default App;
