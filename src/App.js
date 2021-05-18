import React from "react";
import DiagramApp from "./Components/DiagramApp";
import Nav from "./Components/Nav";
import "./Styles/App.scss";

const App = () => {
  return (
    <div>
      <Nav />
      <DiagramApp />
    </div>
  );
};

export default App;
