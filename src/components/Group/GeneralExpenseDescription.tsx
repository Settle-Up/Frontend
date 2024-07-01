import { Divider, Typography } from "@mui/material";
import AllItemSummaryTable from "@components/AllItemSummaryTable";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";

type LabelValuePairProps = {
  label: string;
  value: string | number;
};

const LabelValuePair = ({ label, value }: LabelValuePairProps) => (
  <>
    <Typography variant="subtitle2">{label}</Typography>
    <Typography gutterBottom color="text.secondary" variant="body1">
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
  itemList: Item[];
  showReceiptName?: boolean;
};
const GeneralExpenseDescription = ({
  createdAt,
  receiptName,
  address,
  receiptDate,
  receiptTotalPrice,
  itemList,
  showReceiptName = false,
}: GeneralExpenseDescriptionProps) => {
  const formatToKoreanWon = useFormatNumberAsKoreanWon();

  return (
    <>
      {createdAt && (
        <LabelValuePair
          label="Submission Date"
          value={createdAt.split("T")[0]}
        />
      )}
      {showReceiptName && (
        <LabelValuePair label="Receipt Name" value={receiptName} />
      )}
      <LabelValuePair label="Merchant Address" value={address} />
      <LabelValuePair label="Transaction Date" value={receiptDate} />
      <LabelValuePair
        label="Total Price"
        value={formatToKoreanWon(receiptTotalPrice)}
      />
      <Divider />
      <AllItemSummaryTable itemList={itemList} />
    </>
  );
};

export default GeneralExpenseDescription;
