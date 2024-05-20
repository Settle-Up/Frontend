import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import UsageTip from "@components/UsageTip";

type HeadingWithTipProps = {
  heading: string;
  alignSelf?: "left" | "center" | "right";
  tipMessage?: string;
};

const HeadingWithTip = ({ heading, alignSelf = "center", tipMessage }: HeadingWithTipProps) => {
  return (
    <Box
      sx={{
        alignSelf: alignSelf,
        display: "flex",
        alignItems: "center",
        position: "relative",
        maxWidth: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="subtitle2"> {heading} </Typography>
      {tipMessage && (
        <UsageTip
          tipMessage={tipMessage}
          sx={{ position: "absolute", left: "100%" }}
        />
      )}
    </Box>
  );
};

export default HeadingWithTip;
