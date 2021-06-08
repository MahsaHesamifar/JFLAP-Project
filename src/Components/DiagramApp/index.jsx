import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import StateList from "./StateList";
// import axios from "axios";
import Output from "./Output";

const DiagramApp = () => {
  //states:
  const [states, setStates] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [automata, setAutomata] = useState({});
  const [dfaAutomataState, setDfaAutomataState] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [alphabet, setAlphabet] = useState([]);
  const [transitionTable, setTransitionTable] = useState([]);

  // globalVariables
  var serverAlphabet;
  var serverTransitionTable = [];
  //useEffect:
  useEffect(() => {
    addAutomata();
    // console.log(automata);
  }, [arrows, states]);

  const onAddState = circle => {
    //creating a circle(state)
    setStates([...states, circle]);
    // console.log(states);
    // console.log(arrows);
  };
  const addAutomata = () => {
    let newArrows = [];
    let alphabet = [];
    let transitionTable = [];
    let end = [];
    let stateName = "";
    // let transition = [];
    let startState = "";
    let finalState = [];
    // creating the newArrows array(with stateNames instead of state.ids):
    for (let i = 0; i < arrows.length; i++) {
      for (let j = 0; j < states.length; j++) {
        if (arrows[i].start === `${states[j].id}`) {
          for (let k = 0; k < states.length; k++) {
            if (arrows[i].end === `${states[k].id}`) {
              newArrows = [
                ...newArrows,
                {
                  start: states[j].stateName,
                  label: arrows[i].label,
                  end: states[k].stateName,
                },
              ];
              // console.log(newArrows);
            }
          }
        }
      }
    }
    newArrows.map(arrow => {
      // alphabets and transitions:
      if (!alphabet.includes(arrow.label)) {
        alphabet = [...alphabet, arrow.label];
        for (let i = 0; i < transitionTable.length; i++) {
          transitionTable[i].transition = alphabet;
        }
        // for (let j in alphabet) {
        //   // setting the "*" transition in the last index of alphabet
        //   if (alphabet[j] === "*") {
        //     let temp;
        //     let lastIndex = alphabet.length - 1;
        //     temp = alphabet[j];
        //     alphabet[j] = alphabet[lastIndex];
        //     alphabet[lastIndex] = temp;
        //   }
        // }
      }

      // transitionTable:
      let found = false;
      stateName = arrow.start;

      // checking if an element with the same stateName exist in transitionTable:
      for (let i = 0; i < transitionTable.length; i++) {
        if (transitionTable[i].stateName === arrow.start) {
          found = true;
          // end = [...end, arrow.end];

          for (let j in transitionTable[i].transition) {
            if (arrow.label === transitionTable[i].transition[j]) {
              if (transitionTable[i].end[j] === undefined) {
                transitionTable[i].end[j] = `${arrow.end}`;
              } else {
                transitionTable[i].end[j] =
                  `${transitionTable[i].end[j]}` + `${arrow.end}`;
              }
            }
          }
          // transitionTable[i].end = [
          //   `${transitionTable[i].end}` + `${arrow.end}`,
          // ];

          break;
        }
      }
      if (!found) {
        // if the stateName doesn't exist add another obj to transitionTable
        transitionTable = [
          ...transitionTable,
          {
            stateName,
            transition: alphabet,
            end: [...end, arrow.end],
            // end: [...end, state[parseFloat(arrow.end)].stateName],
          },
        ];
      }
      // }
      return null;
    });

    states.map(state => {
      if (state.initial) {
        startState = `${state.stateName}`;
      }
      if (state.final) {
        finalState = [...finalState, state.stateName];
      }
      setAutomata({
        alphabet,
        transitionTable,
        startState,
        finalState,
      });
      return null;
    });
  };
  const connectToDatabase = async () => {
    console.log("clicked");
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8000/automata/new-automata");
    ajax.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    //post json
    ajax.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 201) {
          console.log(this.responseText); //print json on console
        } else if (this.status === 404) {
          console.log(this.responseText);
          console.log("not found"); //if can not found json
        }
      }
    };
    ajax.send(JSON.stringify(automata));
  };
  const minimize = async () => {
    // try {
    let ajax1 = new XMLHttpRequest();
    //get json
    ajax1.open("GET", "http://localhost:8000/automata/minimize");
    ajax1.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          console.log(this.responseText); //print json on console

          setDfaAutomataState(this.responseText);

          // dfaAutomataState = JSON.parse(this.responseText).dfaAutomata;
        } else if (this.status === 404) {
          console.log("not found"); //if can not found json
        }
      }
    };
    ajax1.send();
    setShowOutput(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const getfromDatabase = async () => {
    // try {
    let ajax1 = new XMLHttpRequest();
    //get json
    ajax1.open("GET", "http://localhost:8000/automata/nfa2dfa");
    ajax1.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          console.log(JSON.parse(ajax1.responseText));
          setDfaAutomataState(this.responseText);
          var dfaAutomataObj = JSON.parse(ajax1.responseText).dfaAutomata;
          //alphabet
          serverAlphabet = dfaAutomataObj.alphabet;
          setAlphabet(serverAlphabet);
          //transitionTable
          // setTransitionTable([{ stateName: "" }]);
          // for (let i in dfaAutomataObj.transitionTable) {
          //   let eachTransitionTable = {};
          //   // serverTransitionTable[i].stateName = JSON.parse(ajax1.responseText).dfaAutomata.transitionTable[i].stateName;
          //   console.log(dfaAutomataObj.transitionTable[i].stateName);
          //   eachTransitionTable.stateName =
          //     dfaAutomataObj.transitionTable[i].stateName;
          //   // serverTransitionTable[i].transition = JSON.parse(ajax1.responseText).dfaAutomata.transitionTable[i].transition;

          //   serverTransitionTable[i] = eachTransitionTable;
          //   setTransitionTable([...transitionTable, serverTransitionTable[i]]);

          //   console.log(serverTransitionTable[i]);
          // }
          // console.log(transitionTable);

          // dfaAutomataObj.transitionTable.map((element, i) => {
          //   let eachTransitionTable = {};
          //   eachTransitionTable.stateName = element.stateName;
          //   serverTransitionTable[i] = eachTransitionTable;
          //   // setTransitionTable([...transitionTable, serverTransitionTable[i]]);
          // });
          // setTransitionTable(serverTransitionTable);

          // setTransitionTable(serverTransitionTable);
        } else if (this.status === 404) {
          console.log("not found"); //if can not found json
        }
      }
    };
    ajax1.send();
    setShowOutput(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const refreshDatabase = async () => {
    console.log("refresh");
    let ajax1 = new XMLHttpRequest();
    //get json
    ajax1.open("GET", "http://localhost:8000/automata/delete-automata");
    ajax1.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          console.log(this.responseText); //print json on console
        } else if (this.status === 404) {
          console.log("not found"); //if can not found json
        }
      }
    };
    ajax1.send();
  };
  return (
    <div className="diagram-container">
      <Toolbar onSubmit={onAddState} states={states} />
      <div className="backend-btns">
        <button className="refresh-btn" onClick={refreshDatabase}>
          refresh
        </button>
        <button className="connect-database-btn" onClick={connectToDatabase}>
          send
        </button>
        <button className="get-btn" onClick={minimize}>
          Minimize
        </button>
        <button className="get-btn" onClick={getfromDatabase}>
          nfa to dfa
        </button>
      </div>
      {/* {console.log(showOutput)} */}
      {/* <Output dfaAutomataState={dfaAutomataState} showOutput={showOutput} /> */}
      {showOutput ? (
        <div className="server-response">
          {/* {console.log(serverAlphabet)} */}
          {/* <div className="msg">ggg{serverResponse}ggg</div> */}
          <Output
            dfaAutomataState={dfaAutomataState}
            alphabet={alphabet}
            transitionTable={transitionTable}
          />
        </div>
      ) : // <Output dfaAutomataState={dfaAutomataState} />
      //
      null}
      {/* <Output className={showOutput ? "Output-container" : ""} /> */}
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
