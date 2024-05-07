import { useRoutes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/auths/Login";
import Register from "./pages/auths/Register";
import Home from "./pages/Home";
import UserUpdate from "./pages/auths/UserUpdate";
import Upcoming from "./pages/Upcoming";
import TeamPage from "./pages/TeamPage";

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/user/update",
      element: <UserUpdate />,
    },
    {
      path: "/user/upcoming",
      element: <Upcoming />,
    },
    {
      path: "/teams/:id",
      element: <TeamPage />,
    },
  ]);
  return routeElements;
}