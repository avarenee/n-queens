import range from "@/utils/range";
import useChessboardContext from "./useChessboardContext";
import { cn } from "@/lib/utils";
import Queen from "../queen";
import { useMemo } from "react";

const lightMap = {
  0: "bg-lightsquare-empty",
  1: "bg-lightsquare-filled"
}

const darkMap = {
  0: "bg-darksquare-empty",
  1: "bg-darksquare-filled"
}

const Square = ({row, col}: { row: number, col: number }) => {
  const { boardRep, fill } = useChessboardContext();
  const value = boardRep[row][col].state

  const squareColor: string = useMemo(() => {
    if (row % 2 === col % 2) {
      return lightMap[value === "0" ? 0 : 1]
    } else {
      return darkMap[value === "0" ? 0 : 1]
    }
  }, [value])

  const disabled = useMemo(() => {
    return value === "."
  }, [value])
  
  return (
    <button 
      onClick={() => fill(row, col)} 
      disabled={disabled}
      className={cn("h-full w-full flex items-center justify-center border border-queen cursor-pointer disabled:cursor-default", squareColor)} 
      data-row={row} 
      data-col={col}
    >
      <Queen squareState={value}/>
    </button>
  )
}

export const Chessboard = () => {
  const { boardSize } = useChessboardContext();

  return (
    <div 
      className="grid h-full w-full"
      style={{ gridTemplateRows: `repeat(${boardSize}, minmax(0, 1fr))` }}
    >
      {range(boardSize).map((row) => 
        <div
          key={row.toString()}
          className="grid h-full w-full"
          style={{ gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))` }}
        >
          {range(boardSize).map((col) => 
            <Square 
              key={row.toString() + "_" + col.toString()}
              row={row}
              col={col}
            />
          )}
        </div>
      )}
    </div>
  )
}