import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import EditPosts from "./pages/EditPosts";
import Logout from "./pages/Logout";
import DeletePosts from "./pages/DeletePosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "posts/:id",
        element: <PostDetails />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "profile/:id",
        element: <UserProfile />,
      },
      {
        path: "authors",
        element: <Authors />,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
      {
        path: "posts/categories/:category",
        element: <CategoryPosts />,
      },
      {
        path: "posts/users/:id",
        element: <AuthorPosts />,
      },
      {
        path: "myposts/:id",
        element: <Dashboard />,
      },

      {
        path: "posts/:id/edit",
        element: <EditPosts />,
      },
      {
        path: "posts/:id/delete",
        element: <DeletePosts />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
