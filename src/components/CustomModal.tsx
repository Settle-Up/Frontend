import { IconButton, Modal, Stack } from "@mui/material";
import { ReactNode } from "react";
import theme from "@theme";
import CloseIcon from "@mui/icons-material/Close";
import CustomBackdrop from "@components/CustomBackdrop";

type CustomModalProps = {
  ariaLabel: string;
  children: ReactNode;
  closeModal?: () => void;
  isOpen: boolean;
  showCloseButton?: boolean;
};

const CustomModal = ({
  ariaLabel,
  children,
  closeModal,
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
          className="custom-scrollbar"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            border: `1px solid ${theme.palette.primary.main}`,
            pt: showCloseButton ? 2 : 4,
            pb: 4,
            px: 4,
            width: 400,
            minHeight: "50vh",
            maxHeight: "80vh",
            overflowY: "auto",
            textAlign: "center",
            gap: 1,
          }}
        >
          {showCloseButton && (
            <IconButton
              size="large"
              edge="end"
              color="primary"
              aria-label="Close Modal"
              onClick={closeModal}
              sx={{ alignSelf: "flex-end", p: 0 }}
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
