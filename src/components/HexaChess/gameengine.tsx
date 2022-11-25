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
    frame: "frame",
};

const boardSize = 5;

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

const getMovableTiles = (figure: IHexaChessFigure | null): IHexaChessPosition[] | undefined => {
    const directionalMove = (piece: IHexaChessFigure, dir: IHexaChessPosition): IHexaChessPosition[] => {
        const res = [];
        for (let i = 1; i < boardSize * 2; i++) {
            const newPos = {
                q: piece.position.q + dir.q * i,
                r: piece.position.r + dir.r * i,
                s: piece.position.s + dir.s * i,
            };
            if (filterBlockedTiles([newPos], pieces).length === 0) {
                break;
            }
            res.push(newPos);
        }
        return res;
    };

    const diagonalMoves = (figure: IHexaChessFigure) => [
        ...directionalMove(figure, { q: 1, r: -2, s: 1 }),
        ...directionalMove(figure, { q: 2, r: -1, s: -1 }),
        ...directionalMove(figure, { q: 1, r: -2, s: 1 }),
        ...directionalMove(figure, { q: -1, r: -1, s: 2 }),
        ...directionalMove(figure, { q: -2, r: 1, s: 1 }),
        ...directionalMove(figure, { q: -1, r: -1, s: 2 }),
    ];

    const straightMoves = (figure: IHexaChessFigure) => [
        ...directionalMove(figure, { q: 1, r: -1, s: 0 }),
        ...directionalMove(figure, { q: 0, r: -1, s: 1 }),
        ...directionalMove(figure, { q: -1, r: 0, s: 1 }),
        ...directionalMove(figure, { q: -1, r: 1, s: 0 }),
        ...directionalMove(figure, { q: 0, r: 1, s: -1 }),
        ...directionalMove(figure, { q: 1, r: 0, s: -1 }),
    ];

    if (!figure) return undefined;

    const possibleMoves: Record<pieceTypes, IHexaChessPosition[]> = {
        king: filterBlockedTiles(
            [
                {
                    q: figure.position.q,
                    r: figure.position.r - 1,
                    s: figure.position.s + 1,
                },
                {
                    q: figure.position.q + 1,
                    r: figure.position.r - 1,
                    s: figure.position.s,
                },
                {
                    q: figure.position.q + 1,
                    r: figure.position.r,
                    s: figure.position.s - 1,
                },
                {
                    q: figure.position.q,
                    r: figure.position.r + 1,
                    s: figure.position.s - 1,
                },
                {
                    q: figure.position.q - 1,
                    r: figure.position.r,
                    s: figure.position.s + 1,
                },
                {
                    q: figure.position.q - 1,
                    r: figure.position.r + 1,
                    s: figure.position.s,
                },
            ],
            pieces
        ),
        bishop: diagonalMoves(figure),
        rook: straightMoves(figure),
        knight: filterBlockedTiles(
            [
                {
                    q: figure.position.q + 2,
                    r: figure.position.r - 3,
                    s: figure.position.s + 1,
                },
                {
                    q: figure.position.q + 3,
                    r: figure.position.r - 2,
                    s: figure.position.s - 1,
                },
                {
                    q: figure.position.q + 3,
                    r: figure.position.r - 1,
                    s: figure.position.s - 2,
                },
                {
                    q: figure.position.q + 2,
                    r: figure.position.r + 1,
                    s: figure.position.s - 3,
                },
                {
                    q: figure.position.q + 1,
                    r: figure.position.r + 2,
                    s: figure.position.s - 3,
                },
                {
                    q: figure.position.q - 1,
                    r: figure.position.r + 3,
                    s: figure.position.s - 2,
                },
                {
                    q: figure.position.q - 2,
                    r: figure.position.r + 3,
                    s: figure.position.s - 1,
                },
                {
                    q: figure.position.q - 3,
                    r: figure.position.r + 2,
                    s: figure.position.s + 1,
                },
                {
                    q: figure.position.q - 3,
                    r: figure.position.r + 1,
                    s: figure.position.s + 2,
                },
                {
                    q: figure.position.q - 2,
                    r: figure.position.r - 1,
                    s: figure.position.s + 3,
                },
                {
                    q: figure.position.q - 1,
                    r: figure.position.r - 2,
                    s: figure.position.s + 3,
                },
                {
                    q: figure.position.q + 1,
                    r: figure.position.r - 3,
                    s: figure.position.s + 2,
                },
            ],
            pieces
        ),
        pawn: [
            {
                q: figure.position.q,
                r: figure.position.r + (figure.color === "white" ? 1 : -1),
                s: figure.position.s + (figure.color === "white" ? -1 : 1),
            },
        ],
        queen: [...diagonalMoves(figure), ...straightMoves(figure)],
    };

    return possibleMoves[figure.type];
};

const filterBlockedTiles = (
    tiles: IHexaChessPosition[] | undefined,
    pieces: IHexaChessFigure[] | undefined
): IHexaChessPosition[] => {
    if (!tiles || !pieces) return [];

    return tiles.filter((tile) => {
        return !pieces.some((figure) => {
            return figure.position.q === tile.q && figure.position.r === tile.r && figure.position.s === tile.s;
        });
    });
};

export const GameEngine = () => {
    const [selectedPiece, setSelectedPiece] = React.useState<IHexaChessFigure | null>(null);

    return (
        <div data-testid={testIds.frame}>
            <Board
                highlightTiles={getMovableTiles(selectedPiece)}
                setSelectedPiece={setSelectedPiece}
                selectedPiece={selectedPiece}
            />
            <Pieces figures={pieces} onFigureClick={setSelectedPiece} />
        </div>
    );
};
