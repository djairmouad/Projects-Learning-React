export default function GameOver({winner,onSelect}){
    return(
        <div id="game-over">
            <h2>Game Over</h2>
            { winner && <p> {winner} Won!</p> } 
            { !winner && <p> it's Draw!</p> } 
            <button onClick={onSelect}>Rematch!</button>
        </div>
    )
}