import { Box, CircularProgress } from "@mui/material/";
import ReactDOM from "react-dom";
import { useRecoilValue } from "recoil";
import { rootContainerRefState } from "@store/rootContainerRefStore";

type SpinnerProps = {
  isOverlay?: boolean;
  size?: number;
};

const Spinner = ({ isOverlay = false, size = 40 }: SpinnerProps) => {
  const rootContainerRef = useRecoilValue(rootContainerRefState);
  
  if (!rootContainerRef?.current) {
    return null;
  }

  return (
    <>
      {isOverlay ? (
        <>
          {ReactDOM.createPortal(
            <CircularProgress
              size={size}
              sx={{ position: "absolute", top: "50%", left: "50%", color: "black", border: "2px solid red" }}
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
