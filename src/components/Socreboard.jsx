export default function Scoreboard({score, highScore}) {
    return (
        <div className='scoreboard'>
            <div className='score'>
                <p>Score<br/>{score}</p>
            </div>
            <div className='highScore'>
                <p>High Score<br/>{highScore}</p>
            </div>
        </div>
    )
}