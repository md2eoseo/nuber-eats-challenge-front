import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import { CreateUser } from "../pages/create-user";
import { Login } from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-user">
          <CreateUser />
        </Route>
        <Route path="/">
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
