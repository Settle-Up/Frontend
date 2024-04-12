import React from "react";
import {
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from "@mui/material";

const SingleDayExpenseListSkeleton = () => {
  const dummyItemsCount = 3; // Assuming 5 items for the skeleton

  return (
    <Stack spacing={1}>
      <Skeleton variant="text" width={150} height={30} />
      <Paper elevation={1} sx={{ backgroundColor: "white", borderRadius: 3 }}>
        <List>
          {Array.from(new Array(dummyItemsCount)).map((_, index) => (
            <ListItem
              key={index}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ListItemText
                primary={<Skeleton variant="text" width={100} height={24} />}
                secondary={<Skeleton variant="text" width={150} height={20} />}
              />
              <Skeleton variant="text" width={80} height={24} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
};

export default SingleDayExpenseListSkeleton;
