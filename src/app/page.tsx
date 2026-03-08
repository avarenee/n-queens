"use client"

import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import useChessboardContext from "./chessboard/useChessboardContext";
import { rangeInclusive } from "@/utils/range";
import { Chessboard } from "./chessboard/chessboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoseDialog } from "@/components/ui/loseDialog";
import { WinDialog } from "@/components/ui/winDialog";

export default function Home() {
  const { 
    boardSize, 
    changeBoardSize, 
    dialogStatus, 
    setDialogStatus, 
    reset, 
    genSolution 
  } = useChessboardContext();

  return (
    <div className="flex-1 flex flex-col items-center lg:w-[max(calc(100vh-19rem+252px),750px)] lg:min-h-[650px] sm:w-[75vw] h-full w-full">
      <div className="sm:pb-6 pb-0 sm:px-0 px-4 flex flex-col sm:justify-end justify-center flex-none h-[150px] w-full text-center lg:text-xl sm:text-lg text-md">
        <p>The objective of the "N Queens" puzzle is to place n queens on an <span className="whitespace-nowrap">n x n</span> chessboard such that no two queens can capture each other. Configure the board below and try your skill at solving the puzzle!</p>
      </div>
      <div className="flex lg:flex-row flex-col flex-1 w-full">
        <div className="lg:h-full lg:min-h-[500px] lg:w-auto w-full aspect-square">
          <Chessboard/>
        </div>
        <div className="flex flex-col lg:pl-4 lg:pt-0 sm:px-0 px-4 pt-4 lg:w-[250px] lg:h-full lg:flex-none min-h-[160px] flex-1 w-full gap-3">
          <Field>
            <FieldLabel className="text-md" htmlFor="num-squares">Choose a board size:</FieldLabel>
            <Select defaultValue={boardSize.toString()} onValueChange={(val) => changeBoardSize(parseInt(val))}>
              <SelectTrigger 
                id="num-squares"
                className="w-full rounded-lg bg-white/5 text-foreground border border-foreground/20 px-4 py-2 hover:bg-foreground/10 transition-colors"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-background border border-foreground/20 rounded-lg">
                {rangeInclusive(4, 8).map((num) =>
                  <SelectItem
                    key={num.toString()}
                    value={num.toString()}
                    aria-label={`${num} by ${num}`}
                    className="text-foreground hover:bg-white cursor-pointer"
                  >
                    {num} x {num}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </Field>
          <Button 
            variant="secondary" 
            type="button"
            onClick={reset}
          >
            Reset board
          </Button>
          <Button
            type="button"
            onClick={genSolution}
          >
            Show solution
          </Button>
          <LoseDialog
            open={dialogStatus === "lose"}
            onOpenChange={() => setDialogStatus("unset")}
          />
          <WinDialog
            open={dialogStatus === "win"}
            onOpenChange={() => setDialogStatus("unset")}
          />
        </div>
      </div>
    </div>
  );
}
