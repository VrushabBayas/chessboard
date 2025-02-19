const { getPossibleMoves } = require(".");

describe("ChessPiece Movements", () => {
  test("Pawn moves correctly", () => {
    expect(getPossibleMoves("Pawn", "G1")).toBe("G2");
    expect(getPossibleMoves("Pawn", "G8")).toBe("Move not possible");
    expect(getPossibleMoves("Pawn1", "G8")).toBe("Invalid piece");
  });
  test("King moves correctly", () => {
    expect(getPossibleMoves("King", "D5")).toBe(
      "C4, C5, C6, D4, D6, E4, E5, E6"
    );
    expect(getPossibleMoves("Kin1!", "D5")).toBe("Invalid piece");
  });
  test("Queen moves correctly", () => {
    expect(getPossibleMoves("Queen", "E4")).toBe(
      "A4, B4, C4, D4, F4, G4, H4, E1, E2, E3, E5, E6, E7, E8, A8, B7, C6, D5, F3, G2, H1, B1, C2, D3, F5, G6, H7"
    );
    expect(getPossibleMoves("Queen123", "E4")).toBe("Invalid piece");
  });
});
