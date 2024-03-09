import { useState } from "react";
import { Backdrop, Fade, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SxProps } from "@mui/material/styles";

type UsageTipProps = {
  tipMessage: string;
  sx?: SxProps;
};

const UsageTip = ({ tipMessage, sx }: UsageTipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setShowTooltip((prev) => !prev);
  };

  return (
    <>
      <Backdrop
        open={showTooltip}
        sx={{
          zIndex: 1200,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          pointerEvents: "none",
        }}
      />
      <Tooltip
        title={tipMessage}
        open={showTooltip}
        onClose={() => setShowTooltip(false)}
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
        leaveTouchDelay={5000}
      >
        <IconButton
          color="primary"
          aria-label="quick guide"
          // onClick={() => setShowTooltip(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          sx={{ ...sx, p: 0.5 }}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default UsageTip;
