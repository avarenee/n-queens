import { range } from "@/utils/range";
import useChessboardContext from "./useChessboardContext";
import { cn } from "@/lib/utils";
import Queen from "../queen";
import { useCallback, useMemo } from "react";

const lightMap = {
  0: "bg-lightsquare-empty",
  1: "bg-lightsquare-filled"
}

const darkMap = {
  0: "bg-darksquare-empty",
  1: "bg-darksquare-filled"
}

const Square = ({row, col}: { row: number, col: number }) => {
  const { boardRep, fill, focusedSquare, squareRefs, handleKeyDown } = useChessboardContext();
  const value = boardRep[row][col].state;
  const delay = boardRep[row][col].transitionDelay;
  const isFocused = focusedSquare[0] === row && focusedSquare[1] === col;

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

  // Accessible screen-reader label for square
  const squareLabel = disabled
    ? `Row ${row + 1}, column ${col + 1}, queen can capture square`
  : value === 'Q'
    ? `Row ${row + 1}, column ${col + 1}, queen placed`
    : `Row ${row + 1}, column ${col + 1}`

  const setSquareRef = useCallback((el: HTMLButtonElement | null) => {
    squareRefs.current[row] ??= []; 
    squareRefs.current[row][col] = el;
  }, [])
  
  return (
    <button
      ref={(el) => setSquareRef(el)}
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={(e) => handleKeyDown(e, row, col)}
      onClick={() => fill(row, col)} 
      aria-disabled={disabled}
      aria-label={squareLabel}
      style={{ transitionDelay: `${delay * 25}ms` }}
      className={cn(
        "group h-full w-full flex items-center justify-center", 
        "cursor-pointer aria-disabled:cursor-default", 
        "transition-[background-color] ease-out duration-180",
        squareColor,
        isFocused && "focus-visible:scale-115 focus-visible:border-ring focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-queen focus-visible:outline-none"
      )} 
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
      className="grid h-full w-full border border-2 border-board"
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