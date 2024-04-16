import React, { useState } from "react";

import PostItem from "./PostItem";
import { DUMMY_POSTS } from "../data";

const Posts = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className="posts">
      {posts?.length > 0 ? (
        <div className="container posts__container">
          {posts.map((post) => (
            <PostItem
              key={post.id}
              postId={post.id}
              thumbnail={post.thumbnail}
              category={post.category}
              title={post.title}
              description={post.description}
              authorId={post.authorId}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No Posts found </h2>
      )}
    </section>
  );
};

export default Posts;
