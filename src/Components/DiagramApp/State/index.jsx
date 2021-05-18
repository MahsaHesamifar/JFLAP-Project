import React, { useRef } from "react";
import Draggable from "react-draggable";
import ConnectionPoint from "../ConnectionPoint";

const State = ({ states, setStates, state, stateId, addArrow, setArrows }) => {
  const dragRef = useRef(null);
  const stateRef = useRef(null);
  // console.log(props.circle1ref);

  // const stateId = stateId;
  return (
    <div>
      <Draggable
        ref={dragRef}
        onDrag={e => {
          // console.log(e);
          setArrows(arrows => [...arrows]);
        }}
      >
        <div
          className="state"
          id={stateId}
          ref={stateRef}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            if (e.dataTransfer.getData("arrow") === stateId) {
              console.log(e.dataTransfer.getData("arrow"), stateId);
            } else {
              const refs = {
                start: e.dataTransfer.getData("arrow"),
                end: stateId,
              };
              addArrow(refs);
              console.log("droped!", refs);
            }
          }}
        >
          <li className="double-border">
            {state.stateName}

            {/* <ConnectionPoint {...{ stateId, dragRef, stateRef }} /> */}
            <ConnectionPoint
              stateId={stateId}
              dragRef={dragRef}
              stateRef={stateRef}
            />
          </li>
        </div>
      </Draggable>
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
