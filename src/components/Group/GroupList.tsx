import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Stack, Typography } from "@mui/material";
import GroupSummaryCard from "@components/Group/GroupSummaryCard";
import GroupSummaryCardSkeleton from "@components/Group/GroupSummaryCardSkeleton";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { useInfiniteQuery } from "react-query";
import { getGroupList } from "@apis/groups/getGroupList";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import useMediaQuery from "@mui/material/useMediaQuery";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { useEffect } from "react";

const GroupList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const setSnackbar = useSetRecoilState(snackbarState);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "groupSummaryList",
    ({ pageParam = 1 }) => getGroupList({ page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

  const lastElementRef = useIntersectionObserver({
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const lastSuccessfullyFetchedPage = data?.pages.length || 0;

  useEffect(() => {
    if (isError && lastSuccessfullyFetchedPage > 0) {
      setSnackbar({
        show: true,
        message:
          "Sorry, we encountered an issue loading more groups. Please try again later.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar, lastSuccessfullyFetchedPage]);

  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const renderSkeletons = () => {
    const skeletonCount = isXsScreen ? 5 : isSmScreen ? 7 : 8;
    return [...Array(skeletonCount)].map((_, index) => (
      <GroupSummaryCardSkeleton key={index} />
    ));
  };

  const navigateToGroupDetail = (groupId: string) => {
    navigate(`/groups/${groupId}/detail`);
  };

  return (
    <Paper
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        flexGrow: 1,
      }}
    >
      <Stack id="groupListContainer" sx={{ flexGrow: 1 }}>
        {lastSuccessfullyFetchedPage === 0 && isError && (
          <Typography
            sx={{
              color: grey[500],
              textAlign: "center",
              m: 5,
            }}
          >
            Sorry, we encountered an issue retrieving your groups.
            <br />
            Please try again later.
          </Typography>
        )}
        {data && data.pages[0]?.dataList.length === 0 && (
          <Typography
            sx={{
              color: grey[500],
              textAlign: "center",
              m: 5,
            }}
          >
            Seems like you haven't joined any groups yet. <br />
            <br />
            Create or join a group to simplify expense management and stay on
            top of your finances together!
          </Typography>
        )}
        {data &&
          data.pages.length > 0 &&
          data.pages?.map((page, i) => (
            <Fragment key={i}>
              {page.dataList?.map((group: JoinedGroupSummary) => (
                <GroupSummaryCard
                  key={group.groupId}
                  group={group}
                  handleClick={navigateToGroupDetail}
                />
              ))}
            </Fragment>
          ))}
        {(isLoading || isFetchingNextPage) && renderSkeletons()}
        {!isError && (
          <div
            ref={hasNextPage ? lastElementRef : undefined}
            style={{
              display: hasNextPage ? "inline" : "none",
              border: "3px solid blue",
            }}
          />
        )}
      </Stack>
    </Paper>
  );
};

export default GroupList;
