import { useState } from "react";
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

type AddMembersContentProps = {
  groupId: string;
  groupName: string;
};

const AddMembersContent = ({ groupId, groupName }: AddMembersContentProps) => {
  const [newGroupUserList, setNewGroupUserList] = useState<GeneralUser[]>([]);
  const [copySuccess, setCopySuccess] = useState("");

  const handleEmailSelection = (user: GeneralUser) => {
    setNewGroupUserList((prevList) => [...prevList, user]);
  };

  const handleEmailUnselection = (user: GeneralUser) => {
    setNewGroupUserList((prevList) =>
      prevList.filter((groupUser) => groupUser.userId !== user.userId)
    );
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://settle-up/groupInvitation/1254"
      );
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

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
          selectedEmailList={newGroupUserList}
          handleEmailSelection={handleEmailSelection}
          handleEmailUnselection={handleEmailUnselection}
        />
        <CustomButton
          // disabled={}
          sx={{ width: "100%" }}
          onClick={() => {}}
        >
          Invite Members
        </CustomButton>
      </Stack>
      <Stack spacing={1}>
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
      </Stack>
    </Stack>
  );
};

export default AddMembersContent;
