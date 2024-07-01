import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import theme from '@theme';
import CustomSnackbar from '@components/CustomSnackbar';
import { useSetRecoilState } from 'recoil';
import { rootContainerRefState } from '@store/rootContainerRefStore';

const RootLayout = () => {
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const setRootContainerRef = useSetRecoilState(rootContainerRefState);

  useEffect(() => {
    setRootContainerRef(rootContainerRef);
  }, [setRootContainerRef]);

  const loginPageBackground = location.pathname === "/login" ? "gradient-background" : "";

  return (
    <>
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
    </>
  );
};

export default RootLayout;
