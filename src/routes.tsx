import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout, AddReceiptPageLayout } from "@components/PageLayout";
import { LoginPage, LoginLoadingPage } from "@pages/auth";
import {
  GroupListPage,
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
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <GroupListPage />,
      },
      {
        path: "groups/:groupId/detail",
        element: <GroupDetailsPage />,
      },
      {
        path: "groups/:groupId/expenses/:receiptId",
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
]);

export default router;
