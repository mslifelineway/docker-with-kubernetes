const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  //handle the posts related events
  axios.post("http://localhost:4000/events", event).catch((error) => {
    console.log(error.message, " Error in event bus 4000");
  });

  //Handle the comments related events
  axios.post("http://localhost:4001/events", event).catch((error) => {
    console.log(error.message, " Error in event bus 4001");
  });

  //Handle the query service related events
  axios.post("http://localhost:4002/events", event).catch((error) => {
    console.log(error.message, " Error in event bus 4002");
  });

  //Handle the moderation service related events
  axios.post("http://localhost:4003/events", event).catch((error) => {
    console.log(error.message, " Error in event bus 4003");
  });

  app.get("/events", (req, res) => res.send(events));

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
