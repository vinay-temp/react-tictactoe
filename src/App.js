import React, { useState } from "react";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("O");
  const [winner, setWinner] = useState(null);
  const [msg, setMsg] = useState(`Its O's turn`);

  function handleClick(index) {
    if (winner || squares[index]) return;

    const newSquares = [...squares];
    newSquares[index] = turn === "O" ? "circle" : "cross";

    const nextTurn = turn === "O" ? "X" : "O";
    setTurn(nextTurn);
    setMsg(`Its ${nextTurn}'s turn`);
    setSquares(newSquares);
    checkWinner(newSquares);
  }

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setMsg(`Winner is ${squares[a]}`);
        setWinner(squares[a]);
        return;
      }
    }
    if (squares.every((square) => square !== null)) {
      setMsg(`It's a DRAW`);
      setWinner("draw");
    }
  };

  function handleNewGame() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setTurn("O");
    setMsg(`Its O's turn`);
  }

  return (
    <div className="App">
      {Array(3)
        .fill(null)
        .map((_, row) => (
          <div key={row} className="row">
            {Array(3)
              .fill(null)
              .map((_, col) => {
                const index = row * 3 + col;
                return (
                  <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className="cell"
                  >
                    <div className={squares[index]}></div>
                  </div>
                );
              })}
          </div>
        ))}
      <p>{msg}</p>
      {winner && <button onClick={handleNewGame}>New Game</button>}
    </div>
  );
};

export default App;
