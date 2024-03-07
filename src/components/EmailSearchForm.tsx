import { useEffect, useState } from "react";
import { useQuery } from "react-query";
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
import CustomButton from "@components/CustomButton";
import { searchUserEmailList } from "@apis/search/searchUserEmailList";
import theme from "@theme";

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
    remove
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

  const shouldDisplayContent = isFetching || (email.trim().length > 0 && userEmailList !== undefined); 

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: 1, gap: 2 }}>
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
            variant="outlined"
            sx={{ mb: 2 }}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {shouldDisplayContent && (
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
                  <Skeleton variant="text" width={200} height={40} animation="wave" />
                </ListItem>
              ))}
            </List>
          ) : userEmailList && userEmailList?.length > 0 ? (
            <List >
                  {userEmailList.map((user) => (
                    <ListItem
                      key={user.userId}
                      onClick={() => handleEmailSelection(user)}
                      sx={{
                        cursor: 'pointer', 
                        '&:hover': {
                          backgroundColor: theme.palette.tertiary.light, 
                        },
                      }}
                    >
                      {user.userEmail}
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No matching users found.</Typography>
              )}
            </Box>
          )}
        </Stack>
        <CustomButton
          type="submit"
          buttonStyle="default"
          disabled={email.trim().length === 0}
          sx={{ alignSelf: "flex-start", px: 2 }}
          onClick={(event) => {
            event.preventDefault();
            refetch();
          }}
        >
          Search
        </CustomButton>
      </Box>
    </>
  );
};

export default EmailSearchForm;
