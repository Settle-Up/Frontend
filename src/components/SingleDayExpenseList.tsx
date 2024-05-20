import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {
  Paper,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import theme from "@theme";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";

type SingleDayExpenseListProps = {
  date: string;
  singleDayExpenseList: UserSpecificExpenseSummary[];
};

const SingleDayExpenseList = ({
  date,
  singleDayExpenseList,
}: SingleDayExpenseListProps) => {
  const navigate = useNavigate();
  const { groupId } = useParams();


  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" sx={{ pl: 1}}>{date}</Typography>
      <Paper elevation={1} sx={{ backgroundColor: "white", borderRadius: 3 }}>
        <List>
          {singleDayExpenseList?.map(
            ({
              receiptId,
              receiptName,
              payerUserName,
              totalPrice,
              userOwedAmount,
            }: UserSpecificExpenseSummary) => (
              <ListItem
                key={receiptId}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/groups/${groupId}/expenses/${receiptId}`);
                }}
              >
                <ListItemText
                  primary={
                    <span style={{ fontWeight: 600 }}>{receiptName}</span>
                  }
                  secondary={
                    <span
                      style={{ color: grey[500] }}
                    >{`${payerUserName} paid ${formatNumberWithLocaleAndNegatives(
                      totalPrice
                    )}₩`}</span>
                  }
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    wordBreak: "normal",
                    color:
                      userOwedAmount === "0"
                        ? "black"
                        : userOwedAmount.startsWith("-")
                        ? orange[700]
                        : theme.palette.primary.main,
                  }}
                >
                  {`${formatNumberWithLocaleAndNegatives(userOwedAmount)}₩`}
                </Typography>
              </ListItem>
            )
          )}
        </List>
      </Paper>
    </Stack>
  );
};

export default SingleDayExpenseList;
