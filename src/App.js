import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import axios from "./axios";
import Comments from "./components/Comments";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios({
        method: "GET",
        url: "posts",
      });
      setPosts(response.data);
    };
    getPosts();
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" element={<Home posts={posts} />}></Route>
          <Route path="/posts/:uid" element={<Comments />}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
