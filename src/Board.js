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
    if (
      board.forEach((row) => {
        if (row.includes(true)) return false;
      })
    )
      return true;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        boardCopy[y][x + 1] =
          x + 1 < ncols ? !boardCopy[y][x + 1] : boardCopy[y][x + 1];
        boardCopy[y][x - 1] =
          x - 1 >= 0 ? !boardCopy[y][x - 1] : boardCopy[y][x - 1];
        boardCopy[y - 1][x] =
          y - 1 >= 0 ? !boardCopy[y - 1][x] : boardCopy[y - 1][x];
        boardCopy[y + 1][x] =
          y + 1 < nrows ? !boardCopy[y + 1][x] : boardCopy[y + 1][x];
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => [...row]);

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
  const tableBoard = board.map((row,rowIdx) => {
    return (
      <tr>
      {row.map((cell,cellIdx) => {
        if (cell) return <Cell key={`${rowIdx}${cellIdx}`} isLit={true} flipCellsAroundMe={flipCellsAround} />;
        else return <Cell key={`${rowIdx}${cellIdx}`} isLit={false} flipCellsAroundMe={flipCellsAround}/>;
      })}
    </tr>
    )
  });

  return (<>
  <table>
    <tbody>
      {tableBoard}
    </tbody>
  </table>
  </>);
}

export default Board;
