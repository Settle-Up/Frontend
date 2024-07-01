import { Fragment, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { searchUserEmailList } from "@apis/search/searchUserEmailList";
import theme from "@theme";
import { grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

type EmailSearchFormProps = {
  selectedItemsSectionHeight?: string;
  selectedEmailList: GeneralUser[];
  selectEmail: (user: GeneralUser) => void;
  unselectEmail: (user: GeneralUser) => void;
  groupId?: string;
};

const EmailSearchForm = ({
  selectedItemsSectionHeight = "200px",
  selectedEmailList,
  selectEmail,
  unselectEmail,
  groupId
}: EmailSearchFormProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const [email, setEmail] = useState("");
  const selectedEmailListContainerRef = useRef<HTMLDivElement>(null);
  const [prevLength, setPrevLength] = useState(0);

  const {
    data,
    isLoading,
    isError,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    remove,
    refetch,
  } = useInfiniteQuery(
    "userEmailList",
    ({ pageParam = 1 }) =>
      searchUserEmailList({ page: pageParam, query: email, groupId }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNextPage) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
      enabled: false,
      staleTime: 0,
      cacheTime: 0,
    }
  );

  const executeEmailSearch = (
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (
      (event as React.KeyboardEvent<HTMLDivElement>).key === "Enter" ||
      event.type === "click"
    ) {
      event.preventDefault();
      if (hasEmailInput) {
        refetch();
      }
    }
  };

  const lastElementRef = useIntersectionObserver({
    isError,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const renderSkeletons = () =>
    [...Array(10)].map((_, index) => (
      <ListItemButton key={index}>
        <Skeleton
          variant="text"
          width={170}
          sx={{ fontSize: "16px" }}
          animation="wave"
        />
      </ListItemButton>
    ));

  useEffect(() => {
    if (email.trim() === "") {
      remove();
    }
  }, [email, remove]);

  const hasEmailInput = email.trim().length !== 0;

  const lastSuccessfullyFetchedPage = data?.pages.length || 0;

  useEffect(() => {
    if (isError && lastSuccessfullyFetchedPage > 0) {
      setSnackbar({
        show: true,
        message:
          "Sorry, we encountered an issue loading more results. Please try again later.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar, lastSuccessfullyFetchedPage]);

  const shouldShowDropdown =
    isFetching || isError || (email.trim().length > 0 && data !== undefined);

    useEffect(() => {
      const currentLength = selectedEmailList.length;
      if (selectedEmailListContainerRef.current && currentLength > prevLength) {
        const element = selectedEmailListContainerRef.current;
        element.scrollTop = element.scrollHeight;
      }
      setPrevLength(currentLength);
    }, [selectedEmailList]); 

  return (
    <>
      <Box ref={selectedEmailListContainerRef} className="custom-scrollbar" sx={{ display: "flex", flexWrap: "wrap", mb: 1, gap: 2, mt: 0, maxHeight: selectedItemsSectionHeight, overflow:"auto"}}>
        {selectedEmailList?.map((user: GeneralUser) => (
          <Chip
            key={user.userId}
            label={user.userEmail}
            onDelete={() => unselectEmail(user)}
          />
        ))}
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <TextField
            aria-labelledby="email-input"
            fullWidth
            placeholder="Search by Email"
            sx={{ mb: 2 }}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            variant="outlined"
            onKeyDown={executeEmailSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    sx={{
                      p: 0.5,
                      color: hasEmailInput ? theme.palette.primary.main : null,
                    }}
                    aria-label="search"
                    disabled={!hasEmailInput}
                    onClick={executeEmailSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {shouldShowDropdown && (
            <Paper
              id="searchListContainer"
              elevation={5}
              className="custom-scrollbar"
              sx={{
                borderRadius: 3,
                maxHeight: "400px",
                overflow: "auto",
              }}
            >
              {lastSuccessfullyFetchedPage === 0 && isError && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: grey[500],
                    textAlign: "center",
                    m: 2,
                  }}
                >
                  Sorry, we encountered an issue retrieving the search results.
                  <br />
                  Please try again later.
                </Typography>
              )}
              {data && data.pages[0].searchList.length === 0 && (
                <Typography variant="subtitle2" sx={{ p: 2 }}>
                  No matching users found
                </Typography>
              )}
              {data && data.pages[0].searchList.length > 0 && (
                <List>
                  {data.pages?.map((page, i) => (
                    <Fragment key={i}>
                      {page.searchList.map((user) => (
                        <ListItemButton
                          key={user.userId}
                          disabled={
                            selectedEmailList.findIndex(
                              (email) => email.userId === user.userId
                            ) !== -1
                          }
                          onClick={() => selectEmail(user)}
                          sx={{
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: theme.palette.tertiary.light,
                            },
                          }}
                        >
                          <Typography variant="subtitle2">
                            {user.userEmail}
                          </Typography>
                        </ListItemButton>
                      ))}
                    </Fragment>
                  ))}
                </List>
              )}
              {(isLoading || isFetchingNextPage) && renderSkeletons()}
              {!isError && (
                <div
                  ref={hasNextPage ? lastElementRef : undefined}
                  style={{
                    display: hasNextPage ? "inline" : "none",
                    border: "1px solid blue",
                  }}
                />
              )}
            </Paper>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default EmailSearchForm;
