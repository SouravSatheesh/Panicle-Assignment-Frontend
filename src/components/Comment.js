import React from "react";
import "./Comment.css";

function Comment({ comment }) {
  return (
    <div className="comment">
      <div className="comment_name">{comment.name}</div>
      <div className="comment_email">{comment.email}</div>
      <div className="comment_body">{comment.body}</div>
    </div>
  );
}

export default Comment;
