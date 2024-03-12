const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { handleEvent } = require("./handleEvent");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(posts, type, data);
  return res.send({ status: "OK" });
});

app.listen(4002, async () => {
  console.log("Query service is listening on 4002");
  try {
    const res = await axios.get("http://localhost:4005/events");
    for (let event of res.data) {
      handleEvent(posts, event.type, event.data);
    }
  } catch (error) {
    console.log("Error while fetching events");
  }
});
