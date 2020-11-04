// src/App.js
import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

export default function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/post/:id" component={PostPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
