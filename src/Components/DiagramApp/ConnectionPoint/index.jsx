import React, { useRef, useState } from "react";

const ConnectionPoint = ({ stateId, dragRef, stateRef }) => {
  const ref1 = useRef();

  const [position, setPosition] = useState({});
  const [beingDragged, setBeingDragged] = useState(false);

  return (
    <>
      <div
        className="connection-point"
        style={{
          ...position,
        }}
        draggable
        onMouseDown={e => {
          e.stopPropagation();
        }}
        onDragStart={e => {
          // console.log("onDragStart");
          setBeingDragged(true);
          e.dataTransfer.setData("arrow", stateId);
        }}
        onDrag={e => {
          // console.log("onDrag");
          const { offsetTop, offsetLeft } = stateRef.current;

          const { x, y } = dragRef.current.state;
          setPosition({
            position: "fixed",
            left: e.clientX - x - offsetLeft,
            top: e.clientY - y - offsetTop,
            transform: "none",
            opacity: 0,
          });
        }}
        ref={ref1}
        onDragEnd={e => {
          // console.log("onDragEnd");
          setPosition({});
          setBeingDragged(false);
          // window.prompt("enter a transition: ");
        }}
      >
        {/* {beingDragged ? (
          <Xarrow start={stateId} end={ref1} color={"red"} opacity={0} />
        ) : null} */}
      </div>
    </>
  );
};

export default ConnectionPoint;
