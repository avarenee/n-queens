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
    <div className="flex flex-col items-center h-full lg:min-h-[750px] w-full">
      <div className="p-4 flex flex-col sm:h-[150px] h-[120px] lg:w-[max(calc(70vh+250px),60vw)] w-full text-center lg:text-lg text-sm">
        <p>The objective of the "N Queens" puzzle is to place n queens on an n x n chessboard such that no queens can capture each other. Configure the board below and try your skill at solving the puzzle!</p>
      </div>
      <div className="flex flex-col lg:justify-center lg:flex-row lg:w-auto sm:w-[75vw] flex-1 w-full items-center gap-4">
        <div className="lg:h-full lg:w-auto lg:min-h-[500px] sm:h-[75vw] w-full aspect-square border">
          <Chessboard/>
        </div>
        <div className="lg:w-[250px] lg:h-full min-h-[160px] w-full flex flex-col gap-3">
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
      <div className="sm:h-[100px] sm:flex-none flex-shrink w-full">

      </div>
    </div>
  );
}
