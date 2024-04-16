import React from "react";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import thumblog from "../images/blog22.jpg";

const PostDetails = () => {
  return (
    <>
      <section className="post-detail">
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor />
            <div className="post-detail__buttons">
              <Link to={`posts/werwer/edit`} className="btn sm primary">
                Edit
              </Link>
              <Link to={`posts/werwer/delete`} className="btn sm danger">
                Delete
              </Link>
            </div>
          </div>
          <h1>This is the post Title</h1>
          <div className="post-detail__thumnail">
            <img src={thumblog} alt="thumblog" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            magni nisi itaque laborum dolorem repudiandae quod aut harum vero
            accusamus veniam, obcaecati, voluptatum, assumenda neque.
            Exercitationem, alias molestiae nostrum ducimus nulla autem sit
            necessitatibus, unde accusantium iusto minus asperiores dolore?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
            hic vero corporis aliquid blanditiis ipsam repellendus laudantium
            quibusdam iste modi corrupti aliquam ratione, officia voluptates
            soluta obcaecati. Impedit ullam excepturi, fugit delectus voluptates
            quo maiores dolorum eum. Perspiciatis iusto ducimus iste recusandae
            delectus laudantium est ad repellendus. Atque ad fugiat quasi amet
            similique nam! Deserunt?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem sed
            saepe maiores.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet
            aperiam vero id architecto maiores sed ipsa, eum nulla doloremque
            obcaecati recusandae nisi quam totam fugiat necessitatibus nobis
            quisquam perferendis fuga officiis deleniti nam eius. Deleniti alias
            explicabo eaque dolore tempora recusandae ea doloremque veniam
            consequatur libero? Illo doloribus tenetur inventore consectetur
            repellendus dolorum nulla placeat animi voluptatem odio totam maxime
            eum quasi repudiandae error asperiores, deserunt reiciendis.
          </p>
        </div>
      </section>
    </>
  );
};

export default PostDetails;
