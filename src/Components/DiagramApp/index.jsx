import React, { useState } from "react";
import Toolbar from "./Toolbar";
import StateList from "./StateList";

const DiagramApp = () => {
  //states:
  const [states, setStates] = useState([]);
  //event handlers:
  const onAddState = circle => {
    //creating a circle(state)
    setStates([...states, circle]);
  };

  return (
    <div className="diagram-container">
      <Toolbar onSubmit={onAddState} states={states} />
      <StateList states={states} setStates={setStates} />
      {/* {console.log(arrows)} */}
    </div>
  );
};

export default DiagramApp;
