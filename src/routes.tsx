import { createBrowserRouter } from "react-router-dom";
import PageLayout from "@components/PageLayout";
import { LoginPage, LoginLoadingPage } from "@pages/auth";
import { GroupListPage, GroupCreatePage } from "@pages/group";
import {
  ReceiptUploadPage,
  ReceiptEditingPage,
  ProcessedReceiptInitialReviewPage,
  ExpenseAllocationSettingsPage,
  EqualQuantityAllocationPage,
  VariableQuantityAllocationPage
} from "@pages/expenseCreate";

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
      {
        path: "/upload-receipt",
        element: <ReceiptUploadPage />,
      },
      {
        path: "/edit-receipt",
        element: <ReceiptEditingPage />,
      },
      {
        path: "/processed-receipt/initial-review",
        element: <ProcessedReceiptInitialReviewPage />,
      },
      {
        path: "/expense-allocation-setttings",
        element: <ExpenseAllocationSettingsPage />,
      },
      {
        path: "/allocate-equal-quantity",
        element: <EqualQuantityAllocationPage />,
      },
      {
        path: "/allocate-variable-quantity",
        element: <VariableQuantityAllocationPage />,
      },
    ],
  },
]);

export default router;
