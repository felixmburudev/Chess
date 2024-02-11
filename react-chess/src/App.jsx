import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

function App() {
  const [game, setGame] = useState(new Chess());
  const [playerColor, setPlayerColor] = useState("white");

  useEffect(() => {
    if (playerColor === "black") {
      makeRandomMove();
    }
  }, [playerColor, game]);

  function makeAMove(move) {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    if (result !== null) {
      setGame(gameCopy);
      setPlayerColor(playerColor === "white" ? "black" : "white");
      checkGameState(gameCopy); // Check game state after each move
    }
    return result;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function checkGameState(currentGame) {
    if (currentGame.isDraw()) {
      alert("Draw");
    } else if (currentGame.isCheckmate()) {
      alert("Checkmate");
    }
    else if (currentGame.isStalemate()) {
      alert("stalemate");
    }
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) {
      return false;
    }

    if (playerColor === "white") {
      setPlayerColor("black");
    }

    return true;
  }

  return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}

export default App;
