export interface IFiguresBoardProps {
    figures: IHexaChessFigure[];
    onFigureClick: (figure: IHexaChessFigure) => void;
}

export type pieceTypes = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export interface IHexaChessFigure {
    type: "king" | "queen" | "bishop" | "knight" | "rook" | "pawn";
    color: "white" | "black";
    position: IHexaChessPosition;
}

export interface IHexaChessPosition {
    q: number;
    r: number;
    s: number;
}

export interface IBoardProps {
    boardSize?: number;
    highlightTiles?: IHexaChessPosition[];
    setSelectedPiece: (figure: IHexaChessFigure | null) => void;
    selectedPiece: IHexaChessFigure | null;
}

// interface Array<T> {
//     contains(position: IHexaChessPosition): boolean;
// }

// if (!Array.prototype.contains) {
//     Array.prototype.contains = function (position: IHexaChessPosition) {
//         return this.some((item: IHexaChessPosition) => item.q === position.q && item.r === position.r && item.s === position.s);
//     };
// }