import { atom } from "recoil";

export const selectedTransactionForPaymentState =
  atom<RequiredTransaction | null>({
    key: "selectedTransactionForPayment",
    default: null,
  });
