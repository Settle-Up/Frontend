import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import UpdatedTransactionReponseModal from "@components/UpdatedTransactionResponseModal";

const ProtectedRoute = () => {
  const location = useLocation();
  const accessToken = sessionStorage.getItem("accessToken");
  const setSnackbar = useSetRecoilState(snackbarState);

  // if (!accessToken) {
  //   if (location.pathname !== "/") {
  //     setSnackbar({
  //       show: true,
  //       message: "Please log in to access this page.",
  //       severity: "error",
  //     });
  //   }
  //   sessionStorage.setItem("preAuthRoute", location.pathname);
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <>
      <UpdatedTransactionReponseModal />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
