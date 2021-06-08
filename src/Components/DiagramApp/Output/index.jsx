import React, { useState, useEffect } from "react";

const Output = ({ dfaAutomataState, showOutput }) => {
  //states:
  const [alphabet, setAlphabet] = useState([]);
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
  const convertToObj = () => {
    console.log("haha");
    // console.log(JSON.parse(dfaAutomataState));
    // alphabet = JSON.parse(dfaAutomataState).dfaAutomata.alphabet;
    // setAlphabet(JSON.parse(dfaAutomataState).dfaAutomata.alphabet);
    // finalStates = JSON.parse(dfaAutomataState).dfaAutomata.finalStates;
    // startState = JSON.parse(dfaAutomataState).dfaAutomata.startState;
    // transitionTable = JSON.parse(dfaAutomataState).dfaAutomata.transitionTable;

    // console.log(JSON.parse(dfaAutomataState));
  };
  return (
    <>
      <div
        // className={showOutput ? "output-container" : "hide"}
        className="output-container"
        id="output-container"
      >
        {convertToObj()}
        {/*    <div className="blocker" onClick={blockerHandler}></div>*/}
        <div className="output-msg">
          <h1>The OutPut</h1>
          <p>some description here!</p>
          <div className="output-diagram">
            {dfaAutomataState}
            <ul>
              <li>
                <h2>Alphabet:</h2>
                {/* {console.log(JSON.parse(dfaAutomataState))} */}
                <p>{alphabet}</p>
              </li>
              {/* <li>
                <h2>Alphabet:</h2>
                <p>{alphabet}</p>
              </li>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Output;
