import React from "react";
import {Route, Switch} from "react-router-dom";
import DiagramApp from "./Components/DiagramApp";
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import Nav from "./Components/Nav";
import "./Styles/App.scss";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/team" ><TeamPage /></Route>
      </Switch>
    </div>
  );
};

export default App;
