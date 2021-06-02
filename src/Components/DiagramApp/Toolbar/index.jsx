import React, { useState } from "react";

const Toolbar = props => {
  //states:
  const [stateName, setStateName] = useState("");
  // event handlers:
  const addStateHandler = () => {
    console.log("addStateHandler");
  };
  const onFormSubmit = e => {
    e.preventDefault();
    if (stateName === "") {
      props.onSubmit({
        stateName: `q${props.states.length}`,
        initial: false,
        final: false,
        id: Math.random() * 100,
      });
    } else {
      props.onSubmit({
        stateName,
        initial: false,
        final: false,
        id: Math.random() * 100,
      });
    }
    setStateName("");
  };

  return (
    <div>
      <ul className="toolbar" id="toolbar">
        {/* <li>
          <button
            className="select-icon"
            //  onClick={selectNodeHandler}
          >
            <i className="fas fa-mouse-pointer"></i>
          </button>
        </li> */}
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
            <button
              type="submit"
              className="add-icon"
              onClick={addStateHandler}
            >
              <i className="fas fa-plus-circle"></i>
            </button>

          </form>
        </li>
        {/* <li>
          <button
            className="link-icon"
            //   onClick={addLinkHandler}
          >
            <i className="fas fa-slash"></i>
          </button>
        </li>
        <li>
          <button
            className="delete-icon"
            //    onClick={deleteNodeHandler}
          >
            <i className="fas fa-trash"></i>
          </button>
        </li> */}
      </ul>
    </div>
  );
};

export default Toolbar;
