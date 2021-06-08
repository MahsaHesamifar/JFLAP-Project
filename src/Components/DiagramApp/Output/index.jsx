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
      {dfaAutomataState}
      <ul>
        <li>
          <h2>Alphabet:</h2>
          {/* {console.log(JSON.parse(dfaAutomataState))} */}
          <p>{alphabet}</p>
        </li>
        <li>
          <h2>transition Table:</h2>
          <p>{JSON.stringify(transitionTable)}</p>
          {/* <p>{JSON.stringify(obj)}</p> */}
        </li>

        <li>
          <h2>Final States:</h2>
          <p>{finalStates}</p>
        </li>
        <li>
          {" "}
          <h2>start State:</h2>
          <p>{startState}</p>
        </li>
      </ul>
    </>
  );
};

export default Output;
