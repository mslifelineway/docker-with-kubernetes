import React from "react";
import CreateComment from "./CreateComment";

const Comments = ({ post }) => {
  return (
    <div className="comments">
      <p
        style={{
          fontSize: 14,
          width: "fit-content",
          padding: 0,
          margin: 0,
          borderBottom: "1px solid #000",
        }}
      >
        Comments:
      </p>
      <ul>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map(({ content, status }, id) => {
            if (status === "rejected") {
              return (
                <li
                  key={id}
                  style={{
                    textTransform: "pass-through",
                    backgroundColor: "red",
                  }}
                >
                  {content || "No title"}
                </li>
              );
            }
            if (status === "pending") {
              return (
                <li
                  key={id}
                  style={{
                    backgroundColor: "yellow",
                  }}
                >
                  {content || "No title"}
                </li>
              );
            }
            return <li key={id}>{content || "No title"}</li>;
          })
        ) : (
          <li>No comments yet!</li>
        )}
      </ul>
      <CreateComment id={post.id} />
    </div>
  );
};

export default Comments;
