import React, { useState, useEffect } from "react";

const Output = ({
  dfaAutomataState,
  alphabet,
  transitionTable,
  finalStates,
  startState,
}) => {
  return (
    <>
      {/* {dfaAutomataState} */}
      <ul className="output-ul">
        <li className="output-li" id="alphabet">
          <h2 className="header">Alphabet:</h2>
          <p className="output-p">
            {alphabet.map((eachAlphabet, i) => {
              let spacing = "";
              if (i < alphabet.length - 1) {
                spacing = ", ";
              }
              if (eachAlphabet === "") {
                spacing = "";
              }
              return (
                <>
                  <span key={i}>
                    {eachAlphabet}
                    {spacing}
                  </span>
                </>
              );
            })}
          </p>
        </li>
        <li className="output-li" id="transition-table">
          <h2 className="header">Transition Table:</h2>
          {/* <p className="output-p">{JSON.stringify(transitionTable)}</p> */}
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th className="middle-th">transitions</th>
                <th>end states</th>
              </tr>
            </thead>
            <tbody>
              {transitionTable.map((element, i) => {
                return (
                  <>
                    <tr key={i}>
                      <td>{element.stateName}</td>
                      <td>
                        {element.transition.map((eachTransition, j) => {
                          let spacing = "";
                          if (j < element.transition.length - 1) {
                            spacing = ", ";
                          }
                          if (eachTransition === "") {
                            spacing = "";
                          }
                          return (
                            <>
                              <span key={j}>
                                {eachTransition}
                                {spacing}
                              </span>
                            </>
                          );
                        })}
                      </td>
                      <td>
                        {element.end.map((eachEnd, j) => {
                          let spacing = "";
                          if (j < element.end.length - 1) {
                            spacing = ", ";
                          }
                          if (eachEnd === "") {
                            spacing = "";
                          }
                          return (
                            <>
                              <span key={j}>
                                {eachEnd}
                                {spacing}
                              </span>
                            </>
                          );
                        })}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </li>

        <li className="output-li" id="final-states">
          <h2 className="header">Final States:</h2>
          <p className="output-p">
            {finalStates.map((eachFinal, i) => {
              let spacing = "";
              if (i < finalStates.length - 1) {
                spacing = ", ";
              }
              if (eachFinal === "") {
                spacing = "";
              }
              return (
                <>
                  <span key={i}>
                    {eachFinal}
                    {spacing}
                  </span>
                </>
              );
            })}
          </p>
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
