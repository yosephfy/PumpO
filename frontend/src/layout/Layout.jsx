import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LeftBar from "../components/leftbar/LeftBar";
import Nav from "../components/nav/Nav";
import RightBar from "../components/rightbar/RightBar";
import ChatBox from "../pages/chatbox/Chatbox";
import FollowRequests from "../pages/followrequests/FollowRequests";
import GymProfile from "../pages/gymprofile/GymProfile";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Messages from "../pages/messages/Messages";
import Profile from "../pages/profile/Profile";
import Signup from "../pages/signup/Signup";
import EditProfile from "../pages/editprofile/EditProfile";
import Settings from "../pages/settings/Settings";
import Account from "../pages/settings/Account";
import SetttingContainer from "../pages/settings/SetttingContainer";
import Privacy from "../pages/settings/Privacy";
import Security from "../pages/settings/Security";
import Notifications from "../pages/settings/Notifications";


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
        { path: "/editProfile/", element: <EditProfile /> },
        { path: "/chatbox/:userId", element: <ChatBox /> },
        { path: "/messages", element: <Messages /> },
        { path: "/followreqs", element: <FollowRequests /> },
        {
          path: "/settings",
          element: <SetttingContainer />,
          children: [
            { path: "/settings", element: <Settings /> },
            { path: "/settings/account", element: <Account /> },
            { path: "/settings/privacy", element: <Privacy /> },
            { path: "/settings/security", element: <Security /> },
            { path: "/settings/notifications", element: <Notifications /> },
          ],
        },
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
