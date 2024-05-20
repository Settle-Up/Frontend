import { useParams } from "react-router-dom";
import {
  Box,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { getGroupExpenseDetails } from "@apis/group/getGroupExpenseDetails";
import ExpenseDetails from "@components/ExpenseDetails";
import { grey } from "@mui/material/colors";

const GroupExpensePage = () => {
  let { receiptId } = useParams();

  const { data, isLoading, isError } = useQuery(
    "expenseDetails",
    () => {
      if (receiptId) {
        return getGroupExpenseDetails({ receiptId });
      }
      throw new Error("Receipt Id is missing");
    }
  );

  const renderSkeletons = () => {
    return (
      <>
        <Skeleton
          variant="text"
          width={130}
          height={30}
          sx={{ alignSelf: "center" }}
        />
        <Paper sx={{ backgroundColor: "white", borderRadius: 3, padding: 3 }}>
          <Stack spacing={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Box key={`skeleton-top-${index}`}>
                <Skeleton variant="text" width={100} height={30} />
                <Skeleton variant="text" width={150} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Skeleton variant="rectangular" width="100%" height={150} />
          <Divider />
          <Stack spacing={2}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Box key={`skeleton-bottom-${index}`}>
                <Skeleton variant="text" width={100} height={30} />
                <Skeleton variant="text" width={150} />
              </Box>
            ))}
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Stack>
        </Paper>
      </>
    );
  };

  return (
    <Stack spacing={1}>
      {isError && (
        <Typography
          sx={{
            color: grey[500],
            textAlign: "center",
            m: 5,
          }}
        >
          Sorry, we encountered an issue retrieving your group expense.
          <br />
          Please try again later.
        </Typography>
      )}
      {isLoading && renderSkeletons()}
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        {data?.groupExpense.receiptName}
      </Typography>
      {data?.groupExpense && (
        <ExpenseDetails
          createdAt={data?.groupExpense.createdAt}
          expense={data?.groupExpense}
        />
      )}
    </Stack>
  );
};

export default GroupExpensePage;
