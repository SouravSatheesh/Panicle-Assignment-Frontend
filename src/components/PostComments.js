import React, { useState } from "react";
import Comment from "./Comment";
import "./PostComments.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../axios";

function PostComment({ post, comments }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    const values = event.target;
    event.preventDefault();
    if (!values.name.value || !values.email.value || !values.body.value) {
      alert("Field missing!! Post not added");
    } else {
      const newComment = {
        postId: post.id,
        id: comments.length + 1,
        name: values.name.value,
        email: values.email.value,
        body: values.body.value,
      };
      const response = await axios({
        method: "post",
        url: `posts/${post.id}/comments`,
        data: newComment,
      }).then((res) => window.location.reload());
    }
  };
//random comment
  return (
    <div className="container">
      <div className="comments column">
        <div className="comment_post_title">{post.title}</div>
        <div className="comment_post_userid">userId : {post.userId}</div>
        <div className="comment_post_body">{post.body}</div>
      </div>
      <div className="comments_section column">
        <h2>Comments</h2>
        <Button
          className="addComment"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add new comment
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Post</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                variant="standard"
              />
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
              />{" "}
              <TextField
                margin="dense"
                id="body"
                label="Comment"
                type="text"
                fullWidth
                variant="standard"
                multiline
              />{" "}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add Comment</Button>
            </DialogActions>
          </form>
        </Dialog>

        {comments?.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default PostComment;
