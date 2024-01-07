import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
//
import ChatBox from "../pages/chatbox/Chatbox";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import Messages from "../pages/messages/Messages";
import FollowRequests from "../pages/followrequests/FollowRequests";

import Nav from "../components/nav/Nav";
import RightBar from "../components/rightbar/RightBar";
import LeftBar from "../components/leftbar/LeftBar";
import GymProfile from "../pages/gymprofile/GymProfile";

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
        { path: "/messages", element: <Messages /> },
        { path: "/followreqs", element: <FollowRequests /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Signup /> },
    { path: "/gymprofile", element: <GymProfile /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
