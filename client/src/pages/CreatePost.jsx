import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // Initialize thumbnail state to null

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleThumbnailInputChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <p className="form__error-message">This is an error message</p>
        <form className="form create-post__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={handleDescriptionChange}
          />
          <input
            type="file"
            onChange={handleThumbnailInputChange}
            className="ql-editor"
            accept="image/png, image/jpeg, image/jpg"
          />
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
