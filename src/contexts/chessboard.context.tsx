import { createContext } from "react";

export type SquareState = '0' | '.' | 'Q';

export type SquareData = {
    state: SquareState,
    queensCovering: number
}

interface Chessboard {
    boardSize: number;
    boardRep: SquareData[][];
    queens: Map<number, number>;
    fill: (row: number, col: number) => void;
    reset: () => void;
    changeBoardSize: (newSize: number) => void;
    genSolution: () => void;
}

export const ChessboardContext = createContext<Chessboard|null>(null)