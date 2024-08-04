// Import the necessary dependencies
import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './components/GameOver.jsx';
const intialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
// Define the main App component
function driveActivePlayer(gameTurn){
  let currentPlayer = "X";
  // Determine the current player based on the previous turn
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function driveWinner(gameBoard,isPlayerName){
  let winner;
 for(const comp of WINNING_COMBINATIONS){
  const firstSquareSymbol=gameBoard[comp[0].row][comp[0].column];
  const scondSquareSymbol=gameBoard[comp[1].row][comp[1].column];
  const thirdSquareSymbol=gameBoard[comp[2].row][comp[2].column];
  if(firstSquareSymbol && firstSquareSymbol===scondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
   winner=isPlayerName[firstSquareSymbol];
  }
 }

 return  winner;
}
function driveGameBoard(gameTurn){
  let gameBoard=[...intialGameBoard.map(array=>[...array])];
   
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
}   
return gameBoard;
}
function App() {

  const [isPlayerName,setisPlayerName]=useState({
    "X":"player1",
    "O":"player2",
  });
  const [gameTurn, setGameTurn] = useState([]); 

  let gameBoard=driveGameBoard(gameTurn);
  let winner=driveWinner(gameBoard,isPlayerName);
  const hasDraw= gameTurn.length===9 &&!winner;
  

  const activePlayer=driveActivePlayer(gameTurn);
  // Function to handle square selection
  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurn((prevTurns) =>{
     const currentPlayer=driveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updateTurns;
    });
  }

  function handleRestart(){
    setGameTurn([]);
  }
  function handelonchangeName(symbol,newName){
  setisPlayerName((preName)=>{
    return {
    ...preName,
    [symbol]:newName
  };
  })
  }
  // Render the components
  return (
    <main>
      <div id="game-container">

        <ol id="players" className='highlight-player'>
          <Player name="Player 1" symbol="X" change={handelonchangeName} isactive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O"  change={handelonchangeName} isactive={activePlayer === "O"} />
        </ol>

        {(winner || hasDraw ) && <GameOver winner={winner}  onSelect={handleRestart}/> }
        
        <GameBoard board={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>

      <Log turns={gameTurn} />
    </main>
  );
}

// Export the App component as the default export
export default App;
