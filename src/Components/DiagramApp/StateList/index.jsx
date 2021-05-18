import React, { useState } from "react";
import State from "../State";
import Xarrow from "react-xarrows";

const StateList = props => {
  //refs:

  //states:
  const [arrows, setArrows] = useState([]);

  // const [, setRender] = useState({});
  // const forceRerender = () => setRender({});

  const addArrow = ({ start, end }) => {
    setArrows([
      ...arrows,
      {
        start,
        end,
      },
    ]);
  };

  return (
    <ul className="states-container">
      {props.states.map(state => {
        return (
          <>
            <State
              states={props.states}
              setStates={props.setStates}
              state={state}
              key={state.id}
              addArrow={addArrow}
              setArrows={setArrows}
              stateId={`${state.id}`}
              // {...{ addArrow, setArrows, stateId: `${state.id}` }}
            />
          </>
        );
      })}
      {arrows.map(arrow => {
        return (
          <Xarrow
            start={arrow.start}
            end={arrow.end}
            key={arrow.start + "-." + arrow.end}
            color={"#4ecdc4"}
            label={
              <div
                contentEditable
                suppressContentEditableWarning={true}
                style={{
                  font: "italic 1.5em serif",
                  color: "black",
                  outline: "none",
                }}
              >
                &lambda;
              </div>
            }
            headSize={5}
            strokeWidth={4}
          />
        );
      })}
    </ul>
  );
};

export default StateList;
