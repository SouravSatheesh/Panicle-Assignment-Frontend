import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";

function Post({ id, userId, title, body }) {
  return (
    <Link to={`/posts/${id}`}>
      <div>
        <div className="post">
          <div className="post_userid">userId : {userId}</div>
          <div className="post_title">{title}</div>
          <div className="post_body">{body}</div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
