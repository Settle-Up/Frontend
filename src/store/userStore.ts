import { atom } from "recoil";

export const userAuthState = atom<CurrentUser>({
  key: "userAuthState",
  default: null
});

