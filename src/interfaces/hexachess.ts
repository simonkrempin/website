export interface IFiguresBoardProps {
    figures: IHexaChessFigure[];
}

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