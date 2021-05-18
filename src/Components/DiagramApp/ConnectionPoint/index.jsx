import React, { forwardRef, useRef, useState } from "react";
import Xarrow from "react-xarrows";

// const connectPointOffset = {
//   left: "100%",
//   top: "50%",
//   transform: "translate(-50%, -50%)",
// };

const ConnectionPoint = ({ stateId, dragRef, stateRef }) => {
  const ref1 = useRef();
  // const ref2 = useRef(null);
  // const stateRef = useRef(props.stateRef);
  // const dragRef = useRef(props.dragRef);

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);
  // ref1= props.circleref;

  return (
    <>
      {/* <div ref={ref1}>111111111111111111111111111111</div> */}
      {/* <div ref={ref2}>222222222222222222222222</div> */}
      <div
        className="connection-point"
        style={{
          // ...connectPointOffset,
          ...position,
        }}
        draggable
        onMouseDown={e => {
          e.stopPropagation();
        }}
        onDragStart={e => {
          console.log("onDragStart");
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", stateId);
        }}
        onDrag={e => {
          console.log("onDrag");
          const { offsetTop, offsetLeft } = stateRef.current;
          // const { offsetTop, offsetLeft } = ref.current;

          const { x, y } = dragRef.current.state;
          setPosition({
            position: "fixed",
            left: e.clientX - x - offsetLeft,
            top: e.clientY - y - offsetTop,
            transform: "none",
            opacity: 0,
          });
        }}
        ref={ref1}
        onDragEnd={e => {
          console.log("onDragEnd");
          setPosition({});
          setBeingDragged(false);
        }}
      >
        {beingDragged ? <Xarrow start={stateId} end={ref1} /> : null}
        {/* {beingDragged ? <Xarrow start={ref2} end={ref1} /> : null} */}

        {/* <Xarrow start={ref2} end={ref1} /> */}
      </div>
    </>
  );
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
