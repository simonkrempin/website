import React from "react";
import { IHexaChessFigure } from "../../interfaces/hexachess";
import { Pieces, Board } from "./board";

export const testIds = {
    frame: "frame"
}

export const GameEngine = () => {
    const pieces: IHexaChessFigure[] = [
        { type: "king", color: "black", position: { q: 1, r: 4, s: -5 } },
        { type: "queen", color: "black", position: { q: -1, r: 5, s: -5 } },
        { type: "rook", color: "black", position: { q: 3, r: 2, s: -5 } },
        { type: "rook", color: "black", position: { q: -3, r: 5, s: -5 } },
        { type: "bishop", color: "black", position: { q: 0, r: 5, s: -5 } },
        { type: "bishop", color: "black", position: { q: 0, r: 4, s: -4 } },
        { type: "bishop", color: "black", position: { q: 0, r: 3, s: -3 } },
        { type: "knight", color: "black", position: { q: -2, r: 5, s: -3 } },
        { type: "knight", color: "black", position: { q: 2, r: 3, s: -5 } },
        { type: "pawn", color: "black", position: { q: -4, r: 5, s: -1 } },
        { type: "pawn", color: "black", position: { q: -3, r: 4, s: -1 } },
        { type: "pawn", color: "black", position: { q: -2, r: 3, s: -1 } },
        { type: "pawn", color: "black", position: { q: -1, r: 2, s: -1 } },
        { type: "pawn", color: "black", position: { q: 0, r: 1, s: -1 } },
        { type: "pawn", color: "black", position: { q: 1, r: 1, s: -2 } },
        { type: "pawn", color: "black", position: { q: 2, r: 1, s: -3 } },
        { type: "pawn", color: "black", position: { q: 3, r: 1, s: -4 } },
        { type: "pawn", color: "black", position: { q: 4, r: 1, s: -5 } },
    ];

    return(
        <div
            data-testid={testIds.frame}
        >
            <Board/>
            <Pieces figures={pieces}/>
        </div>
    );
}