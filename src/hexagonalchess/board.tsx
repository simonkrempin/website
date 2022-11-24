import React, { ReactElement } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import './board.css';
import { ReactSVG } from 'react-svg';

export const testId = 'board';

export const CreateHexagon = (props: { boardSize: number }): ReactElement[] => {
    let res: ReactElement[] = [];

    for (let q = -props.boardSize; q <= props.boardSize; q++) {
        for (let s = -props.boardSize; s <= props.boardSize; s++) {
            for (let r = -props.boardSize; r <= props.boardSize; r++) {
                if (q + r + s === 0) {
                    res.push(<Hexagon q={q} r={r} s={s} key={`${q}${r}${s}`}/>);
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

export const Figures = () => {
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
                    <Hexagon q={0} r={5} s={-5} fill="king_b" className='piece' />
                    <Hexagon q={0} r={4} s={-4} fill="king_b" className='piece' />
                    <Hexagon q={0} r={3} s={-3} fill="king_b" className='piece' />
                    <Hexagon q={-1} r={5} s={-4} fill="king_b" className='piece' />
                    <Hexagon q={-2} r={5} s={-3} fill="king_b" className='piece' />
                    <Hexagon q={-3} r={5} s={-2} fill="king_b" className='piece' />
                    <Hexagon q={-4} r={5} s={-1} fill="king_b" className='piece' />
                    <Hexagon q={1} r={4} s={-5} fill="king_b" className='piece' />
                    <Hexagon q={2} r={3} s={-5} fill="king_b" className='piece' />
                    <Hexagon q={3} r={2} s={-5} fill="king_b" className='piece' />
                    <Hexagon q={4} r={1} s={-5} fill="king_b" className='piece' />
                    <Hexagon q={-3} r={4} s={-1} fill="king_b" className='piece' />
                    <Hexagon q={-2} r={3} s={-1} fill="king_b" className='piece' />
                    <Hexagon q={-1} r={2} s={-1} fill="king_b" className='piece' />
                    <Hexagon q={-0} r={1} s={-1} fill="king_b" className='piece' />
                    <Hexagon q={1} r={1} s={1} fill="king_b" className='piece' />
                    <Hexagon q={2} r={1} s={2} fill="king_b" className='piece' />
                    <Hexagon q={3} r={1} s={3} fill="king_b" className='piece' />
                    <Pattern id="king_b" link="https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg" size={{x: 5, y: 5}}/>
                </Layout>
            </HexGrid>
        </div>
    );
}