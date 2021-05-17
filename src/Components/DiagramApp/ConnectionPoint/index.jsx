import React, { useRef, useState } from "react";
import Xarrow from "react-xarrows";

const ConnectionPoint = () => {
  return <div>this is ConnectionPoint</div>;
};

export default ConnectionPoint;

// import React, { useRef, useState } from "react";
// import Xarrow from "react-xarrows";

// const ConnectionPoint = ({ stateId, dragRef, stateRef }) => {
//   const ref1 = useRef();

//   const [positon, setPosition] = useState({});
//   const [beingDragged, setBeingDragged] = useState(false);
//   return (
//     <div
//       className="connection-point"
//       draggable
//       onMouseDown={e => e.stopPropagation()}
//       onDragStart={e => {
//         setBeingDragged(true);
//         e.dataTransfer.setData("arrow", stateId);
//       }}
//       onDrag={e => {
//         const { offsetTop, offsetLeft } = stateRef.current;
//         const { x, y } = dragRef.current.state;
//         setPosition({
//           position: "fixed",
//           left: e.clientX - x - offsetLeft,
//           top: e.clientY - y - offsetTop,
//           transform: "none",
//           opacity: 0,
//         });
//       }}
//       ref={ref1}
//       onDragEnd={e => {
//         setPosition({});
//         setBeingDragged(false);
//       }}
//     >
//       {beingDragged ? <Xarrow start={stateId} end={ref1} /> : null}
//     </div>
//   );
// };

// export default ConnectionPoint;
