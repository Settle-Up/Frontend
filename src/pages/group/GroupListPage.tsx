import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomIconButton from "@components/CustomIconButton";
import { useRecoilValue } from "recoil";
import { useInfiniteQuery } from "react-query";
import { getGroupSummaryList } from "@apis/group/getGroupSummaryList";
import GroupSummaryCard from "@components/GroupSummaryCard";
import GroupSummaryCardSkeleton from "@components/GroupSummaryCardSkeleton";
import { mockJoinedGroupList } from "@mock/groupMock";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRecoilState } from "recoil";
import { updatedTransactionsAlertState } from "@store/TxUpdateAlertsModalStore";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomModal from "@components/CustomModal";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import {
  UseInfiniteQueryOptions,
  InfiniteQueryObserverResult,
} from "react-query";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

const GroupListPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const setSnackbar = useSetRecoilState(snackbarState);

  const [{ updatedTransactionList }, setUpdatedTransactionsAlert] =
    useRecoilState(updatedTransactionsAlertState);

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<GroupSummaryListResponse, Error>(
    "groupSummaryList",
    ({ pageParam = 1 }) => getGroupSummaryList({ page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
      onError: () => {
        setSnackbar({
          show: true,
          message: "Sorry, an error occurred while loading more groups. Please try again later.",
          severity: "error",
        });
      },
    } as UseInfiniteQueryOptions<GroupSummaryListResponse, Error>
  );


  const lastGroupRef = useIntersectionObserver({
    containerId: "groupListContainer",
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  // const groupSummaryList = mockJoinedGroupList;


  const renderSkeletons = () => {
    const skeletonCount = isXsScreen ? 5 : isSmScreen ? 7 : 8;
    return [...Array(skeletonCount)].map((_, index) => (
      <GroupSummaryCardSkeleton key={index} />
    ));
  };

  // if (!isLoading && groupSummaryList) {

  //   groupSummaryList?.sort((a, b) => {
  //     if (!a.lastActive) return 1;
  //     if (!b.lastActive) return -1;
  //     return b.lastActive.diff(a.lastActive);
  //   });
  // }

  const [sortedGroupSummaryList, setSortedGroupSummaryList] = useState<
    JoinedGroupSummary[] | null
  >(null);

  // useEffect(() => {
  //   if (data?.pages) {
  //     const sortedList = data?.pages
  //       ? [...groupSummaryList].sort((a, b) => {
  //           if (!a.lastActive) return 1;
  //           if (!b.lastActive) return -1;
  //           return b.lastActive.diff(a.lastActive);
  //         })
  //       : [];
  //     setSortedGroupSummaryList(sortedList);
  //   }
  // }, [groupSummaryList]);

  const handleGroupCardClick = (groupId: string) => {
    navigate(`/groups/${groupId}/detail`);
  };

  console.log("!!!!!!!!!!!!!!!!!!!!DATA RETURNED BY USE QUERY", isError, isLoading, isFetchingNextPage);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          position: "relative",
          alignSelf: "center",
        }}
      >
        Settle Up
      </Typography>
      <Box sx={{ display: "flex", gap: 1, position: "absolute", right: 30 }}>
        <IconButton
          color="primary"
          aria-label="View Transaction Updates Require User's Review"
          onClick={() =>
            setUpdatedTransactionsAlert((prev) => ({ ...prev, isOpen: true }))
          }
          sx={{ height: "40px", width: "40px" }}
        >
          <Badge
            badgeContent={updatedTransactionList?.length ?? null}
            color="primary"
          >
            <NotificationsIcon color="action" />
          </Badge>
        </IconButton>
        <IconButton
          color="primary"
          aria-label="View Transaction Updates Require User's Review"
          onClick={() => setIsSettingsModalOpen(true)}
          sx={{ height: "40px", width: "40px" }}
        >
          <SettingsIcon color="action" />
        </IconButton>
      </Box>
      <Stack sx={{ flexGrow: 1 }}>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle2"> Groups </Typography>
            <CustomIconButton
              ariaLabel="Create New Group"
              handleClick={() => navigate("/groups/create")}
              icon={<AddIcon />}
              shape="square"
            />
          </Box>
          <Paper
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              flexGrow: 1,
            }}
          >
            <Stack id="groupListContainer" sx={{ flexGrow: 1 }}>
              {isLoading && isError && (
                <Typography
                  sx={{
                    color: grey[500],
                    textAlign: "center",
                    m: 5,
                  }}
                >
                  Seems like there was an issue. <br />
                  <br />
                  Please try again later.
                </Typography>
              )}
              {data && data.pages.length === 0 && (
                <Typography
                  sx={{
                    color: grey[500],
                    textAlign: "center",
                    m: 5,
                  }}
                >
                  Seems like you haven't joined any groups yet. <br />
                  <br />
                  Create or join a group to simplify expense management and stay
                  on top of your finances together!
                </Typography>
              )}
              {data &&
                data.pages.length > 0 &&
                data.pages?.map((page, i) => (
                  <Fragment key={i}>
                    {page.groupList?.map((group: JoinedGroupSummary) => (
                      <GroupSummaryCard
                        key={group.groupId}
                        group={group}
                        handleClick={handleGroupCardClick}
                      />
                    ))}
                  </Fragment>
                ))}
              {(isLoading || isFetchingNextPage) && renderSkeletons()}
              {!isError && <div
                ref={hasNextPage ? lastGroupRef : undefined}
                style={{
                  display: hasNextPage ? "inline" : "none",
                  border: "3px solid blue",
                }}
              />}
            </Stack>
          </Paper>
        </Stack>
        <CustomIconButton
          ariaLabel="Add New Receipt"
          handleClick={() => navigate("/expense/upload")}
          icon={<AddIcon sx={{ fontSize: "36px" }} />}
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
      {isSettingsModalOpen && (
        <CustomModal
          ariaLabel="View Settings"
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          showCloseButton
        >
          <Typography variant="subtitle1" color="text.secondary">
            Preference Settings
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ width: "65%", wordBreak: "normal", textAlign: "left" }}
            >
              Only Show Expenses I Was Involved in Across All Groups{" "}
            </Typography>
            <Switch />
          </Box>
          <Divider sx={{ my: 0.5 }} />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ width: "65%", wordBreak: "normal", textAlign: "left" }}
            >
              Show Monetary Values With up to Two Decimal Points
            </Typography>
            <Switch />
          </Box>
        </CustomModal>
      )}
    </>
  );
};

export default GroupListPage;

// return (
//   <>
//     <Typography
//       variant="h6"
//       sx={{
//         position: "relative",
//         alignSelf: "center",
//       }}
//     >
//       Settle Up
//     </Typography>
//     <Box sx={{ display: "flex", gap: 1, position: "absolute", right: 30 }}>
//       <IconButton
//         color="primary"
//         aria-label="View Transaction Updates Require User's Review"
//         onClick={() =>
//           setUpdatedTransactionsAlert((prev) => ({ ...prev, isOpen: true }))
//         }
//         sx={{ height: "40px", width: "40px" }}
//       >
//         <Badge
//           badgeContent={updatedTransactionList?.length ?? null}
//           color="primary"
//         >
//           <NotificationsIcon color="action" />
//         </Badge>
//       </IconButton>
//       <IconButton
//         color="primary"
//         aria-label="View Transaction Updates Require User's Review"
//         onClick={() => setIsSettingsModalOpen(true)}
//         sx={{ height: "40px", width: "40px" }}
//       >
//         <SettingsIcon color="action" />
//       </IconButton>
//     </Box>
//     <Stack sx={{ flexGrow: 1 }}>
//       <Stack spacing={2} sx={{ flexGrow: 1 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Typography variant="subtitle2"> Groups </Typography>
//           <CustomIconButton
//             ariaLabel="Create New Group"
//             handleClick={() => navigate("/groups/create")}
//             icon={<AddIcon />}
//             shape="square"
//           />
//         </Box>
//         <Paper
//           sx={{
//             backgroundColor: "white",
//             borderRadius: 3,
//             flexGrow: 1,
//           }}
//         >
//           <Stack sx={{ flexGrow: 1 }}>
//             {false ? (
//               renderSkeletons()
//             ) :
//             sortedGroupSummaryList &&
//               (sortedGroupSummaryList?.length ?? 0) > 0 ? (
//               sortedGroupSummaryList?.map((group: JoinedGroupSummary) => (
//                 <GroupSummaryCard
//                   key={group.groupId}
//                   group={group}
//                   handleClick={handleGroupCardClick}
//                 />
//               ))
//             ) : (
//               <Typography
//                 sx={{
//                   color: grey[500],
//                   textAlign: "center",
//                   m: 5,
//                 }}
//               >
//                 Seems like you haven't joined any groups yet. <br />
//                 <br />
//                 Create or join a group to simplify expense management and stay
//                 on top of your finances together!
//               </Typography>
//             )}
//           </Stack>
//         </Paper>
//       </Stack>
//       <CustomIconButton
//         ariaLabel="Add New Receipt"
//         handleClick={() => navigate("/expense/upload")}
//         icon={<AddIcon sx={{ fontSize: "36px" }} />}
//         shape="round"
//         sx={{
//           position: "sticky",
//           bottom: 0,
//           left: 600,
//           boxShadow: 4,
//           zIndex: 1000,
//           alignSelf: "flex-end",
//         }}
//       />
//     </Stack>
//     {isSettingsModalOpen && (
//       <CustomModal
//         ariaLabel="View Settings"
//         isOpen={isSettingsModalOpen}
//         handleClose={() => setIsSettingsModalOpen(false)}
//         showCloseButton
//       >
//         <Typography variant="subtitle1" color="text.secondary">
//           Preference Settings
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             width: "100%",
//             alignItems: "center",
//             gap: 4,
//           }}
//         >
//           <Typography
//             variant="subtitle2"
//             sx={{ width: "65%", wordBreak: "normal", textAlign: "left" }}
//           >
//             Only Show Expenses I Was Involved in Across All Groups{" "}
//           </Typography>
//           <Switch />
//         </Box>
//         <Divider sx={{ my: 0.5 }} />
//         <Box
//           sx={{
//             display: "flex",
//             width: "100%",
//             alignItems: "center",
//             gap: 4,
//           }}
//         >
//           <Typography
//             variant="subtitle2"
//             sx={{ width: "65%", wordBreak: "normal", textAlign: "left" }}
//           >
//             Show Monetary Values With up to Two Decimal Points
//           </Typography>
//           <Switch />
//         </Box>
//       </CustomModal>
//     )}
//   </>
// );
