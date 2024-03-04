import { Box, CircularProgress } from "@mui/material/";

type SpinnerProps = {
 size?: number;
}

const Spinner = ({size= 40}: SpinnerProps) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
    >
      <CircularProgress size={size}/>
    </Box>
  );
};

export default Spinner;