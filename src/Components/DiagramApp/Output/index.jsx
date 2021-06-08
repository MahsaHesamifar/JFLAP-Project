import React, { useState, useEffect } from "react";

const Output = ({ dfaAutomataState, alphabet, transitionTable }) => {
  //states:
  // const [alphabet, setAlphabet] = useState([]);
  // let showOutput = false;
  // const blockerHandler = () => {
  //   console.log("blocker handle");
  //   showOutput = !showOutput;
  // };
  // let alphabet = [];
  // let finalStates = "";
  // let startState = [];
  // let transitionTable = {};
  // useEffect(() => {
  //   console.log("hahahahhaa");
  //   setAlphabet(JSON.parse(dfaAutomataState).dfaAutomata.alphabet);
  // }, [dfaAutomataState]);
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
        {/*
              <li>
                {" "}
                <h2>Alphabet:</h2>
                <p>{alphabet}</p>
              </li>
              <li>
                {" "}
                <h2>Alphabet:</h2>
                <p>{alphabet}</p>
              </li> */}
      </ul>
    </>
  );
};

export default Output;
