import React, { useState, useRef } from "react";
import State from "../State";
import Xarrow, { arrowShapes } from "react-xarrows";
import Draggable from "react-draggable";
import ConnectionPoint from "../ConnectionPoint";

const StateList = props => {
  //refs:
  const circle1ref = useRef(null);
  const circle2ref = useRef(null);

  //states:
  const [arrows, setArrows] = useState([]);

  const [, setRender] = useState({});
  const forceRerender = () => setRender({});

  const addArrow = ({ start, end }) => {
    setArrows([
      ...arrows,
      {
        start,
        end,
        //   color: "red",
        //   label: {
        //     middle: (
        //       <div
        //         contentEditable
        //         suppressContentEditableWarning={true}
        //         style={{ font: "italic 1.5em serif", color: "purple" }}
        //       >
        //         Editable label
        //       </div>
        //     ),
        //   },
        //   headSize: 0,
        //   strokeWidth: 15,
      },
    ]);
  };

  // const [lines] = useState([
  //   {
  //     start: circle1ref,
  //     end: circle2ref,
  //     color: "#4ecdc4",
  //     headSize: 4,
  //     // label: { middle: "a" },
  //     label: {
  //       middle: <input className="line-label" type="text" placeholder="a" />,
  //     },
  //   },
  // ]);

  return (
    <ul className="states-container">
      {props.states.map(state => {
        return (
          <>
            <State
              // ref={circle1ref}
              states={props.states}
              setStates={props.setStates}
              state={state}
              stateId={`${state.id}`}
              key={state.id}
              addArrow={addArrow}
              setArrows={setArrows}
              //{...{ addArrow, setArrows, stateId: "box-1" }}
              // {...{ addArrow, setArrows, stateId: `${state.id}` }}
            />
          </>
        );
      })}
      {arrows.map(arrow => {
        return (
          <Xarrow
            start={arrow.start}
            end={arrow.end}
            key={arrow.start + "-." + arrow.start}
            color={"#4ecdc4"}
            label={
              <div
                contentEditable
                suppressContentEditableWarning={true}
                style={{
                  font: "italic 1.5em serif",
                  color: "black",
                  outline: "none",
                }}
              >
                &lambda;
              </div>
            }
            headSize={5}
            strokeWidth={4}
          />
        );
      })}
      {/* <Draggable onStop={forceRerender} onDrag={forceRerender}>
        <div className="state" ref={circle1ref}>
          q1
          <ConnectionPoint circleref={circle1ref} />
        </div>
      </Draggable>
      <Draggable onStop={forceRerender} onDrag={forceRerender}>
        <div className="state" ref={circle2ref}>
          q2
          <ConnectionPoint circleref={circle2ref} />
        </div>
      </Draggable> */}
      {/* {lines.map((line, i) => (
        <Xarrow key={i} {...line} />
      ))} */}
      {/* <Xarrow
        animateDrawing={true}
        start={circle1ref}
        end={circle2ref}
        label="a"
      /> */}
    </ul>
  );
};

export default StateList;

// import React, { useState, useRef } from "react";
// import State from "../State";
// import Xarrow from "react-xarrows";
// import Draggable from "react-draggable";

// const StateList = props => {
//   //refs:
//   // const circle1ref = useRef(null);
//   // const circle2ref = useRef(null);

//   //states:
//   const [arrows, setArrows] = useState([]);
//   const [, setRender] = useState({});
//   const forceRerender = () => setRender({});

//   const addArrow = ({ start, end }) => {
//     setArrows([...arrows, { start, end }]);
//   };

//   // const [lines] = useState([
//   //   {
//   //     start: circle1ref,
//   //     end: circle2ref,
//   //     color: "#4ecdc4",
//   //     headSize: 4,
//   //     // label: { middle: "a" },
//   //     label: {
//   //       middle: <input className="line-label" type="text" placeholder="a" />,
//   //     },
//   //   },
//   // ]);

//   return (
//     <ul className="states-container">
//       {props.states.map(state => {
//         return (
//           <>
//             <State
//               // ref={circle1ref}
//               states={props.states}
//               setStates={props.setStates}
//               state={state}
//               key={state.id}
//               addArrow={addArrow}
//               setArrows={setArrows}
//               // {...{ addArrow, setArrow, stateId: "1" }}
//             />
//             {arrows.map(arrow => {
//               <Xarrow
//                 start={arrow.start}
//                 end={arrow.end}
//                 key={arrow.start + "-." + arrow.end}
//               />;
//             })}
//           </>
//         );
//       })}
//       {/* <Draggable onStop={forceRerender} onDrag={forceRerender}>
//         <div className="state" ref={circle1ref}>
//           q1
//         </div>
//       </Draggable>
//       <Draggable onStop={forceRerender} onDrag={forceRerender}>
//         <div className="state" ref={circle2ref}>
//           q2
//         </div>
//       </Draggable>
//       {lines.map((line, i) => (
//         <Xarrow key={i} {...line} />
//       ))} */}
//       {/* <Xarrow
//         animateDrawing={true}
//         start={circle1ref}
//         end={circle2ref}
//         label="a"
//       /> */}
//     </ul>
//   );
// };

// export default StateList;
