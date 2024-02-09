import { useState } from "react";
import {Chess} from "chess.js"; 
import { Chessboard } from "react-chessboard"; 

function App() {
  const [game, setGame] = useState(new Chess());

  function makeAMove(move) {
    const gameCopy = new Chess(game.fen()); 
    const result = gameCopy.move(move);
    if (result !== null) {
      setGame(gameCopy); // Update the game state only if the move is legal
    }
    return result; 
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      return; // Exit when game is over
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen
    });

    // Illegal move
    if (move === null) {
      return false;
    }
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}

export default App;
