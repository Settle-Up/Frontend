import { createBrowserRouter } from "react-router-dom";
import { RootLayout, AddReceiptPageLayout } from "@components/PageLayout";
import MainPage from "@pages/MainPage";
import { LoginPage, LoginLoadingPage } from "@pages/auth";
import {
  GroupDetailsPage,
  GroupCreatePage,
  GroupExpensePage,
} from "@pages/group";
import {
  ReceiptUploadPage,
  ReceiptEditingPage,
  ProcessedReceiptInitialReviewPage,
  ReceiptFinalReviewPage,
  ExpenseAllocationSettingsPage,
  EqualQuantityAllocationPage,
  VariableQuantityAllocationPage,
  ExpenseSubmissionPage,
} from "@pages/expenseCreate";
import NotFoundPage from "@pages/NotFoundPage";
import ProtectedRoute from "@components/ProtectedRoute";
import HowToUsePage from "@pages/HowToUsePage";
import DemoStartPage from "@pages/DemoStartPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/how-to-use",
        element: <HowToUsePage />,
      },
      {
        path: "/start-demo",
        element: <DemoStartPage />,
      },
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
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            index: true,
            element: <MainPage />,
          },
          {
            path: "groups/:groupId/detail",
            element: <GroupDetailsPage />,
          },
          {
            path: "groups/:groupId/expenses/:expenseId",
            element: <GroupExpensePage />,
          },
          {
            path: "groups/create",
            element: <GroupCreatePage />,
          },
          {
            element: <AddReceiptPageLayout />,
            children: [
              {
                path: "/expense/upload",
                element: <ReceiptUploadPage />,
              },
              {
                path: "/expense/edit",
                element: <ReceiptEditingPage />,
              },
              {
                path: "/expense/review/initial",
                element: <ProcessedReceiptInitialReviewPage />,
              },
              {
                path: "/expense/review/final",
                element: <ReceiptFinalReviewPage />,
              },
              {
                path: "/expense/allocation/settings",
                element: <ExpenseAllocationSettingsPage />,
              },
              {
                path: "/expense/allocation/equal",
                element: <EqualQuantityAllocationPage />,
              },
              {
                path: "/expense/allocation/variable",
                element: <VariableQuantityAllocationPage />,
              },
              {
                path: "/expense/submission/review",
                element: <ExpenseSubmissionPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
