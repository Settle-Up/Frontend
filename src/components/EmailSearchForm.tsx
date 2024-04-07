import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Chip,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { searchUserEmailList } from "@apis/search/searchUserEmailList";
import theme from "@theme";
import SearchIcon from "@mui/icons-material/Search";

export type EmailSearchFormProps = {
  selectedEmailList: GeneralUser[];
  handleEmailSelection: (user: GeneralUser) => void;
  handleEmailUnselection: (user: GeneralUser) => void;
};

const EmailSearchForm = ({
  selectedEmailList,
  handleEmailSelection,
  handleEmailUnselection,
}: EmailSearchFormProps) => {
  const [email, setEmail] = useState("");

  const {
    data: userEmailList,
    isFetching,
    error,
    refetch,
    remove,
  } = useQuery("userEmailList", () => searchUserEmailList(email), {
    enabled: false,
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (email.trim() === "") {
      remove();
    }
  }, [email, remove]);

  const handleSearch = (
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

  const shouldDisplayContent =
    isFetching || (email.trim().length > 0 && userEmailList !== undefined);

  const hasEmailInput = email.trim().length !== 0;

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 1, gap: 2, mt: 0 }}>
        {selectedEmailList?.map((user: GeneralUser) => (
          <Chip
            key={user.userId}
            label={user.userEmail}
            onDelete={() => handleEmailUnselection(user)}
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
            onKeyDown={handleSearch}
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
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {shouldDisplayContent && (
            <Paper
              elevation={5}
              className="custom-scrollbar"
              sx={{
                borderRadius: 3,
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
              ) : userEmailList && userEmailList?.length > 0 ? (
                <List>
                  {userEmailList.map((user) => (
                    <ListItem
                      key={user.userId}
                      onClick={() => handleEmailSelection(user)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.tertiary.light,
                        },
                      }}
                    >
                      {user.userEmail}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography sx={{ p: 2 }}>No matching users found</Typography>
              )}
            </Paper>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default EmailSearchForm;
