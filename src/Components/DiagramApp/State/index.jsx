import React, { useRef } from "react";
import Draggable from "react-draggable";
import ConnectionPoint from "../ConnectionPoint";

const State = ({
  states,
  setStates,
  state,
  addArrow,
  setArrows,
  stateId,
  arrows,
}) => {
  const dragRef = useRef();
  const stateRef = useRef();

  let topPosition, leftPosition;

  topPosition = Math.ceil(stateId);
  leftPosition = Math.ceil(stateId);
  if (topPosition < 40) {
    topPosition = topPosition * 3;
  }
  if (leftPosition < 40) {
    leftPosition = leftPosition * 2;
  }
  while (topPosition > 60) {
    topPosition = topPosition / 4;
  }
  while (leftPosition > 90) {
    leftPosition = leftPosition / 2;
  }
  return (
    <div>
      <Draggable
        ref={dragRef}
        onDrag={e => {
          setArrows(arrows => [...arrows]);
        }}
      >
        <div
          className="state"
          style={{ top: `${topPosition}vh`, left: `${leftPosition}vw` }}
          id={stateId}
          ref={stateRef}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            if (e.dataTransfer.getData("arrow") === stateId) {
              // the start and end are the same state
              console.log(e.dataTransfer.getData("arrow"), stateId);
            } else {
              const refs = {
                id: arrows.length,
                start: e.dataTransfer.getData("arrow"),
                label: "*",
                end: stateId,
              };
              addArrow(refs);
            }
          }}
        >
          <div className={state.initial ? "is-initial" : "not-initial"}></div>
          <div className={state.final ? "double-border" : "single-border"}>
            {state.stateName}

            <ConnectionPoint
              stateId={stateId}
              dragRef={dragRef}
              stateRef={stateRef}
            />
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default State;
