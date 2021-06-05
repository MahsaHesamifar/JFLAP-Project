import React, { useState } from "react";

const Toolbar = props => {
  //states:
  const [stateName, setStateName] = useState("");
  const [isInitial, setIsInitial] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  // event handlers:
  const addStateHandler = () => {
    console.log("addStateHandler");
  };
  const initialHandler = () => {
    props.states.map(state => {
      if (state.initial) {
        state.initial = false;
        return;
      }
    });
    setIsInitial(!isInitial);
  };
  const finalHandler = () => {
    setIsFinal(!isFinal);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    if (stateName === "") {
      props.onSubmit({
        stateName: `q${props.states.length}`,
        initial: isInitial,
        final: isFinal,
        id: Math.random() * 100,
      });
    } else {
      props.onSubmit({
        stateName,
        initial: isInitial,
        final: isFinal,
        id: Math.random() * 100,
      });
    }
    setStateName("");
    setIsFinal(false);
    setIsInitial(false);
  };

  return (
    <div>
      <ul className="toolbar" id="toolbar">
        <li>
          <form onSubmit={onFormSubmit}>
            <input
              className="state-input"
              type="text"
              placeholder="State Name"
              onChange={e => {
                setStateName(e.target.value);
              }}
              value={stateName}
            />
            <button type="submit" className="add-btn" onClick={addStateHandler}>
              <i className="fas fa-plus"></i>
            </button>
            <button onClick={initialHandler} className="initial-btn">
              initial
            </button>
            <button onClick={finalHandler} className="final-btn">
              final
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default Toolbar;
