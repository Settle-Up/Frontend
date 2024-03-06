import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { userAuthState } from "../store/userStore";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getGroupSummaryList } from "@apis/group/getGroupSummaryList";
import { IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomIconButton from "@components/CustomIconButton";

const GroupListPage = () => {
  const navigate = useNavigate();
  /* there's no need to read user details state because all I need is the auth state */
  // const {
  //   data: groupSummaryList,
  //   isLoading,
  //   error,
  // } = useQuery("groupSummaryList", getGroupSummaryList);
  // groupSummaryList?.forEach(group => )

  return (
    <>
      <Typography> Group </Typography>
      <CustomIconButton
        icon={<AddIcon />}
        ariaLabel="Create New Group"
        shape="square"
        handleClick={() => navigate("/create/group")}
      />
    </>
  );
};

export default GroupListPage;
