"use client"

import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import useChessboardContext from "./chessboard/useChessboardContext";
import range from "@/utils/range";
import { Chessboard } from "./chessboard/chessboard";

export default function Home() {
  const { changeBoardSize, reset } = useChessboardContext();

  return (
    <div className="flex flex-col h-screen min-h-[800px]">
      <div className="flex flex-col items-center justify-end p-4 h-[200px]">
        <h1 className="text-4xl">N Queens</h1>
        <p className="max-w-[750px]">The objective of the "N Queens" puzzle is to place n queens on an n x n chessboard such that no queens can capture each other.
        Configure the board below and try your skill at solving the puzzle!</p>
      </div>
      <div className="flex-1 flex justify-center gap-4 min-h-[500px] w-full">
        <div className="h-full aspect-square border text-4xl">
          <Chessboard/>
        </div>
        <div className="flex flex-col h-full gap-3">
          <Field>
            <FieldLabel htmlFor="num-squares">Choose a board size:</FieldLabel>
            <NativeSelect 
              id="num-squares"
              defaultValue="8"
              onChange={(ev) => changeBoardSize(parseInt(ev.target.value))}
            >
              {range(4, 9).map((num) => 
                <NativeSelectOption
                  key={num.toString()} 
                  value={num.toString()}
                >
                  {num.toString()} x {num.toString()}
                </NativeSelectOption>
              )}
            </NativeSelect>
          </Field>
          <Button 
            variant="outline" 
            type="button"
            onClick={reset}
          >
            Reset
          </Button>
          <Button variant="outline" type="button">
            Show solution
          </Button>
        </div>
      </div>
      <div className="h-[100px] w-full">

      </div>
    </div>
  );
}
