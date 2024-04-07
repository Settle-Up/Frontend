import { Divider, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import AllItemSummaryTable from "@components/AllItemSummaryTable";

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

const GeneralExpenseDescription = () => {
    const {
      receiptName,
      address,
      receiptDate,
      receiptTotalPrice,
      discountApplied,
      actualPaidPrice,
    } = useRecoilValue(newExpenseState);

  return (
   <>
      <LabelValuePair label="Receipt Name" value={receiptName} />
      <LabelValuePair label="Merchant Address" value={address} />
      <LabelValuePair label="Transaction Date" value={receiptDate} />
      <LabelValuePair label="Total Price" value={`${receiptTotalPrice}₩`} />
      <LabelValuePair label="Discount Applied" value={`${discountApplied}₩`} />
      <LabelValuePair label="Actual Paid Price" value={`${actualPaidPrice}₩`} />
      <Divider />
      <AllItemSummaryTable />
    </>
  );
};

export default GeneralExpenseDescription;
