import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import theme from "@theme";
import { useRef, useState } from "react";
import RootContainerContext from "@context/RootContainerContext";
import CustomSnackbar from "@components/CustomSnackbar";
import TransactionUpdateAlert from "@components/TransactionUpdateAlert";
import { useRecoilValue } from "recoil";
import { updatedTransactionsAlertState } from "@store/TxUpdateAlertsModalStore";

const PageLayout = () => {
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const showTitle =
    location.pathname === "/" ||
    location.pathname.startsWith("/add/receipt/upload");

  // location.pathname === "/add/receipt", show "Add Receipt" typography
  // location.pathname === "/create/group", show "Create Group" typography
  // location.pathname === "/", show "Create Group" typography

  const [currentRef, setCurrentRef] = useState<HTMLElement | null>(null);
  
  const { isOpen, updatedTransactionList } =
    useRecoilValue(updatedTransactionsAlertState);


  // useEffect(() => {
  //   setCurrentRef(rootContainerRef.current);
  // }, []);
  return (
    <RootContainerContext.Provider value={rootContainerRef}>
      {/* <TransactionUpdateAlert /> */}
      <CustomSnackbar />
      <Stack
        ref={rootContainerRef}
        className="custom-scrollbar"
        sx={{
          height: "100%",
          border: "2px solid red",
          maxWidth: "600px",
          //   alignItems: "center",
          mx: "auto",
          px: 2,
          py: 4,
          gap: 2,
          backgroundColor: theme.palette.background.default,
          overflow: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Outlet />
      </Stack>
    </RootContainerContext.Provider>
  );
};

export default PageLayout;
