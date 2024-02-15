import React from "react";
import "./style.css";

function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die" style={style} onClick={props.freezeDice}>
      <p>{props.number}</p>
    </div>
  );
}

export default Die;
