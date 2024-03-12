const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  return res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({
    id,
    content: req.body.content,
    status: "pending",
  });
  commentsByPostId[req.params.id] = comments;

  try {
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        postId: req.params.id,
        id,
        content: req.body.content,
        status: "pending",
      },
    });
  } catch (error) {
    console.log("error in comment created: ", error.message);
  }
  return res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    console.log("Event received in comments: ", type, data);
  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comment = commentsByPostId[postId]?.find((c) => c.id === id);
    if (comment) {
        comment.status = status;
        console.log("comment: ", comment)
      try {
        await axios.post("http://localhost:4005/events", {
          type: "CommentUpdated",
          data: { postId, ...comment },
        });
      } catch (error) {
        console.log("Error while comment updated: ", error.message);
      }
    }
  }
  return res.send(req.body);
});

app.listen(4001, () => {
  console.log("Comment service is running on port 4001");
});
