import React, { useState } from "react";
import State from "../State";
import Xarrow from "react-xarrows";

const StateList = props => {
  //refs:

  //states:

  //event handlers:
  const addArrow = ({ id, start, label, end }) => {
    props.setArrows([
      ...props.arrows,
      {
        id,
        start,
        label,
        end,
      },
    ]);
  };

  return (
    <ul className="states-container">
      {props.arrows.map((arrow, i) => {
        return (
          <Xarrow
            start={arrow.start}
            end={arrow.end}
            key={arrow.start + "-." + arrow.end}
            color={"#4ecdc4"}
            label={
              <form>
                <input
                  type="text"
                  maxLength="2"
                  defaultValue={"*"}
                  style={{
                    font: "italic 1.5em serif",
                    color: "black",
                    outline: "none",
                    backgroundColor: "white",
                    border: "none",
                    width: "50px",
                  }}
                  onChange={e => {
                    props.arrows[arrow.id].label = e.target.value;
                  }}
                />
              </form>
            }
            headSize={5}
            strokeWidth={4}
          />
        );
      })}
      {props.states.map(state => {
        return (
          <>
            <State
              states={props.states}
              setStates={props.setStates}
              state={state}
              key={state.id}
              addArrow={addArrow}
              setArrows={props.setArrows}
              stateId={`${state.id}`}
              // {...{ addArrow, setArrows, stateId: `${state.id}` }}
              arrows={props.arrows}
            />
          </>
        );
      })}
    </ul>
  );
};

export default StateList;
