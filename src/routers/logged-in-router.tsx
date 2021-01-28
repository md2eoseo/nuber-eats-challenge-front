import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Podcasts } from "../pages/listener/podcasts";

const ListenerRoutes = [
  <Route path="/" exact>
    <Podcasts />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {data.me.role === "Listener" && ListenerRoutes}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
