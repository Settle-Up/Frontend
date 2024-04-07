import { atom } from "recoil";

type Snackbar = {
  message: string;
  severity: "info" | "success" | "warning" | "error";
  show: boolean;
};

export const snackbarState = atom<Snackbar>({
  key: "snackbarState",
  default: {
    show: false,
    message: "",
    severity: "info",
  },
});
