import { Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type DateSelectorProps = {
  label: string;
  name: string;
  onSelectionChange: (e: {
    target: { name: string; value: string | null };
  }) => void;
  selectedOption: string;
};

const DateSelector = ({
  label,
  name,
  onSelectionChange,
  selectedOption,
}: DateSelectorProps) => {
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    const dateString = date ? dayjs(date).format("YYYY-MM-DD") : null;
    onSelectionChange({ target: { name, value: dateString } });
  };

  return (
    <>
      <Typography id={name} gutterBottom variant="subtitle2">
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name={name}
          sx={{ flex: 1 }}
          value={selectedOption ? dayjs(selectedOption) : dayjs()}
          maxDate={dayjs()}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
        />
      </LocalizationProvider>
    </>
  );
};

export default DateSelector;
