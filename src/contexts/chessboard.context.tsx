import React, { createContext } from "react";

export type SquareState = '0' | '.' | 'Q';

export type SquareData = {
    state: SquareState,
    queensAttacking: number,
    transitionDelay: number
}

export type DialogStatus = "win" | "lose" | "unset" | "solution"

interface Chessboard {
    boardSize: number;
    boardRep: SquareData[][];
    squareRefs: React.RefObject<(HTMLButtonElement | null)[][]>
    focusedSquare: [number, number];
    freeSquares: number;
    dialogStatus: DialogStatus;
    queens: Map<number, number>;
    fill: (row: number, col: number) => void;
    reset: () => void;
    changeBoardSize: (newSize: number) => void;
    setDialogStatus: (dialogStatus: DialogStatus) => void;
    handleKeyDown: (e: React.KeyboardEvent, row: number, column: number) => void;
    genSolution: () => void;
}

export const ChessboardContext = createContext<Chessboard|null>(null)