import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
const Header = () => {
  const [isnavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };
  return (
    <nav>
      <div className="container nav__conatainer">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <h1>BLOG</h1>
        </Link>
        {isnavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to="/profile/sdfsdf" onClick={closeNavHandler}>
                Ernest Archiever
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isnavShowing)}
        >
          {isnavShowing ? <AiOutlineClose /> : <FaBars />}{" "}
        </button>
      </div>
    </nav>
  );
};

export default Header;
