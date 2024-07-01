import { useCallback } from "react";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getGroupMemberList } from "@apis/groups/getGroupMemberList";
import { grey } from "@mui/material/colors";
import useFeedbackHandler from "@hooks/useFeedbackHandler";

type ViewMembersContentProps = {
  groupId: string;
  groupName: string;
  closeModal: () => void;
};

const ViewMembersContent = ({
  groupId,
  groupName,
  closeModal,
}: ViewMembersContentProps) => {
  const {
    data: groupMemberList,
    isError,
    isLoading,
  } = useQuery(["groupMemberList", groupId], () => getGroupMemberList(groupId));

  useFeedbackHandler({
    isError,
    errorMessage: `Failed to load members of '${groupName}'. Please try again later.`,
    errorAction: useCallback(() => {
      closeModal();
    }, []),
  });

  const renderSkeletons = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Stack key={index} sx={{ textAlign: "left" }}>
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="60%" height={20} />
      </Stack>
    ));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1"> Members</Typography>
      <Stack
        spacing={3}
        className="custom-scrollbar"
        sx={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {isLoading
          ? renderSkeletons()
          : groupMemberList?.map(
              ({ userId, userName, userEmail }: GeneralUser) => {
                return (
                  <Stack key={userId} sx={{ textAlign: "left" }}>
                    <Typography variant="subtitle2"> {userName}</Typography>
                    <Typography
                      sx={{ color: grey[600], textDecoration: "underline" }}
                    >
                      {userEmail}
                    </Typography>
                  </Stack>
                );
              }
            )}
      </Stack>
    </Stack>
  );
};

export default ViewMembersContent;
