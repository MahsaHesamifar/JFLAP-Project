import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import Nav from "./Components/Nav";
import "./Styles/App.scss";

const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/team">
          <TeamPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
