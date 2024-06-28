import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const randomBoolean = () => Math.random() >= 0.5;
    return Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, randomBoolean)
    );
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => [...row]);

      const isValidCoord = (y, x) => x >= 0 && x < ncols && y >= 0 && y < nrows;

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        const directions = [
          [0,0],
          [0,1],
          [0,-1],
          [1,0],
          [-1,0]
        ];

        directions.forEach(([dy, dx]) => {
          const newY = y+dy;
          const newX = x+dx;

          if (isValidCoord(newY, newX)) {
            boardCopy[newY][newX] = !boardCopy[newY][newX];
          }
        })
      };

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) return "YOU WON!";

  // TODO
  // make table board
  const tableBoard = board.map((row, rowIdx) => (
    <tr key={rowIdx}>
      {row.map((cell,cellIdx) => (
        <Cell 
        key={`${rowIdx}-${cellIdx}`}
        coord={`${rowIdx}-${cellIdx}`}
        isLit={cell}
        flipCellsAroundMe={flipCellsAround}
        />
      ))}
    </tr>
  ));

  return (
    <>
      <table>
        <tbody>{tableBoard}</tbody>
      </table>
    </>
  );
}

export default Board;
