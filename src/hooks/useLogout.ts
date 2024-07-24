import { useResetRecoilState } from "recoil";
import { useQueryClient } from "react-query";
import { userProfileState } from "@store/userStore";
import { newExpenseState } from "@store/expenseStore";
import { selectedTransactionForPaymentState } from "@store/transactionStore";

const useLogout = () => {
  const resetUserProfileState = useResetRecoilState(userProfileState);
  const resetNewExpenseState = useResetRecoilState(newExpenseState);
  const resetSelectedTransactionForPaymentState = useResetRecoilState(
    selectedTransactionForPaymentState
  );

  const queryClient = useQueryClient();

  const logout = () => {
    sessionStorage.clear();
    resetUserProfileState();
    resetNewExpenseState();
    resetSelectedTransactionForPaymentState();
    queryClient.clear();
  };

  return logout;
};

export default useLogout;
