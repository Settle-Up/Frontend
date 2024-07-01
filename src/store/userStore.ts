import { atom } from "recoil";

export const userProfileState = atom<CurrentUser | null>({
  key: "userProfile",
  default: null,
});

