import React, { ReactElement } from "react";
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from "react-hexgrid";
import "./board.css";
import { ReactSVG } from "react-svg";
import {
    IBoardProps,
    IFiguresBoardProps,
    IHexaChessPiece,
    IHexaChessPosition,
    IHexaChessTile,
    TileType,
} from "../../interfaces/hexachess";

export const testId = "board";

const highlightTilesContains = (position: IHexaChessPosition, tiles: IHexaChessTile[]): TileType | undefined => {
    return tiles.find(
        (tile) => tile.position.q === position.q && tile.position.r === position.r && tile.position.s === position.s
    )?.type ?? "none";
};

export const CreateHexagons = (props: {
    boardSize: number;
    highlightTiles: IHexaChessTile[];
    setSelectedPiece: (figure: IHexaChessPiece | null) => void;
    selectedPiece: IHexaChessPiece | null;
    pieces: IHexaChessPiece[];
}): ReactElement[] => {

    // TODO: this function should probably be moved to the game engine
    const onTileClick = (event: any, source: any) => {
        if (source.props.className === "tile-possibleMove" && props.selectedPiece) {
            props.selectedPiece.position = { q: source.props.q, r: source.props.r, s: source.props.s };
        }
        else if (source.props.className === "tile-possibleAttack" && props.selectedPiece) {
            // find the opponent piece and remove it from the board
            const enemyPiece = props.pieces.find(
                (piece) => piece.position.q === source.props.q && piece.position.r === source.props.r && piece.position.s === source.props.s
            );
            if (enemyPiece) props.pieces.splice(props.pieces.indexOf(enemyPiece), 1);
            props.selectedPiece.position = { q: source.props.q, r: source.props.r, s: source.props.s };
        }
        props.setSelectedPiece(null);
    };

    let res: ReactElement[] = [];

    for (let q = -props.boardSize; q <= props.boardSize; q++) {
        for (let s = -props.boardSize; s <= props.boardSize; s++) {
            for (let r = -props.boardSize; r <= props.boardSize; r++) {
                if (q + r + s === 0) {
                    const tileMark = highlightTilesContains({ q, r, s }, props.highlightTiles);
                    res.push(
                        <Hexagon
                            q={q}
                            r={r}
                            s={s}
                            key={`${q}${r}${s}`}
                            className={`tile-${tileMark}`}
                            onClick={onTileClick}
                        />
                    );
                }
            }
        }
    }

    return res;
};

export const Board = (props: IBoardProps) => {
    return (
        <div
            data-testid="board"
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
            }}
        >
            <HexGrid
                style={{
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.05} origin={{ x: 0, y: 0 }}>
                    {CreateHexagons({
                        boardSize: props.boardSize ?? 5,
                        highlightTiles: props.highlightTiles ?? [],
                        setSelectedPiece: props.setSelectedPiece,
                        selectedPiece: props.selectedPiece,
                        pieces: props.pieces,
                    })}
                </Layout>
            </HexGrid>
        </div>
    );
};

export const Pieces = (props: IFiguresBoardProps) => {
    const onFigureClick = (event: any, source: any) => {
        props.onFigureClick(source.props.data);
    };

    const generatePiecePositions = (): ReactElement[] => {
        return props.figures.map((figure, index) => {
            return (
                <Hexagon
                    q={figure.position.q}
                    r={figure.position.r}
                    s={figure.position.s}
                    key={index}
                    fill={`${figure.type}-${figure.color}`}
                    className="piece"
                    id={figure.color !== props.player.color ? "opponent" : "player"}
                    data={figure}
                    onClick={onFigureClick}
                />
            );
        });
    };

    return (
        <div
            data-testid="figures"
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                overflow: "hidden",
                pointerEvents: "none",
            }}
        >
            <HexGrid
                style={{
                    width: "100%",
                    height: "100vh",
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.05} origin={{ x: 0, y: 0 }} className="board">
                    <>{generatePiecePositions()}</>
                    <Pattern
                        id="king-black"
                        link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="queen-black"
                        link="https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="rook-black"
                        link="https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="bishop-black"
                        link="https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="knight-black"
                        link="https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="pawn-black"
                        link="https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="king-white"
                        link="https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="queen-white"
                        link="https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="rook-white"
                        link="https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="bishop-white"
                        link="https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="knight-white"
                        link="https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                    <Pattern
                        id="pawn-white"
                        link="https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
                        size={{ x: 5, y: 5 }}
                    />
                </Layout>
            </HexGrid>
        </div>
    );
};
