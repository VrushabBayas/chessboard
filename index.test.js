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
      "D4, F4, E3, E5, D5, F3, D3, F5, C4, G4, E2, E6, C6, G2, C2, G6, B4, H4, E1, E7, B7, H1, B1, H7, A4, E8, A8"
    );
    expect(getPossibleMoves("Queen123", "E4")).toBe("Invalid piece");
  });
  test("Bishop moves correctly", () => {
    expect(getPossibleMoves("Bishop", "E4")).toBe(
      "D5, F5, D3, F5, C6, G6, C2, G6, B7, H7, B1, H7, A8"
    );
  });
});
