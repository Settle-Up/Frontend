import { Box, ListItem, Stack, Skeleton, Typography } from "@mui/material";

const GroupSummaryCardSkeleton = () => {
  return (
    <ListItem
      dense
      sx={{
        px: 3,
        py: 2,
        borderRadius: 3,
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Stack
          sx={{
            wordBreak: "break-all",
            flexWrap: "wrap",
            width: { xs: "100%", sm: "60%" },
          }}
        >
          <Skeleton
            variant="text"
            width="50%"
            sx={{ fontSize: "16px" }}
            animation="wave"
          />
          <Skeleton
            variant="text"
            width="60%"
            sx={{ fontSize: "14px" }}
            animation="wave"
          />
        </Stack>
        <Box
          sx={{
            width: { xs: "100%", sm: "38%" },
            display: "flex",
            justifyContent: { xs: "left", sm: "right" },
          }}
        >
          <Skeleton variant="rectangular" width={100} height={24} />
        </Box>
      </Box>
    </ListItem>
  );
};

export default GroupSummaryCardSkeleton;
