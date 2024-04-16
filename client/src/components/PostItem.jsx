import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";

const PostItem = ({
  postId,
  thumbnail,
  category,
  title,
  description,
  authorId,
}) => {
  const shortwayDescription =
    description.length > 205 ? `${description.substr(0, 205)}...` : description;
  const postTitle = title.length > 30 ? `${title.substr(0, 30)}...` : title;

  return (
    <article className="posts">
      <div className="post__thumbnail">
        <img src={thumbnail} alt="thumbnail" />
      </div>
      <div className="post__content">
        <Link to={`/posts/${postId}`}>
          <h3>{postTitle}</h3>
        </Link>
        <p>{shortwayDescription}</p>
        <div className="post_footer">
          <PostAuthor />
          <Link to={`/posts/categories/${category}`} className="btn-category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
