import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import LoginLoadingPage from "@pages/LoginLoadingPage";
import GroupListPage from "@pages/GroupListPage";
import GroupCreatePage from "@pages/GroupCreatePage";

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
  {
    path: "/create/group",
    element: <GroupCreatePage />,
  },
]);

export default router;
