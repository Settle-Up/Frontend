import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomIconButton from "@components/CustomIconButton";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { getGroupSummaryList } from "@apis/group/getGroupSummaryList";

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
          ariaLabel="Create New Group"
          handleClick={() => navigate("/create/group")}
          icon={<AddIcon />}
          shape="square"
        />
        <CustomIconButton
          ariaLabel="Add New Receipt"
          handleClick={() => navigate("/upload-receipt")}
          icon={<AddIcon sx={{ fontSize: "36px" }} />}
          shape="round"
          sx={{ position: "absolute", bottom: 50, right: 50, boxShadow: 4 }}
        />
      </Box>
    </Stack>
  );
};

export default GroupListPage;
