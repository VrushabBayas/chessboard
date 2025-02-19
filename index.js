class ChessBoard {
  constructor(position) {
    this.columns = "ABCDEFGH";
    this.rows = "12345678";
    this.col = position[0];
    this.row = parseInt(position[1]);
    this.colIndex = this.columns.indexOf(this.col);
  }
  /**
   * Checks if the move is valid on a chessboard.
   *
   * @param {number} newColumnIndex - The new column index (0-based).
   * @param {number} newRow - The new row index (1-based).
   * @returns {boolean} True if the move is within the bounds of the chessboard, false otherwise.
   */
  isValidMove(newColumnIndex, newRow) {
    return (
      newColumnIndex >= 0 && newColumnIndex < 8 && newRow >= 1 && newRow <= 8
    );
  }

  /**
   * Generates all possible moves for a piece given its movement directions and maximum steps.
   *
   * @param {Array.<Array.<number>>} directions - An array of direction vectors, where each vector is an array of two numbers [dx, dy].
   * @param {number} [maxSteps=8] - The maximum number of steps a piece can move in any direction. Defaults to 8.
   * @returns {Array.<string>} An array of strings representing the valid moves in chess notation.
   */
  generateMoves(directions, maxSteps = 8) {
    const moves = [];
    for (let i = 1; i <= maxSteps; i++) {
      directions.forEach(([dx, dy]) => {
        const newColumnIndex = this.colIndex + dx * i;
        const newRow = this.row + dy * i;
        if (this.isValidMove(newColumnIndex, newRow)) {
          moves.push(`${this.columns[newColumnIndex]}${newRow}`);
        }
      });
    }
    return moves;
  }
}

class Pawn extends ChessBoard {
  getPossibleMoves() {
    return this.row < 8 ? [`${this.col}${this.row + 1}`] : [];
  }
}

class King extends ChessBoard {
  getPossibleMoves() {
    return this.generateMoves(
      [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ],
      1
    );
  }
}
class Queen extends ChessBoard {
  getPossibleMoves() {
    const moves = [];
    // Generate moves in the required order
    moves.push(...this.generateMoves([[-1, 0]]).sort()); // Left (A4, B4, C4, D4)
    moves.push(...this.generateMoves([[1, 0]])); // Right (F4, G4, H4)
    moves.push(...this.generateMoves([[0, -1]]).sort()); // Down (E1, E2, E3)
    moves.push(...this.generateMoves([[0, 1]])); // Up (E5, E6, E7, E8)
    moves.push(...this.generateMoves([[-1, 1]]).sort()); // Diagonal up-left (A8, B7, C6, D5)
    moves.push(...this.generateMoves([[1, -1]])); // Diagonal down-right (F3, G2, H1)
    moves.push(...this.generateMoves([[-1, -1]]).sort()); // Diagonal down-left (B1, C2, D3)
    moves.push(...this.generateMoves([[1, 1]])); // Diagonal up-right (F5, G6, H7)

    return moves;
  }
}
/**
 * Get the possible moves for a given chess piece at a specific position.
 *
 * @param {string} piece - The type of chess piece (e.g., "Pawn").
 * @param {string} position - The current position of the piece on the chessboard (e.g., "G1").
 * @returns {string} A comma-separated string of possible moves or an error message.
 */
function getPossibleMoves(piece, position) {
  const pieces = {
    pawn: new Pawn(position),
    king: new King(position),
    queen: new Queen(position),
  };
  if (!pieces[piece.toLowerCase()]) return "Invalid piece";
  const moves = pieces[piece.toLowerCase()].getPossibleMoves();
  return moves.length > 0 ? moves.join(", ") : "Move not possible";
}
// getPossibleMoves("Pawn", "G1");
module.exports = { getPossibleMoves };
