export default function EndScreen({win, newGame}) {
    return(
        <div className='endscreen'>
            <h2>Game Over</h2>
            <h3>You {win ? 'Win!': 'Lose!'}</h3>
            <button onClick={() => newGame()}>New Game</button>
        </div>
    )
}