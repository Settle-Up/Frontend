import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import UsageTip from "./UsageTip";

type HeadingWithTipProps = {
  heading: string;
  tipMessage?: string;
};

const HeadingWithTip = ({ heading, tipMessage }: HeadingWithTipProps) => {
  return (
    <Box
      sx={{
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography variant="subtitle1"> {heading} </Typography>
      {tipMessage && (
        <UsageTip
          tipMessage={tipMessage}
          sx={{ position: "absolute", left: "100%", }}
        />
      )}
    </Box>
  );
};

export default HeadingWithTip;
