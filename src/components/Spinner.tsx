import { Box, CircularProgress } from "@mui/material/";
import ReactDOM from "react-dom";
import CustomBackdrop from "@components/CustomBackdrop";
import { useContext } from "react";
import RootContainerContext from "@context/RootContainerContext";

type SpinnerProps = {
  isOverlay?: boolean;
  size?: number;
};

const Spinner = ({ isOverlay = false, size = 40 }: SpinnerProps) => {
  const rootContainerRef = useContext(RootContainerContext);
  
  if (!rootContainerRef?.current) {
    return null;
  }

  return (
    <>
      {isOverlay ? (
        <>
          {/* <CustomBackdrop isOpen={isOpen} zIndex={2000} /> */}
          {ReactDOM.createPortal(
            <CircularProgress
              size={size}
              sx={{ position: "absolute", top: "50%", left: "50%" }}
            />,
            rootContainerRef.current
          )}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={size} />
        </Box>
      )}
    </>
  );
};

export default Spinner;
