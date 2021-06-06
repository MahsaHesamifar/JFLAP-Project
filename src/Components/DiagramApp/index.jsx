import React, { useEffect, useState } from "react";
import Toolbar from "./Toolbar";
import StateList from "./StateList";
import axios from "axios";

const DiagramApp = () => {
  //states:
  const [states, setStates] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [automata, setAutomata] = useState({});

  //useEffect:
  useEffect(() => {
    addAutomata();
    // console.log(automata);
  }, [arrows, states]);

  // useEffect(async () => {
  //   try {
  //     getAutomata();
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }, []);
  // const getAutomata = async ()=>{
  //   const automata = await axios.get()
  // }
  //event handlers:

  const onAddState = circle => {
    //creating a circle(state)
    setStates([...states, circle]);
    console.log(states);
    console.log(arrows);
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
      //arrows
      for (let j = 0; j < transitionTable.length; j++) {
        if (newArrows[i].start === transitionTable[j].stateName) {
          // newArrows[i].label === transitionTable[j].transiton[?]
          for (let k = 0; k < transitionTable[j].transition.length; k++) {
            if (newArrows[i].label === transitionTable[j].transition[k]) {
              // console.log(newArrows[i].end, transitionTable[j].end[k]);

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
      // console.log(newArrows);
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
  const connectToDatabase = async () => {
    console.log(automata);
    let data = JSON.stringify({
      alphabet: automata.alphabet,
      transitionTable: automata.transitionTable,
      startState: automata.startState,
      finalStates: automata.finalState,
    });
    try {
      const submitTaskData = await axios.post(
        "http://localhost:8000/automata/new-automata",
        data,
        { headers: {} }
        // {
        //   headers: {
        //     Authorization: `Bearer ${props.token}`,
        //   },
        // }
      );
      console.log(submitTaskData);
    } catch (error) {
      console.log(error.response);
    }
    // console.log("clicked");
    // let ajax = new XMLHttpRequest();
    // ajax.open("POST", "http://localhost:8000/automata/new-automata");
    // ajax.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    // //post json
    // ajax.onreadystatechange = function () {
    //   if (this.readyState === XMLHttpRequest.DONE) {
    //     if (this.status === 201) {
    //       console.log(this.responseText); //print json on console
    //     } else if (this.status === 404) {
    //       console.log("not found"); //if can not found json
    //     }
    //   }
    // };
    // ajax.send(JSON.stringify(automata));
    // let ajax1 = new XMLHttpRequest();
    //get json
    // ajax1.open("GET", "http://localhost:8000/automata/nfa2dfa");
    // ajax1.onreadystatechange = function () {
    //   if (this.readyState === XMLHttpRequest.DONE) {
    //     if (this.status === 200) {
    //       console.log(this.responseText); //print json on console
    //     } else if (this.status === 404) {
    //       console.log("not found"); //if can not found json
    //     }
    //   }
    // };
    // ajax1.send();
  };

  return (
    <div className="diagram-container">
      <Toolbar onSubmit={onAddState} states={states} />
      <button className="connect-database-btn" onClick={connectToDatabase}>
        send automata to database
      </button>
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
