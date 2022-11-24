/**
 * This class is responsible for the game logic.
 * Possibles moves are calculated here.
 * The game state is stored here.
 * The game state is updated here.
 * The piece movement is handled here.
 */

import React from "react";
import { IHexaChessFigure, IHexaChessPosition, pieceTypes } from "../../interfaces/hexachess";
import { Pieces, Board } from "./board";

export const testIds = {
    frame: "frame"
}

const getMovableTiles = (figure: IHexaChessFigure | null): IHexaChessPosition[] | undefined => {
    if (!figure) return undefined;
    
    const possibleMoves: Record<pieceTypes, any> = {
        "king": () => {
            return [
                { q: figure.position.q, r: figure.position.r - 1, s: figure.position.s + 1 },
                { q: figure.position.q + 1, r: figure.position.r - 1, s: figure.position.s },
                { q: figure.position.q + 1, r: figure.position.r, s: figure.position.s - 1 },
                { q: figure.position.q, r: figure.position.r + 1, s: figure.position.s - 1 },
                { q: figure.position.q - 1, r: figure.position.r, s: figure.position.s + 1 },
                { q: figure.position.q - 1, r: figure.position.r + 1, s: figure.position.s },
            ];
        },
        "bishop": () => {
            return [];
        },
        "rook": () => {
            return [];
        },
        "knight": () => {
            return [];
        },
        "pawn": () => {
            return [];
        },
        "queen": () => {
            return [];
        },
    }

    return possibleMoves[figure.type]();
}

export const GameEngine = () => {
    const [ selectedPiece, setSelectedPiece ] = React.useState<IHexaChessFigure | null>(null);

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

        { type: "king", color: "white", position: { q: -1, r: -4, s: 5 } },
        { type: "queen", color: "white", position: { q: 1, r: -5, s: 4 } },
        { type: "rook", color: "white", position: { q: 3, r: -5, s: -2 } },
        { type: "rook", color: "white", position: { q: -3, r: -2, s: 5 } },
        { type: "bishop", color: "white", position: { q: 0, r: -5, s: 5 } },
        { type: "bishop", color: "white", position: { q: 0, r: -4, s: 4 } },
        { type: "bishop", color: "white", position: { q: 0, r: -3, s: 3 } },
        { type: "knight", color: "white", position: { q: -2, r: -3, s: 5 } },
        { type: "knight", color: "white", position: { q: 2, r: -5, s: 3 } },
        { type: "pawn", color: "white", position: { q: -4, r: -1, s: 5 } },
        { type: "pawn", color: "white", position: { q: -3, r: -1, s: 4 } },
        { type: "pawn", color: "white", position: { q: -2, r: -1, s: 3 } },
        { type: "pawn", color: "white", position: { q: -1, r: -1, s: 2 } },
        { type: "pawn", color: "white", position: { q: 0, r: -1, s: 1 } },
        { type: "pawn", color: "white", position: { q: 1, r: -2, s: 1 } },
        { type: "pawn", color: "white", position: { q: 2, r: -3, s: 1 } },
        { type: "pawn", color: "white", position: { q: 3, r: -4, s: 1 } },
        { type: "pawn", color: "white", position: { q: 4, r: -5, s: 1 } },
    ];    

    return(
        <div
            data-testid={testIds.frame}
        >
            <Board highlightTiles={getMovableTiles(selectedPiece)}/>
            <Pieces figures={pieces} onFigureClick={setSelectedPiece}/>
        </div>
    );
}