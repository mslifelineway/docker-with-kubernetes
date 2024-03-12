import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Comments from "./Comments";

const itemStyle = { border: "1px solid #ccc", padding: "1rem" };

const Posts = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4002/posts");
      setPosts(res.data || {});
    } catch (error) {
      alert("Error while fetching posts...");
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="card posts">
      <h4>Posts</h4>
      <ul className="list">
        {Object.keys(posts).map((k) => {
          const post = posts[k];
          return (
            <li style={itemStyle} key={k}>
              <h6>{post?.title || "No title"}</h6>
              <Comments post={post} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
