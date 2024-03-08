import { Button, ButtonProps, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { SxProps } from "@mui/material/styles";
import theme from "@theme";

const PrimaryButton = styled(Button)({
  color: "white",
  backgroundColor: theme.palette.primary.main,
});

const SecondaryButton = styled(Button)({
  color: "white",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
});

const PrimaryPlainButton = styled(Button)({
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "#D6CCFE",
  },
});

const SecondaryOutlineButton = styled(Button)({
  color: theme.palette.secondary.main,
  backgroundColor: "white",
  border: `1px solid ${theme.palette.secondary.main}`,
  "&:hover": {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
});

const DefaultButton = styled(Button)({
  color: "white",
  backgroundColor: theme.palette.black.main,
  "&:hover": {
    backgroundColor: theme.palette.black.light,
  },
});

interface CustomButtonProps extends ButtonProps {
  buttonStyle:
    | "primary"
    | "secondary"
    | "primaryPlain"
    | "secondaryOutline"
    | "default";
  EndIcon?: React.ElementType<SvgIconProps> | undefined;
  sx?: SxProps;
}

const CustomButton = ({
  buttonStyle,
  EndIcon,
  sx,
  children,
  ...props
}: CustomButtonProps) => {
  let ButtonComponent: React.ElementType;
  let variant: "contained" | "outlined" | "text" = "contained";

  switch (buttonStyle) {
    case "primary":
      ButtonComponent = PrimaryButton;
      break;
    case "secondary":
      ButtonComponent = SecondaryButton;
      break;
    case "primaryPlain":
      ButtonComponent = PrimaryPlainButton;
      variant = "text";
      break;
    case "secondaryOutline":
      ButtonComponent = SecondaryOutlineButton;
      variant = "outlined";
      break;
    case "default":
      ButtonComponent = DefaultButton;
      break;
    default:
      ButtonComponent = PrimaryButton;
  }

  return (
    <ButtonComponent
      variant={variant}
      endIcon={EndIcon}
      {...props}
      sx={{
        borderRadius: 5,
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: 1,
        textTransform: "none",
        boxShadow: 0,
        px: 2,
        ...sx,
      }}
    >
      {children}
    </ButtonComponent>
  );
};

export default CustomButton;