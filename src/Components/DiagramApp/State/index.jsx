import React, { useRef } from "react";
import Draggable from "react-draggable";
import ConnectionPoint from "../ConnectionPoint";

const State = props => {
  return (
    <div>
      <Draggable>
        <div className="state">
          <li className="double-border">{props.state.stateName}</li>
        </div>
      </Draggable>
      {/* <ConnectionPoint /> */}
    </div>
  );
};

export default State;

// import React, { useRef } from "react";
// import Draggable from "react-draggable";
// import ConnectionPoint from "../ConnectionPoint";

// const State = props => {
//   const dragRef = useRef();
//   const stateRef = useRef();
//   return (
//     <Draggable
//       ref={dragRef}
//       onDrag={e => {
//         props.setArrows(arrows => [...arrows]);
//       }}
//     >
//       <div
//         className="state"
//         ref={stateRef}
//         onDragOver={e => e.preventDefault()}
//         onDrop={e => {
//           if (e.dataTransfer.getData("arrow") === props.state.id) {
//             console.log(e.dataTransfer.getData("arrow"), props.state.id);
//           } else {
//             const refs = {
//               start: e.dataTransfer.getData("arrow"),
//               end: props.state.id,
//             };
//             props.addArrow(refs);
//             console.log("droped!", refs);
//           }
//         }}
//       >
//         <li className="double-border">{props.state.stateName}</li>
//         <ConnectionPoint />
//       </div>
//     </Draggable>
//   );
// };

// export default State;
