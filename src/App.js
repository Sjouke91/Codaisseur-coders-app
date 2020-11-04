// src/App.js
import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./components/PostFeed";

export default function App() {
  return (
    <div className="app">
      <Switch>
        {/* more pages to be added here later */}
        <Route path="/post/:id" component={PostPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
