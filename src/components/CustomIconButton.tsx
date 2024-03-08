import React from "react";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/system";
import theme from "@theme";

interface CustomIconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  handleClick: () => void;
  variant?: "default" | "primary" | "secondary";
  shape: "round" | "square";
  sx?: SxProps<Theme>;
}

const CustomIconButton = ({
  icon,
  ariaLabel,
  handleClick,
  variant = "default",
  shape,
  sx = {},
}: CustomIconButtonProps) => {
  let backgroundColor = theme.palette.black.main;
  let color = "white";
  let hoverBgColor = theme.palette.black.light;
  if (variant === "primary") {
    backgroundColor = theme.palette.primary.main;
    hoverBgColor = theme.palette.primary.dark;
  } else if (variant === "secondary") {
    backgroundColor = theme.palette.secondary.main;
    hoverBgColor = theme.palette.secondary.dark;
  }

  let borderRadius = shape === "round" ? "50%" : "20%";

  return (
    <IconButton
      onClick={handleClick}
      aria-label={ariaLabel}
      sx={{
        backgroundColor,
        color,
        borderRadius,
        p: 0.2,
        "&:hover": {
          backgroundColor: hoverBgColor,
        },
        ...sx,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default CustomIconButton;
