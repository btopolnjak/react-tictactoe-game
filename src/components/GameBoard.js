import React from 'react';

export default function GameBoard({ currentTurn, fields }) {

    return (
        <section className='game-board'>
            {fields.map(field => {
               return <div
                    className='board-field'
                    key={field.id}
                    id={field.id}
                    onClick={e => currentTurn(e.target)}>
                        <p className='symbol'>{field.player}</p>
                    </div>
            })}
        </section>
    )
}
