import React, { useState } from "react";
import { DUMMY_POSTS } from "../data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <>
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => (
            <article key={post.id} className="dashboard__post">
              <div className="dashboard__post-info">
                <div className="dashboard__post-thumbnail">
                  <img src={post.thumbnail} alt="post-avatar" />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard__post-actions">
                <Link to={`/posts/${post.id}`} className="btn btn-sm">
                  View
                </Link>
                <Link
                  to={`/posts/${post.id}/edit`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <h2 className="center">You have no posts</h2>
      )}
    </>
  );
};

export default Dashboard;
