import React, { useRef } from "react";
import Draggable from "react-draggable";
import ConnectionPoint from "../ConnectionPoint";

const State = ({ states, setStates, state, addArrow, setArrows, stateId }) => {
  const dragRef = useRef();
  const stateRef = useRef();
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
              // the start and end are the same state
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
          <li className={state.initial ? "double-border" : "single-border"}>
            {state.stateName}

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
