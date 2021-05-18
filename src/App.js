// import React, { useRef, useState } from "react";
// import Xarrow from "react-xarrows";
// import Draggable from "react-draggable";
// import "./Styles/App.scss";

// const connectPointStyle = {
//   zIndex: 1,
//   position: "absolute",
//   width: 15,
//   height: 15,
//   borderRadius: "50%",
//   background: "black",
// };
// const connectPointOffset = {
//   left: { left: 0, top: "50%", transform: "translate(-50%, -50%)" },
//   right: { left: "100%", top: "50%", transform: "translate(-50%, -50%)" },
//   top: { left: "50%", top: 0, transform: "translate(-50%, -50%)" },
//   bottom: { left: "50%", top: "100%", transform: "translate(-50%, -50%)" },
// };

// const ConnectPointsWrapper = ({ boxId, handler, dragRef, boxRef }) => {
//   const ref1 = useRef();

//   const [position, setPosition] = useState({});
//   const [beingDragged, setBeingDragged] = useState(false);
//   return (
//     <React.Fragment>
//       <div
//         className="connectPoint"
//         style={{
//           ...connectPointStyle,
//           ...connectPointOffset[handler],
//           ...position,
//         }}
//         draggable
//         onMouseDown={e => e.stopPropagation()}
//         onDragStart={e => {
//           setBeingDragged(true);
//           e.dataTransfer.setData("arrow", boxId);
//         }}
//         onDrag={e => {
//           const { offsetTop, offsetLeft } = boxRef.current;
//           const { x, y } = dragRef.current.state;
//           setPosition({
//             position: "fixed",
//             left: e.clientX - x - offsetLeft,
//             top: e.clientY - y - offsetTop,
//             transform: "none",
//             opacity: 0,
//           });
//         }}
//         ref={ref1}
//         onDragEnd={e => {
//           setPosition({});
//           setBeingDragged(false);
//         }}
//       />
//       {beingDragged ? <Xarrow start={boxId} end={ref1} /> : null}
//     </React.Fragment>
//   );
// };

// const boxStyle = {
//   border: "1px solid black",
//   position: "relative",
//   padding: "20px 10px",
// };

// const Box = ({ text, handler, addArrow, setArrows, boxId }) => {
//   const dragRef = useRef();
//   const boxRef = useRef();
//   return (
//     <Draggable
//       ref={dragRef}
//       onDrag={e => {
//         // console.log(e);
//         setArrows(arrows => [...arrows]);
//       }}
//     >
//       <div
//         id={boxId} // comes from the props
//         ref={boxRef}
//         style={boxStyle}
//         onDragOver={e => e.preventDefault()}
//         onDrop={e => {
//           if (e.dataTransfer.getData("arrow") === boxId) {
//             console.log(e.dataTransfer.getData("arrow"), boxId);
//           } else {
//             const refs = { start: e.dataTransfer.getData("arrow"), end: boxId };
//             addArrow(refs);
//             console.log("droped!", refs);
//           }
//         }}
//       >
//         {text}
//         <ConnectPointsWrapper {...{ boxId, handler, dragRef, boxRef }} />
//       </div>
//     </Draggable>
//   );
// };

// export default function App() {
//   const [arrows, setArrows] = useState([]);
//   const [boxes, setBoxes] = useState([]);
//   const addArrow = ({ start, end }) => {
//     setArrows([...arrows, { start, end }]);
//   };
//   return (
//     <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//       {/* two boxes */}
//       {/* {boxes.map((box, i) => (
//         <Box
//           text={`q${i}`}
//           {...{ addArrow, setArrows, handler: "right", boxId: `box2_${i + 1}` }}
//         />
//       ))} */}
//       <Box
//         text="drag my handler to second element"
//         addArrow={addArrow}
//         {...{ addArrow, setArrows, handler: "right", boxId: "box2_1" }}
//       />
//       <Box
//         text="second element"
//         addArrow={addArrow}
//         {...{ addArrow, setArrows, handler: "left", boxId: "box2_2" }}
//       />
//       <Box
//         text="third element"
//         addArrow={addArrow}
//         {...{ addArrow, setArrows, handler: "left", boxId: "box2_3" }}
//       />
//       {arrows.map(ar => (
//         <Xarrow
//           start={ar.start}
//           end={ar.end}
//           key={ar.start + "-." + ar.start}
//         />
//       ))}
//     </div>
//   );
// }

import React from "react";
import DiagramApp from "./Components/DiagramApp";
import Nav from "./Components/Nav";
import "./Styles/App.scss";

const App = () => {
  return (
    <div>
      <Nav />
      <DiagramApp />
    </div>
  );
};

export default App;
