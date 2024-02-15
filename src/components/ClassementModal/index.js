import React from "react";
import { nanoid } from "nanoid";
import "./style.css";

function ClassementModal({ classement, setClassement, setShowClassement }) {
  const orderedPlayers = classement.sort((a, b) => {
    return a.score - b.score;
  });
  const playersComponents = orderedPlayers.map((player) => {
    return (
      <li className="list-element" key={nanoid()}>
        {player.name} with a score of {player.score}
      </li>
    );
  });

  const handleResetScore = () => {
    setClassement([]);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <ol>{playersComponents}</ol>
        <div className="button-container">
          <button className="button" onClick={() => setShowClassement(false)}>
            Close
          </button>
          <button
            className="button"
            onClick={handleResetScore}
            disabled={classement.length === 0}
          >
            Reset score
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClassementModal;
