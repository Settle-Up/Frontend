import { Typography } from "@mui/material";
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isNewExpenseFormFlowInitiatedState } from "@store/expenseStore";


const AddReceiptPageLayout = () => {
  const navigate = useNavigate();
  const isFormFlowInitiated = useRecoilValue(isNewExpenseFormFlowInitiatedState);

  useEffect(() => {
    if (!isFormFlowInitiated) {
      navigate('/expense/upload');
    }
  }, [isFormFlowInitiated, navigate]);



  return (
    <>
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        Add Receipt
      </Typography>
      <Outlet />
    </>
  );
};

export default AddReceiptPageLayout;
