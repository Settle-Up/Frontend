import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const AddReceiptPageLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

 

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
