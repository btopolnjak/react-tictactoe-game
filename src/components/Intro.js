import React from 'react';
import ReactDOM from 'react-dom';

export default function Intro({ newGame }) {
    
    return ReactDOM.createPortal(
        <div className='popup-container'>
            <h1 className="headline">Tic Tac Toe</h1>
            <h6 className="subtitle">Try to beat me in this fun game</h6>
            <button className='popup-primary-button' onClick={() => newGame()}>New Game</button>
        </div>, document.getElementById("intro")
    )
}