exports.handleEvent = (posts, type, data) => {
  switch (type) {
    case "PostCreated":
      posts[data.id] = {
        id: data.id,
        title: data.title,
        comments: [],
      };
      break;

    case "CommentCreated":
      posts[data.postId]?.comments.push({
        id: data.id,
        content: data.content,
        status: data.status,
      });
      break;
    case "CommentUpdated":
      (() => {
        const { id, status, postId, content } = data;
        const post = posts[postId];
        console.log("post: ", post, posts);
        if (post) {
          const comment = post.comments.find((c) => c.id === id);
          comment.status = status;
          comment.content = content;
        }
      })();

      break;
  }
};
