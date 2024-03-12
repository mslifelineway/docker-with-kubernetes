import React, { useState } from "react";
import axios from "axios";

const CreateComment = ({ id }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:4001/posts/${id}/comments`, {
        content,
      });
      setContent("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="comments">
      <div className="flex-col" style={{ marginBottom: 10, marginTop: 10, paddingTop: 10, borderTop: '1px dashed #ccc'}}>
        <label style={{ fontSize: 14, fontFamily: "bold" }}>New Comment</label>
        <input
          type="text"
          name="post"
          value={content}
          onChange={(e) => setContent(e.target.value || "")}
          placeholder="comment..."
        />
      </div>
      <button disabled={content === ""} type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateComment;
