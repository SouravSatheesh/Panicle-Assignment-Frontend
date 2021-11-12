import React, { useState } from "react";
import "./Home.css";
import Post from "./Post";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../axios";

function Home({ posts }) {
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
    if (!values.userId.value || !values.title.value || !values.body.value) {
      alert("Field missing!! Post not added");
    } else {
      const newPost = {
        id: posts.length + 1,
        userId: event.target.userId.value,
        title: event.target.title.value,
        body: event.target.body.value,
      };
      const response = await axios({
          method: "post",
          url: `posts`,
          data: newPost,
        })
        .then((res) => window.location.reload());
      setOpen(false);
    }
  };

  return (
    <div className="home">
      <Button
        className="addButton"
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add new post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Post</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="userId"
              label="User ID"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="title"
              label="Post Title"
              type="text"
              fullWidth
              variant="standard"
            />{" "}
            <TextField
              margin="dense"
              id="body"
              label="Post Body"
              type="text"
              fullWidth
              variant="standard"
              multiline
            />{" "}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Post</Button>
          </DialogActions>
        </form>
      </Dialog>
      <div className="container">
        {posts?.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            userId={post.userId}
            body={post.body}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
