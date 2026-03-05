"use client"

import { ChessboardContext, SquareData, SquareState } from "@/contexts/chessboard.context"
import { ReactNode, useRef, useState } from "react"

const queens = new Map<number, number>();

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
]

interface ChessboardProviderProps {
    children: ReactNode
}

export const ChessboardProvider: React.FC<ChessboardProviderProps> = ({ children }) => {
    const [boardSize, setBoardSize] = useState<number>(8);
    const [boardRep, setBoardRep] = useState<SquareData[][]>(
        Array.from(
            { length: boardSize }, 
            () => Array(boardSize).fill({ state: '0', queensCovering: 0 })
        )
    )
    const [focusedSquare, setFocusedSquare] = useState<[number, number]>([0, 0])
    const squareRefs = useRef<(HTMLButtonElement | null)[][]>([])

    const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
        const moves: Record<string, [number, number]> = {
        ArrowUp:    [-1,  0],
        ArrowDown:  [ 1,  0],
        ArrowLeft:  [ 0, -1],
        ArrowRight: [ 0,  1],
        }
        const delta = moves[e.key]
        if (!delta) return

        e.preventDefault() // prevent page scrolling
        const newRow = Math.max(0, Math.min(boardSize - 1, row + delta[0]))
        const newCol = Math.max(0, Math.min(boardSize - 1, col + delta[1]))
        setFocusedSquare([newRow, newCol])
        squareRefs.current[newRow][newCol]?.focus()
    }

    function addQueen(row: number, col: number) {
        queens.set(row, col);

        let fillStop: number = Math.max(row, col, (boardSize - 1) - row, (boardSize - 1) - col)
        setBoardRep((prev) => {
            let next = [...prev]
            next[row][col] = {
                state: 'Q',
                queensCovering: 1,
                transitionDelay: 0
            }
            for (let layer = 1; layer <= fillStop; layer++) {
                for (const direction of directions) {
                    const currentRow = row + direction[0]*layer
                    const currentCol = col + direction[1]*layer
                    if (currentRow < 0 || currentRow >= boardSize || currentCol < 0 || currentCol >= boardSize) {
                        continue;
                    } else {
                        const queensCovering = prev[currentRow][currentCol].queensCovering
                        next[currentRow][currentCol] = {
                            state: '.',
                            queensCovering: queensCovering + 1,
                            transitionDelay: layer
                        }
                    }
                }
            }
            return next
        })
    }

    function removeQueen(row: number, col: number) {
        queens.delete(row);

        let fillStop: number = Math.max(row, col, (boardSize - 1) - row, (boardSize - 1) - col)
        setBoardRep((prev) => {
            let next = [...prev]
            for (let layer = fillStop; layer >= 1; layer--) {
                for (const direction of directions) {
                    const currentRow = row + direction[0]*layer
                    const currentCol = col + direction[1]*layer
                    if (currentRow < 0 || currentRow >= boardSize || currentCol < 0 || currentCol >= boardSize) {
                        continue;
                    } else {
                        const queensCovering = prev[currentRow][currentCol].queensCovering
                        next[currentRow][currentCol] = {
                            state: queensCovering === 1 ? '0' : '.',
                            queensCovering: queensCovering - 1,
                            transitionDelay: fillStop - layer
                        }
                    }
                }
            }
            next[row][col] = {
                state: '0',
                queensCovering: 0,
                transitionDelay: fillStop
            }
            return next
        })
    }

    function fill(row: number, col: number) {
        if (boardRep[row][col].state === '.') {
            return
        }
        if (queens.has(row)) {
            removeQueen(row, col)
        } else {
            addQueen(row, col)
        }
    }

    function reset() {
        queens.clear();
        setBoardRep(Array.from(
            { length: boardSize }, 
            () => Array(boardSize).fill({ state: '0', queensCovering: 0 })
        ));
    }

    function changeBoardSize(newSize: number) {
        queens.clear();
        setBoardSize(newSize);
        setBoardRep(Array.from(
            { length: newSize }, 
            () => Array(newSize).fill({ state: '0', queensCovering: 0 })
        ));
        setFocusedSquare([0, 0]);
        squareRefs.current = [];
    }

    function genSolution(): void {
        // Find all valid solutions using backtracking
        // queens[row] = col means a queen is placed at (row, col)
        const allSolutions: number[][] = []

        function solve(row: number, queens: number[]): void {
            if (row === boardSize) {
            allSolutions.push([...queens])
            return
            }

            for (let col = 0; col < boardSize; col++) {
            if (isValid(queens, row, col)) {
                queens.push(col)
                solve(row + 1, queens)
                queens.pop()
            }
            }
        }

        function isValid(queens: number[], row: number, col: number): boolean {
            for (let r = 0; r < queens.length; r++) {
            const c = queens[r]
            if (c === col) return false
            if (Math.abs(row - r) === Math.abs(col - c)) return false
            }
            return true
        }

        solve(0, [])

        // Pick a random solution
        const queenCols = allSolutions[Math.floor(Math.random() * allSolutions.length)]

        // Build the board with queensCovering counts
        const board: SquareData[][] = Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => ({ state: '0' as SquareState, queensCovering: 0, transitionDelay: 0 }))
        )

        // Place queens
        for (let row = 0; row < boardSize; row++) {
            board[row][queenCols[row]].state = 'Q'
        }

        // For each square, count how many queens can capture it and set state
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
            if (board[row][col].state === 'Q') continue

            let count = 0
            for (let qRow = 0; qRow < boardSize; qRow++) {
                const qCol = queenCols[qRow]
                const sameCol = col === qCol
                const sameRow = row === qRow
                const sameDiag = Math.abs(row - qRow) === Math.abs(col - qCol)

                if (sameCol || sameRow || sameDiag) {
                count++
                }
            }

            board[row][col].queensCovering = count
            board[row][col].state = count > 0 ? '.' : '0'
            }
        }

        setBoardRep(board)
    }

    return (
        <ChessboardContext.Provider
            value={{
                boardSize,
                boardRep,
                squareRefs,
                focusedSquare,
                queens,
                fill,
                reset,
                changeBoardSize,
                handleKeyDown,
                genSolution
            }}
        >
            {children}
        </ChessboardContext.Provider>
    )
}