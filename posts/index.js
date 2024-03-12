const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { randomBytes } = require("crypto");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  posts[id] = {
    id,
    title: req.body.title,
  };

  try {
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: posts[id],
    });
  } catch (error) {
    console.log("Error while emitting PostCreated event", error.message);
  }
  return res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event received: ", req.body.type);
  return res.send(req.body);
});

app.listen(4000, () => {
  console.log("==> v5")
  console.log("Posts service running on port 4000");
});
