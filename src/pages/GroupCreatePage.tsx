import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  List,
  ListItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import CustomButton from "@components/CustomButton";
import StandardLabeledInput from "@components/StandardLabeledInput";
import { searchUserEmailList } from "@apis/search/searchUserEmailList";
import { createNewGroup } from "@apis/group/createNewGroup";
import CustomModal from "@components/CustomModal";

const GroupCreatePage = () => {
  const navigate = useNavigate();
  const [newGroup, setNewGroup] = useState<{
    groupName: string;
    groupUserList: GeneralUser[];
  }>({
    groupName: "",
    groupUserList: [],
  });
  const [email, setEmail] = useState("");
  const [groupNameError, setGroupNameError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const createNewGroupMutation = useMutation(createNewGroup, {
    onSuccess: () => {
      setIsSuccessModalOpen(true);
    },
  });

  const {
    data: userEmailList,
    isFetching,
    error,
    refetch,
  } = useQuery("userEmailList", () => searchUserEmailList(email), {
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });


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

    const modifiedGroup = {
      ...newGroup,
      groupMemberCount: userIds.length,
      groupUserList: userIds,
    };

    createNewGroupMutation.mutate(modifiedGroup);
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  const GroupCreationSuccessModal = () => (
    <CustomModal
      ariaLabel="Add New Member"
      isOpen={isSuccessModalOpen}
      handleClose={handleModalClose}
    >
      <Typography variant="subtitle1">Awesome!</Typography>
      <Typography variant="h6" color="text.secondary">
        {newGroup.groupName} example
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
  );

  return (
    <>
      <StandardLabeledInput
        ariaLabel="Add a group name"
        label="Group Name *"
        handleInputChange={handleGroupNameChange}
        error={!!groupNameError}
        helperText={groupNameError}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography id="email-input" gutterBottom variant="subtitle2">
          Email
        </Typography>
        <Box sx={{ display: "flex", marginBottom: 1, gap: 2 }}>
          {newGroup.groupUserList?.map((user) => (
            <Chip
              key={user.userId}
              label={user.userEmail}
              onDelete={() => handleEmailUnselection(user)}
            />
          ))}
        </Box>
        <Stack spacing={1} direction="row" alignItems="center">
          <TextField
            aria-labelledby="email-input"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <CustomButton
            type="submit"
            buttonStyle="default"
            disabled={email.trim().length === 0}
            sx={{ flex: 0 }}
            onClick={(event) => {
              event.preventDefault();
              refetch();
            }}
          >
            Search
          </CustomButton>
        </Stack>
        <Box
          className="custom-scrollbar"
          sx={{
            p: 2,
            m: 2,
            backgroundColor: "white",
            borderRadius: 3,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          {isFetching ? (
            <List>
              {[...new Array(5)].map((_, index) => (
                <ListItem key={index}>
                  <Skeleton
                    variant="text"
                    width={200}
                    height={40}
                    animation="wave"
                  />
                </ListItem>
              ))}
            </List>
          ) : userEmailList && userEmailList.length > 0 ? (
            <List>
              {userEmailList.map((user: GeneralUser) => (
                <ListItem
                  key={user?.userId}
                  onClick={() => handleEmailSelection(user)}
                >
                  {user?.userEmail}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No matching users found.</Typography>
          )}
        </Box>
      </Box>
      <CustomButton
        buttonStyle="default"
        disabled={newGroup.groupName.trim().length <= 1}
        onClick={handleCreateGroupClick}
      >
        Create
      </CustomButton>
      {GroupCreationSuccessModal()}
    </>
  );
};

export default GroupCreatePage;
