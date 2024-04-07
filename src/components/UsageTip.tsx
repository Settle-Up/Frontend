import { useRef, useEffect, useState } from "react";
import { Fade, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { SxProps } from "@mui/material/styles";
import CustomBackdrop from "@components/CustomBackdrop";

type UsageTipProps = {
  tipMessage: string;
  sx?: SxProps;
};

const UsageTip = ({ tipMessage, sx }: UsageTipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setShowTooltip((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      iconButtonRef.current &&
      !iconButtonRef.current.contains(event.target as Node)
    ) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <CustomBackdrop isOpen={showTooltip} zIndex={2000}/>
      <Tooltip
        title={tipMessage}
        open={showTooltip}
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
        leaveTouchDelay={5000}
        sx={{
          width: "300px",
          ...sx,
        }}
      >
        <IconButton
          color="primary"
          aria-label="quick guide"
          onClick={handleClick}
          ref={iconButtonRef}
          sx={{ p: 0.5 }}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default UsageTip;
