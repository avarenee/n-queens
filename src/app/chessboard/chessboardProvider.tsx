"use client"

import { ChessboardContext, SquareData, SquareState } from "@/contexts/chessboard.context"
import { ReactNode, useState } from "react"

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

    function addQueen(row: number, col: number) {
        queens.set(row, col);

        let fillStop: number = Math.max(row, col, (boardSize - 1) - row, (boardSize - 1) - col)
        setBoardRep((prev) => {
            let next = [...prev]
            next[row][col] = {
                state: 'Q',
                queensCovering: 1
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
                            queensCovering: queensCovering + 1
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
            next[row][col] = {
                state: '0',
                queensCovering: 0
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
                            state: queensCovering === 1 ? '0' : '.',
                            queensCovering: queensCovering - 1
                        }
                    }
                }
            }
            return next
        })
    }

    function fill(row: number, col: number) {
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
        ))
    }

    function changeBoardSize(newSize: number) {
        queens.clear();
        setBoardSize(newSize)
        setBoardRep(Array.from(
            { length: newSize }, 
            () => Array(newSize).fill({ state: '0', queensCovering: 0 })
        ))
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
            Array.from({ length: boardSize }, () => ({ state: '0' as SquareState, queensCovering: 0 }))
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
                queens,
                fill,
                reset,
                changeBoardSize,
                genSolution
            }}
        >
            {children}
        </ChessboardContext.Provider>
    )
}