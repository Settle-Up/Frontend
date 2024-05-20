import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CustomButton from "@components/CustomButton";
import EmailSearchForm from "@components/EmailSearchForm";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import theme from "@theme";
import { grey } from "@mui/material/colors";
import { useMutation } from "react-query";
import { addGroupMembers } from "@apis/group/addGroupMembers";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import Spinner from "@components/Spinner";

type AddMembersContentProps = {
  groupId: string;
  groupName: string;
  closeModal: () => void;
};

const AddMembersContent = ({ groupId, groupName, closeModal }: AddMembersContentProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const [groupUserList, setGroupUserList] = useState<GeneralUser[]>([]);
  // const [copySuccess, setCopySuccess] = useState("");

  const selectEmail = (user: GeneralUser) => {
    setGroupUserList((prevList) => [...prevList, user]);
  };

  const unselectEmail = (user: GeneralUser) => {
    setGroupUserList((prevList) =>
      prevList.filter((groupUser) => groupUser.userId !== user.userId)
    );
  };

  // const handleCopyClick = async () => {
  //   try {
  //     await navigator.clipboard.writeText(
  //       "https://settle-up/groupInvitation/1254"
  //     );
  //     setCopySuccess("Copied!");
  //   } catch (err) {
  //     setCopySuccess("Failed to copy!");
  //   }
  // };

  const {
    mutate: executeAddGroupMembers,
    isSuccess,
    isError,
    isLoading,
  } = useMutation(() => addGroupMembers({groupId, groupName, groupUserList: groupUserList.map(user => user.userId)}));

  useEffect(() => {
    if (isLoading) {
      closeModal();
      <Spinner isOverlay />
    }
  }, [isLoading, setSnackbar, groupName, closeModal]);



  useEffect(() => {
    if (isSuccess) {
      // closeModal();
      setSnackbar({
        show: true,
        message: `You have successfully added new members to ${groupName}`,
        severity: "success",
      });
    }
  }, [isSuccess, setSnackbar, groupName, closeModal]);

  useEffect(() => {
    if (isError) {
      // closeModal();
      setSnackbar({
        show: true,
        message: `Sorry, an error occurred while adding new members to ${groupName}. Please try again later.`,
        severity: "error",
      });
    }
  }, [isError, setSnackbar, groupName, closeModal]);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1">Invite a New Member to</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {groupName}
          </Typography>
        </Box>
        <Typography variant="subtitle2">
          Enter the email address of the person you'd like to invite
        </Typography>
        <EmailSearchForm
         selectedItemsSectionHeight="100px"
          selectedEmailList={groupUserList}
          selectEmail={selectEmail}
          unselectEmail={unselectEmail}
          groupId={groupId}
        />
        <CustomButton
          disabled={groupUserList.length === 0}
          sx={{ width: "100%" }}
          onClick={() => executeAddGroupMembers()}
          >
          Invite Members
        </CustomButton>
      </Stack>
      {/* <Stack spacing={1}>
        <Typography variant="subtitle2">
          Or, share the invitation link directly
        </Typography>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            value="https://settle-up/groupInvitation/1254"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: grey[500],
              },
            }}
          />
          <Tooltip title={copySuccess ? copySuccess : "Copy to clipboard"}>
            <IconButton
              onClick={handleCopyClick}
              edge="end"
              sx={{ color: theme.palette.primary.main }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack> */}
    </Stack>
  );
};

export default AddMembersContent;
