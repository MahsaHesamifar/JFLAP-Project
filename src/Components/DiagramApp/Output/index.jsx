import React, { useState, useEffect } from "react";

const Output = ({
  dfaAutomataState,
  alphabet,
  transitionTable,
  finalStates,
  startState,
}) => {
  let obj;
  const transitionTableHandler = () => {
    // let string = JSON.stringify(transitionTable);
    // obj = JSON.parse(string);
  };
  return (
    <>
      {/* {dfaAutomataState} */}
      <ul className="output-ul">
        <li className="output-li" id="alphabet">
          <h2 className="header">Alphabet:</h2>
          <p className="output-p">{alphabet}</p>
        </li>
        <li className="output-li" id="transition-table">
          <h2 className="header">transition Table:</h2>
          <p className="output-p">{JSON.stringify(transitionTable)}</p>
        </li>

        <li className="output-li" id="final-states">
          <h2 className="header">Final States:</h2>
          <p className="output-p">{finalStates}</p>
        </li>
        <li className="output-li" id="start-state">
          <h2 className="header">start State:</h2>
          <p className="output-p">{startState}</p>
        </li>
      </ul>
    </>
  );
};

export default Output;
