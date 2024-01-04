import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
//
import ChatBox from "../pages/chatbox/Chatbox";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";

import Nav from "../components/nav/Nav";
import LeftBar from "../components/leftbar/LeftBar";
import RightBar from "../components/rightbar/RightBar";

export default function Layout() {
  const Feed = () => {
    return (
      <>
        <Nav />
        <main>
          <LeftBar />
          <div className="container">
            <Outlet />
          </div>
          <RightBar />
        </main>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Feed />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/chatbox/:userId", element: <ChatBox /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
