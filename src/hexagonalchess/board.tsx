import { ReactElement } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
import './board.css';

export const testId = 'board';

export const CreateHexagon = (props: { boardSize: number }): ReactElement[] => {
    let res: ReactElement[] = [];

    console.log("react rerendering");
    for (let q = -props.boardSize; q <= props.boardSize; q++) {
        for (let s = -props.boardSize; s <= props.boardSize; s++) {
            for (let r = -props.boardSize; r <= props.boardSize; r++) {
                if (q + r + s === 0) {
                    res.push(<Hexagon q={q} r={r} s={s} />);
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
                // transform: 'rotate(30deg)',
            }}>
                <Layout size={{ x: 5, y: 5 }} flat={true} spacing={1.0} origin={{ x: 0, y: 0 }}>
                    {CreateHexagon({ boardSize: props.boardSize ?? 5})}
                </Layout>
            </HexGrid>
        </div>
    );
};