import React, { ReactElement } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import './board.css';
import { ReactSVG } from 'react-svg';
import { IFiguresBoardProps } from '../../interfaces/hexachess';

export const testId = 'board';

export const CreateHexagon = (props: { boardSize: number }): ReactElement[] => {
    let res: ReactElement[] = [];

    for (let q = -props.boardSize; q <= props.boardSize; q++) {
        for (let s = -props.boardSize; s <= props.boardSize; s++) {
            for (let r = -props.boardSize; r <= props.boardSize; r++) {
                if (q + r + s === 0) {
                    res.push(<Hexagon q={q} r={r} s={s} key={`${q}${r}${s}`} className='piece'/>);
                }
            }
        }
    }

    return res;
}

export const Board = (props: { boardSize?: number }) => {
    return(
        <div 
            data-testid='board'
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
            }}
        >
            <HexGrid style={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
            }}>
                <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>
                    {CreateHexagon({ boardSize: props.boardSize ?? 5})}
                </Layout>
            </HexGrid>
        </div>
    );
};

export const Pieces = (props: IFiguresBoardProps) => {
    const generatePiecePositions = (): ReactElement[] => {
        return props.figures.map((figure, index) => {
            return (
                <Hexagon
                    q={figure.position.q} 
                    r={figure.position.r} 
                    s={figure.position.s} 
                    key={index} 
                    fill={`${figure.type}-${figure.color}`} 
                    className='piece'
                />
            );
        });
    };

    return (
        <div
            data-testid='figures'
            style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        >
            <HexGrid style={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                pointerEvents: 'none'
            }}>
                <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }} className='board'>
                    <>
                        {generatePiecePositions()}
                    </>
                    <Pattern id="king-black" link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" size={{x: 5, y: 5}}/>
                    <Pattern id="queen-black" link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" size={{x: 5, y: 5}}/>
                    <Pattern id="rook-black" link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" size={{x: 5, y: 5}}/>
                    <Pattern id="pawn-black" link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" size={{x: 5, y: 5}}/>
                    <Pattern id="knight-black" link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" size={{x: 5, y: 5}}/>
                    <Pattern id="bishop-black" link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" size={{x: 5, y: 5}}/>
                </Layout>
            </HexGrid>
        </div>
    );
}