import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import StateList from "./StateList";
import { arrowShapes } from "react-xarrows/lib";

const DiagramApp = () => {
  //states:
  const [states, setStates] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [automata, setAutomata] = useState({});

  //useEffect:
  useEffect(() => {
    addAutomata();
    // console.log(automata);
  }, [states, arrows]);

  //event handlers:
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
    let transition = [];
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
    arrows.map(arrow => {
      // alphabets and transitions:
      if (!alphabet.includes(arrow.label)) {
        alphabet = [...alphabet, arrow.label];
        for (let i = 0; i < transitionTable.length; i++) {
          transitionTable[i].transition = alphabet;
        }
      }
      // transitionTable:
      states.map(state => {
        // stateName:
        if (`${state.id}` === arrow.start) {
          let found = false;
          stateName = state.stateName;

          // checking if an element with the same stateName exist in transitionTable:
          for (let i = 0; i < transitionTable.length; i++) {
            if (transitionTable[i].stateName === state.stateName) {
              found = true;
              // console.log("found", found);
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
                end,
                // end: [...end, state[parseFloat(arrow.end)].stateName],
              },
            ];
          }
        }
        return null;
      });
      return null;
    });

    //transitionTable.end
    // the following code has some errors: 1. all of the transitionTable elements get the same .end value!
    for (let i = 0; i < newArrows.length; i++) {
      for (let j = 0; j < transitionTable.length; j++) {
        if (newArrows[i].start === transitionTable[j].stateName) {
          for (let k = 0; k < transitionTable[j].transition.length; k++) {
            if (
              newArrows[i].label === transitionTable[j].transition[k] &&
              newArrows[i].start === transitionTable[j].stateName
            ) {
              console.log(newArrows[i].end, transitionTable[j].end[k]);

              if (transitionTable[j].end[k] === undefined) {
                transitionTable[j].end[k] = `${newArrows[i].end}`;
              } else {
                transitionTable[j].end[k] =
                  `${transitionTable[j].end[k]}` + `${newArrows[i].end}`;
              }
            }
          }
        }
      }
    }

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
