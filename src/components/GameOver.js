import React from 'react';
import ReactDOM from 'react-dom';

export default function GameOver({ setGameOverScene, setIntroScene, newGame, result }) {
    
    return ReactDOM.createPortal(
        <div className='popup-container'>
            <h2 className="result">{result}</h2>
            <div>
                <button
                    className='popup-primary-button'
                    onClick={() => newGame()}
                >New Game</button>
                <button
                    className='popup-secondary-button'
                    onClick={() => {
                        setGameOverScene(false);
                        setIntroScene(true);
                }}>Close</button>
            </div>
        </div>, document.getElementById("gameOver")
    )
}