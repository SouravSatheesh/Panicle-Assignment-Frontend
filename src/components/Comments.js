import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Comments.css";
import axios from "../axios";
import PostComment from "./PostComments";

function Comments() {
  let { uid } = useParams();

  const [posts, setPosts] = useState({});
  const [comments, setComments] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const response = await axios({
        method: "GET",
        url: `posts/${uid}`,
      });
      setPosts(response.data[0]);
    };

    const getComments = async () => {
      const response1 = await axios({
        method: "GET",
        url: `posts/${uid}/comments`,
      });
      setComments(response1.data);
    };

    getPosts();
    getComments();
  }, []);

  return (
    <div className="commentsPage">
      <PostComment post={posts} comments={comments}/>
    </div>
  );
}

export default Comments;
