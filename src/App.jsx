import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserDetails from "./components/UserDetails";
import UsersList from "./components/UserList";
import UserProfile from "./components/UserProfile";

const App = () => {
  const user = useSelector((state) => state.user?.user);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Dashboard /> : <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/dashboard",
      element: user ? <Dashboard /> : <Login />, // Redirect unauthenticated users
    },
    {
      path: "/user/:id",
      element: user ? <UserDetails /> : <Login />,
    },
    {
      path: "/usersList",
      element: user ? <UsersList /> : <Login />,
    },
    {
      path: "/userProfile",
      element: user ? <UserProfile /> : <Login />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
