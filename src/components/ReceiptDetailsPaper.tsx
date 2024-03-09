import { Divider, Typography, Paper } from "@mui/material";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import ItemPriceTable from "@components/ItemPriceTable";
import mockExpense from "@mock/receiptMock";

type LabelValuePairProps = {
  label: string;
  value: string | number;
};

const LabelValuePair = ({ label, value }: LabelValuePairProps) => (
  <>
    <Typography variant="subtitle2">{label}</Typography>
    <Typography gutterBottom color="text.secondary">
      {value}
    </Typography>
  </>
);

const ReceiptDetailsPaper = () => {
  //   const {
  //     receiptName,
  //     address,
  //     receiptDate,
  //     receiptTotalPrice,
  //     discountApplied,
  //     actualPaidPrice,
  //   } = useRecoilValue(newExpenseState);
  const {
    receiptName,
    address,
    receiptDate,
    receiptTotalPrice,
    discountApplied,
    actualPaidPrice,
  } = mockExpense;

  return (
    <Paper
      elevation={3}
      sx={{ backgroundColor: "white", borderRadius: 3, p: 4 }}
    >
      <LabelValuePair label="Receipt Name" value={receiptName} />
      <LabelValuePair label="Merchant Address" value={address} />
      <LabelValuePair label="Transaction Date" value={receiptDate} />
      <LabelValuePair label="Total Price" value={`${receiptTotalPrice}₩`} />
      <LabelValuePair label="Discount Applied" value={`${discountApplied}₩`} />
      <LabelValuePair label="Actual Paid Price" value={`${actualPaidPrice}₩`} />
      <Divider />
      <ItemPriceTable />
    </Paper>
  );
};

export default ReceiptDetailsPaper;
