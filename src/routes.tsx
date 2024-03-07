import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@pages/LoginPage";
import LoginLoadingPage from "@pages/LoginLoadingPage";
import GroupListPage from "@pages/GroupListPage";
import GroupCreatePage from "@pages/GroupCreatePage";
import PageLayout from "@components/PageLayout";

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
    element: <PageLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <GroupListPage />,
      },
      {
        path: "/create/group",
        element: <GroupCreatePage />,
      },
    ],
  },
]);

export default router;
