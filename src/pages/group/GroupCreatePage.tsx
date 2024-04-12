import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import CustomButton from "@components/CustomButton";
import StandardLabeledInput from "@components/StandardLabeledInput";
import { createGroup } from "@apis/group/createGroup";
import EmailSearchForm from "@components/EmailSearchForm";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

const GroupCreatePage = () => {
  const navigate = useNavigate();
  const [newGroup, setNewGroup] = useState<NewGroup>({
    groupName: "",
    groupUserList: [],
  });

  const setSnackbar = useSetRecoilState(snackbarState);

  const [groupNameError, setGroupNameError] = useState("");

  const {
    mutate: executeCreateGroup,
    isSuccess,
    isError,
  } = useMutation(createGroup);

  useEffect(() => {
    if (isSuccess) {
      setSnackbar({
        show: true,
        message: `Awesome! ${newGroup.groupName} is all set up and invites are on their way to your members.`,
        severity: "success",
      });
      navigate("/");
    }
  }, [isSuccess, navigate, setSnackbar, newGroup]);

  useEffect(() => {
    if (isError) {
      setSnackbar({
        show: true,
        message: `Sorry, something went wrong while creating the group "${newGroup.groupName}". Please try again later.`,
        severity: "error",
      });
    }
  }, [isError, setSnackbar]);

  const validateGroupName = (groupName: string) => {
    if (groupName.trim().length < 2) {
      setGroupNameError("Group name must be at least 2 characters");
      return false;
    } else {
      setGroupNameError("");
      return true;
    }
  };

  type UpdateGroupFn = {
    (
      action: "changeGroupName",
      event: React.ChangeEvent<HTMLInputElement>
    ): void;
    (action: "selectEmail", user: GeneralUser): void;
    (action: "unselectEmail", user: GeneralUser): void;
  };

  const updateGroup: UpdateGroupFn = (action, eventOrUser) => {
    setNewGroup((prevGroup) => {
      let updatedGroup = { ...prevGroup };

      if (action === "changeGroupName") {
        const event = eventOrUser as React.ChangeEvent<HTMLInputElement>;
        const groupName = event.target.value;
        updatedGroup.groupName = groupName;
        validateGroupName(groupName);
      } else if (action === "selectEmail" || action === "unselectEmail") {
        const user = eventOrUser as GeneralUser;
        if (action === "selectEmail") {
          updatedGroup.groupUserList = [...prevGroup.groupUserList, user];
        } else {
          updatedGroup.groupUserList = prevGroup.groupUserList.filter(
            (u) => u.userId !== user.userId
          );
        }
      }
      return updatedGroup;
    });
  };

  return (
    <>
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        Create Group
      </Typography>
      <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
        <Stack spacing={4}>
          <StandardLabeledInput
            error={!!groupNameError}
            errorText={groupNameError}
            handleInputChange={(e) => {
              updateGroup("changeGroupName", e);
            }}
            label="Group Name *"
            name="groupName"
            value={newGroup.groupName}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography id="email-input" gutterBottom variant="subtitle2">
              Add Members
            </Typography>
            <EmailSearchForm
              selectedEmailList={newGroup.groupUserList}
              selectEmail={(user: GeneralUser) => {
                updateGroup("selectEmail", user);
              }}
              unselectEmail={(user: GeneralUser) => {
                updateGroup("unselectEmail", user);
              }}
            />
          </Box>
        </Stack>
        <CustomButton
          buttonStyle="default"
          disabled={newGroup.groupName.trim().length <= 1}
          onClick={() => executeCreateGroup(newGroup)}
          sx={{
            alignSelf: "flex-end",
            width: { xs: "100%", sm: "auto" },
            mt: 5,
          }}
        >
          Create
        </CustomButton>
      </Stack>
      {/* <CustomModal
        ariaLabel="Add New Member"
        isOpen={isSuccessModalOpen}
        closeModal={closeModal}
      >
        <Typography variant="subtitle1">Awesome!</Typography>
        <Typography variant="h6" color="text.secondary">
          {newGroup.groupName}
        </Typography>
        <Typography variant="subtitle1">
          is all set up and invites are on their way to your members.
        </Typography>
        <Typography variant="subtitle1">
          Time to streamline your group expenses!
        </Typography>
        <CustomButton
          buttonStyle="default"
          sx={{ width: "100%" }}
          onClick={closeModal}
        >
          Go Home
        </CustomButton>
      </CustomModal> */}
    </>
  );
};

export default GroupCreatePage;
