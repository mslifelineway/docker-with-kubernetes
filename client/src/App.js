import React from "react";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";

import "./app.css";

const App = () => {
  return (
    <div>
      <CreatePost />
      <Posts />
    </div>
  );
};

export default App;
