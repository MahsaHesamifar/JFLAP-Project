import React, { useRef, useState } from "react";
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
  labelList,
}) => {
  const dragRef = useRef();
  const stateRef = useRef();
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
