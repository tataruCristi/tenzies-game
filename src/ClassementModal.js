import React from "react";
import { nanoid } from "nanoid";

function ClassementModal(props) {

    const players = JSON.parse(localStorage.getItem("name")) || []
    const orderedPlayers = players.sort((a, b) => {
        return a.score - b.score
    })
    const playersComponents = orderedPlayers.map((player) => {
        return (<li key={nanoid()}>
            {player.name} with a score of {player.score}
        </li>)
    })

    return (
        <div className="modal-background">
            <div className="classement-container">
                <div className="close-btn-container">
                    <button 
                        className="close-btn"
                        onClick={props.closeClassement}
                        > X 
                    </button>
                </div>
                <ol>
                    {playersComponents}
                </ol>
                <button 
                    className="classement-close-btn"
                    onClick={props.closeClassement}
                    >Close
                </button>
            </div>
        </div>
    )
}

export default ClassementModal