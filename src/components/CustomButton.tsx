import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
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
    backgroundColor: theme.palette.secondary.light,
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
    color: "white",
    backgroundColor: "#8C7D7F",
    border: `1px solid ${theme.palette.secondary.dark}`,
  },
});

const DefaultButton = styled(Button)({
  color: "white",
  backgroundColor: theme.palette.default.main,
  "&:hover": {
    backgroundColor: theme.palette.default.light,
  },
});

interface CustomButtonProps extends ButtonProps {
  buttonStyle?:
    | "primary"
    | "secondary"
    | "primaryPlain"
    | "secondaryOutline"
    | "default";
  EndIcon?: React.ElementType<SvgIconProps> | undefined;
  StartIcon?: React.ElementType<SvgIconProps> | undefined;
  sx?: SxProps;
  type?: "button" | "submit" | "reset";
  href?: string; // Added href for linking capability
}

const CustomButton = ({
  buttonStyle = "default",
  children,
  EndIcon,
  StartIcon,
  sx,
  type = "button",
  href, // New prop for navigation
  ...props
}: CustomButtonProps) => {
  let ButtonComponent: React.ElementType;
  let variant: "contained" | "outlined" | "text" = "contained";

  // Determine the button component based on the style
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
      ButtonComponent = PrimaryButton;
  }

  // Conditionally set component to 'a' if href is provided
  if (href) {
    return (
      <ButtonComponent
        component="a"
        href={href}
        target="_blank" // Opens in a new tab
        rel="noopener noreferrer" // Security for opening new tabs
        startIcon={StartIcon ? <StartIcon /> : undefined}
        endIcon={EndIcon ? <EndIcon /> : undefined}
        {...props}
        sx={{
          borderRadius: 5,
          fontSize: "12px",
          fontWeight: "bold",
          letterSpacing: 1,
          textTransform: "none",
          boxShadow: 0,
          px: 2,
          textDecoration: "none",
          ...sx,
        }}
      >
        {children}
      </ButtonComponent>
    );
  }

  // Default button if no href
  return (
    <ButtonComponent
      startIcon={StartIcon ? <StartIcon /> : undefined}
      endIcon={EndIcon ? <EndIcon /> : undefined}
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
      type={type}
      variant={variant}
    >
      {children}
    </ButtonComponent>
  );
};

export default CustomButton;
