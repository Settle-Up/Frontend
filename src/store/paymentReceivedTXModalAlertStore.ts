import { atom } from "recoil";

type PaymentReceivedTXModalAlertState  = {
  isOpen: boolean;
  paymentReceivedTxList: UpdatedTransaction[] | null,
};

export const paymentReceivedTXModalAlertState = atom<PaymentReceivedTXModalAlertState>({
  key: "paymentReceivedTXModalAlertState",
  default: {
    isOpen: false,
    paymentReceivedTxList: null,
  },
});

