import { useNavigate } from "react-router-dom";
import { Box, Paper, Stack, Typography } from "@mui/material";
import GeneralExpenseDescription from "@components/Group/GeneralExpenseDescription";
import CustomIconButton from "@components/CustomIconButton";
import EastIcon from "@mui/icons-material/East";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";

const ReceiptFinalReviewPage = () => {
  const navigate = useNavigate();
  const newExpense = useRecoilValue(newExpenseState);

  const { receiptName, address, receiptDate, receiptTotalPrice, itemList } =
    newExpense;

  return (
    <Stack
      sx={{
        flexGrow: 1,
        justifyContent: "space-between",
      }}
    >
      <Box>
      <Typography variant="subtitle1" gutterBottom sx={{ alignSelf: "center" }}>
        Here's How Your Final Receipt Looks
      </Typography>
      <Paper sx={{ backgroundColor: "white", borderRadius: 3, padding: 3 }}>
        <GeneralExpenseDescription
          receiptName={receiptName}
          address={address}
          receiptDate={receiptDate}
          receiptTotalPrice={receiptTotalPrice}
          itemList={itemList}
          showReceiptName
        />
      </Paper>
      </Box>
      <CustomIconButton
        ariaLabel="Move on to next step"
        handleClick={() => navigate("/expense/allocation/settings")}
        icon={<EastIcon sx={{ fontSize: "30px" }} />}
        shape="round"
        sx={{
          alignSelf: "flex-end",
          mt: 5,
        }}
      />
    </Stack>
  );
};

export default ReceiptFinalReviewPage;
