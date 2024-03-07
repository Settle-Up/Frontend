import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { userAuthState } from "../store/userStore";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getGroupSummaryList } from "@apis/group/getGroupSummaryList";
import { Box, IconButton, Stack, Typography } from "@mui/material";
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
    <Stack>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="subtitle2"> Groups </Typography>
        <CustomIconButton
          icon={<AddIcon />}
          ariaLabel="Create New Group"
          shape="square"
          handleClick={() => navigate("/create/group")}
        />
        <CustomIconButton
          icon={<AddIcon sx={{ fontSize: "36px" }} />}
          ariaLabel="Create New Group"
          shape="round"
          handleClick={() => navigate("/create/group")}
          sx={{ position: "absolute", bottom: 50, right: 50, boxShadow: 4 }}
        />
      </Box>
    </Stack>
  );
};

export default GroupListPage;
