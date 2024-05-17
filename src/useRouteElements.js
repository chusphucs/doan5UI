import { useRoutes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/auths/Login";
import Register from "./pages/auths/Register";
import Home from "./pages/Home";
import UserUpdate from "./pages/auths/UserUpdate";
import Upcoming from "./pages/Upcoming";
import TeamPage from "./pages/TeamPage";
import UserChangePass from "./pages/auths/UserChangePass";

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
      path: "/teams/:teamId/:teamName",
      element: <TeamPage />,
    },
    {
      path: "/user/changepass",
      element: <UserChangePass />,
    },
  ]);
  return routeElements;
}
