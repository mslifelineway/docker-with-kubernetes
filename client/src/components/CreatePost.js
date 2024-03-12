import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/posts", {
        title: content,
      });
      setContent("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="create-post card">
      <h6>Create Post</h6>
      <div className="flex-col" style={{ gap: "2px" }}>
        <input
          type="text"
          name="post"
          value={content}
          onChange={(e) => setContent(e.target.value || "")}
          placeholder="Enter post title..."
        />
      </div>
      <button
        style={{ width: "fit-content", marginTop: 15 }}
        disabled={content === ""}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default CreatePost;
