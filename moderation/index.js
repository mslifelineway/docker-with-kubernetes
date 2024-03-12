const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log(type, data, data.content, "event in moderation");
  switch (type) {
    case "CommentCreated":
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          postId: data.postId,
          id: data.id,
          content: data.content,
          status: data.content
            ? data.content.includes("orange")
              ? "rejected"
              : "approved"
            : "pending",
        },
      });
      // .catch((e) => console.log("error while moderating comment: ", e.message));
      break;
  }
  console.log("posts with comments: ", posts);
  return res.send({ status: "OK" });
});

app.listen(4003, () => {
  console.log("Moderation service is listening on 4003");
});
