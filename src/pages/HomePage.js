// src/pages/HomePage.js
import React from "react";
import PostFeed from "../components/PostFeed";
import { useSelector } from "react-redux";
import { selectUser } from "../store/Auth/selector";
import { Redirect } from "react-router-dom";

export default function HomePage() {
  const user = useSelector(selectUser);

  return (
    <div>
      {!user ? <Redirect to="/login" /> : ""}
      <h1>This is Home!</h1>
      <PostFeed />
    </div>
  );
}
