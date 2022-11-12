import React from "react";
import "./styles.css";

const sin60 = 2 / Math.sqrt(3);
const r = 100;

// const Hex = () => {
//   return <Hexagon className="hexagon" style={{ stroke: "orange" }} />;
// };

const Hex = (props: any) => {
  const { A, B, side = "", ...divProps } = props;

  return (
    <div
      {...divProps}
      className={`hex ${side}`}
      style={{
        //border: "1px solid #000",
        boxSizing: "border-box",
        height: "100px",
        width: "100px",
        ...props.style,
        position: "relative",
        borderRadius: "100%"
      }}
    >
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          transform: "rotate(90deg)"
        }}
      />
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          transform: "rotate(150deg)",
          transformOrigin: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      />
      <div
        style={{
          borderTop: "1px solid #000",
          borderBottom: "1px solid #000",
          boxSizing: "border-box",
          width: 100 / Math.sqrt(3) + "px",
          height: "100%",
          margin: "0 auto",
          transform: "rotate(210deg)",
          transformOrigin: "center center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}
      />
    </div>
  );
};
function createBoard() {
  const rosLengthList = [6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6];

  return rosLengthList.map((length) => new Array(length).fill(0));
}

function put(board: any, rowIndex: any, cellIndex: any, side: any) {
  const newBoard = board.map((row: any) => [...row]);
  newBoard[rowIndex][cellIndex] = side;
  return newBoard;
}

function changeSide(side: any) {
  return side === "A" ? "B" : "A";
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case "put":
      return {
        ...state,
        board: put(
          state.board,
          action.payload.rowIndex,
          action.payload.cellIndex,
          state.currentSide
        ),
        currentSide: changeSide(state.currentSide)
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    board: createBoard(),
    currentSide: "A"
  });

  return (
    <div className="App" style={{ width: "1100px", marginTop: "100px" }}>
      <div style={{
        transform: "rotate(30deg)"
      }}>
        {state.board.map((row: any, rowIndex: any) => {
          return (
            <div
              style={{
                marginTop: "-14px",
                display: "flex",
                justifyContent: "center"
              }}
            >
              {row.map((side: any, cellIndex: any) => (
                <Hex
                  side={side}
                  style={{ height: `${r}px`, width: `${r}px` }}
                  onClick={() =>
                    dispatch({
                      type: "put",
                      payload: { rowIndex, cellIndex }
                    })
                  }
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
