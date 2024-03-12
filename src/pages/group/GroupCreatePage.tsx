import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { useMutation } from "react-query";
import CustomButton from "@components/CustomButton";
import StandardLabeledInput from "@components/StandardLabeledInput";
import { createNewGroup } from "@apis/group/createNewGroup";
import CustomModal from "@components/CustomModal";
import EmailSearchForm from "@components/EmailSearchForm";

const GroupCreatePage = () => {
  const navigate = useNavigate();
  const [newGroup, setNewGroup] = useState<{
    groupName: string;
    groupUserList: GeneralUser[];
  }>({
    groupName: "",
    groupUserList: [],
  });

  const [groupNameError, setGroupNameError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const createNewGroupMutation = useMutation(createNewGroup, {
    onSuccess: () => {
      setIsSuccessModalOpen(true);
    },
  });

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  // const { data: userEmailList, isLoading, error } = userEmailListQuery;
  // const userEmailList: User[] = [
  //   { userId: "1", userEmail: "soo@gmail.com" },
  //   { userId: "2", userEmail: "soop@gmail.com" },
  //   { userId: "3", userEmail: "soopa@gmail.com" },
  // ];

  const validateGroupName = (groupName: string) => {
    if (groupName.trim().length < 2) {
      setGroupNameError("Group name must be at least 2 characters");
      return false;
    } else {
      setGroupNameError("");
      return true;
    }
  };

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = event.target.value;
    setNewGroup((prevGroup) => ({
      ...prevGroup,
      groupName: val,
    }));
    validateGroupName(val);
  };

  const handleEmailSelection = (user: GeneralUser) => {
    setNewGroup((prevGroup) => ({
      ...prevGroup,
      groupUserList: [
        ...prevGroup.groupUserList,
        { userId: user!.userId!, userEmail: user!.userEmail! },
      ],
    }));
  };

  const handleEmailUnselection = (user: GeneralUser) => {
    setNewGroup((prevGroup) => ({
      ...prevGroup,
      groupUserList: prevGroup.groupUserList.filter(
        (groupUser) => groupUser.userId !== user.userId
      ),
    }));
  };

  const handleCreateGroupClick = () => {
    const currentUserId = sessionStorage.getItem("userId")!;

    let userIds = newGroup.groupUserList.map((user) => user.userId);

    if (!userIds.includes(currentUserId)) {
      userIds = [currentUserId, ...userIds];
    }

    const requestData = {
      ...newGroup,
      groupMemberCount: userIds.length,
      groupUserList: userIds,
    };

    createNewGroupMutation.mutate(requestData);
  };

  return (
    <>
      <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
        <Box>
          <StandardLabeledInput
            error={!!groupNameError}
            errorText={groupNameError}
            handleInputChange={handleGroupNameChange}
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
              handleEmailSelection={handleEmailSelection}
              handleEmailUnselection={handleEmailUnselection}
            />
          </Box>
        </Box>
        <CustomButton
          buttonStyle="default"
          disabled={newGroup.groupName.trim().length <= 1}
          onClick={handleCreateGroupClick}
          sx={{ width: { xs: "100%", sm: "100%" } }}
        >
          Create
        </CustomButton>
      </Stack>
      <CustomModal
        ariaLabel="Add New Member"
        isOpen={isSuccessModalOpen}
        handleClose={handleModalClose}
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
          onClick={handleModalClose}
        >
          Go Home
        </CustomButton>
      </CustomModal>
    </>
  );
};

export default GroupCreatePage;
