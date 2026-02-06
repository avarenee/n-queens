"use client"

import React, { useState, useMemo } from "react";
import { cn } from "../lib/utils"
import Queen from "./queen";

type CelData = {
  row: number
  col: number
  color: string
  value: string
  fill: any;
}

const lightMap = {
  0: "bg-stone-800",
  1: "bg-lime-900"
}

const darkMap = {
  0: "bg-stone-900",
  1: "bg-lime-950"
}

const Cel = ({row, col, color, value, fill}: CelData) => {
    
    const squareColor: string = useMemo(() => {
      if (color == "light") {
        return lightMap[value === "0" ? 0 : 1]
      } else {
        return darkMap[value === "0" ? 0 : 1]
      }
    }, [value])

    const disabled = useMemo(() => {
      return !(value === "0")
    }, [value])

    const queenPlaced = useMemo(() => {
      return value === "Q"
    }, [value])
    
    return (
      <button 
        onClick={() => fill(row, col)} 
        disabled={disabled}
        className={cn("h-full w-full flex items-center justify-center border border-black", "transition-colors duration-500 ease-in-out", squareColor)} 
        data-row={row} 
        data-col={col}
      >
        <Queen placed={queenPlaced}/>
      </button>
    )
  }

export default function Home() {
  const [boardSize, setBoardSize] = useState(8);
  const [boardRep, setBoardRep] = useState(Array.from({length: boardSize}, () => Array(boardSize).fill("0")))

  function fill(row: number, col: number) {
    let fillStop: number = Math.max(row, col, (boardSize - 1) - row, (boardSize) - 1 - col)
    let k: number = 1

    setBoardRep((prev) => {
      let next = [...prev]
      next[row][col] = "Q"
      while (k <= fillStop) {
        if (row - k >= 0) {
          next[row - k][col] = '.'
        }
        if (row + k < boardSize) {
          next[row + k][col] = '.'
        }
        if (col - k >= 0) {
          next[row][col - k] = '.'
        }
        if (col + k < boardSize) {
          next[row][col + k] = '.'
        }
        if (row - k >= 0 && col - k >= 0) {
          next[row - k][col - k] = '.'
        }
        if (row + k < boardSize && col - k >= 0) {
          next[row + k][col - k] = '.'
        }
        if (row - k >= 0 && col + k < boardSize) {
          next[row - k][col + k] = '.'
        }
        if (row + k < boardSize && col + k < boardSize) {
          next[row + k][col + k] = '.'
        }
        k++
      }
      return next
    })
  }

  return (
    <div className="flex justify-center h-screen">
      <div className="w-full mx-24 my-4">
        <div id="chess_board" className="w-[500px] h-[500px] border border-black grid grid-rows-8 grid-cols-8">
          {Array.from({length: boardSize*boardSize}, (_, idx) => {
              let row = Math.floor(idx/boardSize);
              let col = idx%boardSize

              let key = row.toString() + "_" + col.toString()
              return (
                <Cel 
                  key={key} 
                  row={row} 
                  col={col} 
                  color={row%2 == col%2 ? "light" : "dark"}
                  value={boardRep[row][col]}
                  fill={fill}
                ></Cel>
              )
            } 
          )}
        </div>
      </div>
    </div>
  );
}
