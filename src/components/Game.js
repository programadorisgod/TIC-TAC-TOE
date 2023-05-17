import { useState, useEffect } from "react";
import Board from "./Board";
import axios from "axios";
import Winners from "./WinnersBoard";
import Buscar from "./Buscar";
import Update from "./Update";
import Delete from "./Delete";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), coordinates: { row: null, col: null } }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [orden, setOrden] = useState("ascendente");
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const [winnersList, setWinnersList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3306/api/winners")
      .then((response) => setWinnersList(response.data))
      .catch((error) => console.error(error));
  }, []);

  function handleSortMoves() {
    if (orden === "ascendente") {
      setOrden("descendente");
    } else {
      setOrden("ascendente");
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }


  function post (winner) {
    const fecha = new Date();
    const formato = fecha.toLocaleDateString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'})
    const parts = formato.split('/')
    const reordereDate = `${parts[2]}-${parts[1]}-${parts[0]}}`
    let win = {
      name: winner,
      time: reordereDate
    }
    console.log(win)

    axios
    .post('http://localhost:3306/api/winners', win).then(() => {
      axios
      .get("http://localhost:3306/api/winners")
      .then((response) => setWinnersList(response.data))
      .catch((error) => console.error(error));
    })
    .catch(error => console.error(error))
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Ir hacia la jugada # ${move} en la posición (${squares.coordinates.row},${squares.coordinates.col})`;
    } else {
      description = "Ir al inicio del juego";
    }

    let element = <button onClick={() => jumpTo(move)}>{description}</button>;
    if (move === currentMove) {
      element = <span>{"Estás en el movimiento # " + currentMove}</span>;
    }
    return <li key={move}>{element}</li>;
  });

  if (orden === "descendente") {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} Winner={post}/>
      </div>
      <div className="game-info">
        <button onClick={handleSortMoves}>{orden === "ascendente" ? "Ordenar Descendentemente" : "Ordenar Ascendentemente"}</button>
        <ol>{moves}</ol>
      </div>
      <div>
       <Winners winnersList={winnersList}/>
      </div>
     <div>
     <Buscar setWinnersList={setWinnersList}/>
     </div>
     <div>
      <Update setWinnersList={setWinnersList}/>
      </div>
      <div>
      <Delete setWinnersList={setWinnersList}/>
      </div>
    </div>
  );
}
