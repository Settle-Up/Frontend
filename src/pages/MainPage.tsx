import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomIconButton from "@components/CustomIconButton";
import MainPageTopBar from "@components/MainPageTopBar";
import GroupList from "@components/Group/GroupList";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainPageTopBar />
      <Stack sx={{ flexGrow: 1 }}>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle2"> Groups </Typography>
            <CustomIconButton
              ariaLabel="Create New Group"
              handleClick={() => navigate("/groups/create")}
              icon={<AddIcon sx={{ fontSize: "18px" }}/>}
              shape="square"
            />
          </Box>
          <GroupList />
        </Stack>
        <CustomIconButton
          ariaLabel="Add New Receipt"
          handleClick={() => navigate("/expense/upload")}
          icon={<AddIcon sx={{ fontSize: "30px" }} />}
          shape="round"
          sx={{
            position: "sticky",
            bottom: 0,
            left: 600,
            boxShadow: 4,
            zIndex: 1000,
            alignSelf: "flex-end",
          }}
        />
      </Stack>
    </>
  );
};

export default MainPage;
