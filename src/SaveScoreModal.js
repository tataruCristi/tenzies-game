import React from 'react'
import './App.css'

function SaveScoreModal(props) {
    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="close-btn-container">
                    <button 
                        className="close-btn"
                        onClick={props.closeModal}
                        > X 
                    </button>
                </div>
                <h1>Enter your name:</h1>
                <div className='input-container'>
                    <input 
                        className='name-input'
                        type="text"
                        onChange={props.handleChange}
                        value={props.name || ""}
                    />
                </div>
                
                <button 
                    className='save-btn'
                    onClick={props.saveName}
                >Save</button>
            </div>

        </div>
    )
}

export default SaveScoreModal