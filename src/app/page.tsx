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
    <div className="flex-1 flex flex-col items-center lg:w-[max(calc(100vh-19rem+252px),750px)] lg:min-h-[650px] sm:w-[75vw] h-full w-full">
      <div className="pb-4 sm:px-0 px-4 flex flex-col justify-center flex-none lg:h-[150px] h-[120px] w-full text-center lg:text-lg text-sm">
        <p>The objective of the "N Queens" puzzle is to place n queens on an n x n chessboard such that no queens can capture each other. Configure the board below and try your skill at solving the puzzle!</p>
      </div>
      <div className="flex lg:flex-row flex-col flex-1 w-full">
        <div className="lg:h-full lg:min-h-[500px] lg:w-auto w-full aspect-square border">
          <Chessboard/>
        </div>
        <div className="flex flex-col lg:pl-4 lg:pt-0 sm:px-0 px-4 pt-4 lg:w-[250px] lg:h-full lg:flex-none min-h-[160px] flex-1 w-full gap-3">
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
    </div>
  );
}
