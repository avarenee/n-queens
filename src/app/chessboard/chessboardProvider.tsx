"use client"

import { ChessboardContext, SquareData } from "@/contexts/chessboard.context"
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

    return (
        <ChessboardContext.Provider
            value={{
                boardSize,
                boardRep,
                queens,
                fill,
                reset,
                changeBoardSize
            }}
        >
            {children}
        </ChessboardContext.Provider>
    )
}