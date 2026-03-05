import React, { createContext } from "react";

export type SquareState = '0' | '.' | 'Q';

export type SquareData = {
    state: SquareState,
    queensCovering: number,
    transitionDelay: number
}

interface Chessboard {
    boardSize: number;
    boardRep: SquareData[][];
    squareRefs: React.Ref<(HTMLButtonElement | null)[][]>;
    focusedSquare: [number, number];
    queens: Map<number, number>;
    fill: (row: number, col: number) => void;
    reset: () => void;
    changeBoardSize: (newSize: number) => void;
    handleKeyDown: (e: React.KeyboardEvent, row: number, column: number) => void;
    genSolution: () => void;
}

export const ChessboardContext = createContext<Chessboard|null>(null)