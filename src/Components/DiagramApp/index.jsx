import React, { useState } from "react";
import Toolbar from "./Toolbar";
import StateList from "./StateList";

const DiagramApp = () => {
  //states:
  const [states, setStates] = useState([]);
  const [arrows, setArrows] = useState([]);

  //event handlers:
  const onAddState = circle => {
    //creating a circle(state)
    setStates([...states, circle]);

    console.log(states);

    console.log(arrows);
  };

  return (
    <div className="diagram-container">
      <Toolbar onSubmit={onAddState} states={states} />
      <StateList
        states={states}
        setStates={setStates}
        arrows={arrows}
        setArrows={setArrows}
      />
    </div>
  );
};

export default DiagramApp;
