// src/App.js
import React, { useEffect } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import Toolbar from "./components/Toolbar";
import { useDispatch } from "react-redux";
import { bootstrapLogin } from "./store/Auth/actions";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bootstrapLogin());
  }, [dispatch]);

  return (
    <div className="app">
      <Toolbar />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/post/:id" component={PostPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}
