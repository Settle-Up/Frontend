import React from "react";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/system";
import theme from "@theme";

interface CustomIconButtonProps {
  ariaLabel: string;
  handleClick?: () => void;
  icon: React.ReactNode;
  shape: "round" | "square";
  sx?: SxProps<Theme>;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "secondary";
}

const CustomIconButton = ({
  ariaLabel,
  handleClick,
  icon,
  shape,
  sx = {},
  type = "button",
  variant = "default",
}: CustomIconButtonProps) => {
  let backgroundColor = theme.palette.secondary.main;
  let color = "white";
  let hoverBgColor = theme.palette.secondary.light;
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
      type={type}
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
