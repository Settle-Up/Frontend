import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import LoginLoadingPage from "@pages/LoginLoadingPage";
import GroupListPage from "@pages/GroupListPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/oauth/redirected/kakao",
    element: <LoginLoadingPage />,
  },
  {
    path: "/",
    element: <GroupListPage />,
  },
]);

export default router;
