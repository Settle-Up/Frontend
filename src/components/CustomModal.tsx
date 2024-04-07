import { IconButton, Modal, Stack } from "@mui/material";
import { ReactNode } from "react";
import theme from "@theme";
import CloseIcon from "@mui/icons-material/Close";
import CustomBackdrop from "@components/CustomBackdrop";
import { SxProps } from "@mui/material";

type CustomModalProps = {
  ariaLabel: string;
  children: ReactNode;
  handleClose?: () => void;
  isOpen: boolean;
  showCloseButton?: boolean;
};

const CustomModal = ({
  ariaLabel,
  children,
  handleClose,
  isOpen,
  showCloseButton = false,
}: CustomModalProps) => {
  return (
    <>
      <CustomBackdrop isOpen={isOpen} zIndex={2000} />
      <Modal
        componentsProps={{
          backdrop: {
            style: { backgroundColor: "transparent" },
          },
        }}
        open={isOpen}
        aria-label={ariaLabel}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: 2,
        }}
      >
        <Stack
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            border: `1px solid ${theme.palette.primary.main}`,
            pt: showCloseButton ? 2 : 4,
            pb: 4,
            px: 4,
            width: 400,
            textAlign: "center",
            gap: 2,
          }}
        >
          {showCloseButton && (
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="Close Modal"
              onClick={handleClose}
              sx={{ alignSelf: "flex-end", p: 1 }}
            >
              <CloseIcon />
            </IconButton>
          )}
          {children}
        </Stack>
      </Modal>
    </>
  );
};

export default CustomModal;
