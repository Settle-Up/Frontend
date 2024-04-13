import { atom } from "recoil";

export const outgoingPaymentListState = atom<RequiredTransaction[] | null>({
  key: "outgoingPaymentListState",
  default: null,
});

export const recentSettlementListState = atom<ClearedTransaction[] | null>({
    key: "recentSettlementListState",
    default: null,
  });
