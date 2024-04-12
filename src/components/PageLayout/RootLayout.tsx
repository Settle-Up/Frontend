import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import theme from "@theme";
import { useRef, useState } from "react";
import RootContainerContext from "@context/RootContainerContext";
import CustomSnackbar from "@components/CustomSnackbar";
import { useRecoilValue } from "recoil";
import {respondToUpdatedTxsModalState } from "@store/respondToUpdatedTxsModalStore";

const PageLayout = () => {
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [currentRef, setCurrentRef] = useState<HTMLElement | null>(null);

  const { isOpen, updatedTransactionList } = useRecoilValue(
    respondToUpdatedTxsModalState
  );

  const loginPageBackground =
    location.pathname === "/login" ? "gradient-background" : "";
  // useEffect(() => {
  //   setCurrentRef(rootContainerRef.current);
  // }, []);
  return (
    <RootContainerContext.Provider value={rootContainerRef}>
      <CustomSnackbar />
      <Stack
        ref={rootContainerRef}
        className={`custom-scrollbar ${loginPageBackground}`}
        sx={{
          height: "100%",
          maxWidth: "600px",
          mx: "auto",
          px: 3,
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
