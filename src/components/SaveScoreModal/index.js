import React from "react";
import "./style.css";

function SaveScoreModal({
  closeModal,
  setClassement,
  counter,
  setShowSaveScoreModal,
}) {
  const [name, setName] = React.useState("");

  const handleSave = () => {
    setClassement((prev) => [...prev, { name, score: counter }]);
    setShowSaveScoreModal(false);
  };

  return (
    <div className="modal-background">
      <div className="modal-container">
        <h1>Enter your name:</h1>
        <div className="input-container">
          <input
            className="name-input"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="button-container">
          <button
            className="button"
            onClick={handleSave}
            disabled={name.length < 1}
          >
            Save
          </button>
          <button className="button" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveScoreModal;
