import { IconButton, Modal, Stack } from "@mui/material";
import { ReactNode } from "react";
import theme from "@theme";
import CloseIcon from "@mui/icons-material/Close";

type CustomModalProps = {
  ariaLabel: string;
  children: ReactNode;
  handleClose: (isOpen: boolean) => void;
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
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-label={ariaLabel}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          m: 2
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
              onClick={() => handleClose(false)}
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
