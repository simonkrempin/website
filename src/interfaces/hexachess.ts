export interface IFiguresBoardProps {
    figures: IHexaChessPiece[];
    onFigureClick: (figure: IHexaChessPiece) => void;
    player: IPlayer;
}

export interface IPlayer {
    name: string;
    color: "white" | "black";
}

export type pieceTypes = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export interface IHexaChessPiece {
    type: "king" | "queen" | "bishop" | "knight" | "rook" | "pawn";
    color: "white" | "black";
    position: IHexaChessPosition;
}

export interface IHexaChessPosition {
    q: number;
    r: number;
    s: number;
}

export interface IHexaChessTile {
    position: IHexaChessPosition;
    type: TileType;
}

export type TileType = "none" | "possibleMove" | "possibleAttack";

export interface IBoardProps {
    boardSize?: number;
    highlightTiles?: IHexaChessTile[];
    setSelectedPiece: (figure: IHexaChessPiece | null) => void;
    selectedPiece: IHexaChessPiece | null;
    pieces: IHexaChessPiece[];
}

// interface Array<T> {
//     contains(position: IHexaChessPosition): boolean;
// }

// if (!Array.prototype.contains) {
//     Array.prototype.contains = function (position: IHexaChessPosition) {
//         return this.some((item: IHexaChessPosition) => item.q === position.q && item.r === position.r && item.s === position.s);
//     };
// }