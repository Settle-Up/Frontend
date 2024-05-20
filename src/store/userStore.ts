import { atom } from "recoil";

export const userDetailsState = atom<CurrentUser>({
  key: "userDetailsState",
  default: null
});

