import { Divider, Typography } from "@mui/material";
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

type GeneralExpenseDescriptionProps = {
  createdAt?: string;
  receiptName: string;
  address: string;
  receiptDate: string;
  receiptTotalPrice: string;
  itemOrderDetailsList: ItemOrderDetails[];
};
const GeneralExpenseDescription = ({
  createdAt,
  receiptName,
  address,
  receiptDate,
  receiptTotalPrice,
  itemOrderDetailsList,
}: GeneralExpenseDescriptionProps) => {
  return (
    <>
      {createdAt && (<LabelValuePair label="Submission Date" value={createdAt.split("T")[0]} />)}
      <LabelValuePair label="Receipt Name" value={receiptName} />
      <LabelValuePair label="Merchant Address" value={address} />
      <LabelValuePair label="Transaction Date" value={receiptDate} />
      <LabelValuePair label="Total Price" value={`${receiptTotalPrice}₩`} />
      <Divider />
      <AllItemSummaryTable itemOrderDetailsList={itemOrderDetailsList} />
    </>
  );
};

export default GeneralExpenseDescription;
