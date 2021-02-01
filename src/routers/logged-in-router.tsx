import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Podcasts } from "../pages/listener/podcasts";
import { Podcast } from "../pages/listener/podcast";

const ListenerRoutes = [
  <Route key={1} path="/" exact>
    <Podcasts />
  </Route>,
  <Route key={2} path="/podcast/:podcastId" exact>
    <Podcast />
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
