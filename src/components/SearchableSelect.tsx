import {
  Autocomplete,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Option = {
  id?: string;
  label: string;
};

type SearchableSelectProps<T extends Option> = {
  ariaLabelledby: string;
  handleSelectionChange: (value: T | T[] | null) => void;
  label?: string;
  possibleOptions: T[];
  selectedOptions: T | T[] | null;
  multiselect?: boolean;
};

const SearchableSelect = <T extends Option>({
  ariaLabelledby,
  handleSelectionChange,
  label,
  possibleOptions,
  selectedOptions,
  multiselect = false,
}: SearchableSelectProps<T>) => {
  let value;
  if (multiselect) {
    value = Array.isArray(selectedOptions) ? selectedOptions : [];
  } else {
    value =
      selectedOptions &&
      !Array.isArray(selectedOptions) &&
      selectedOptions.id !== "" &&
      possibleOptions.some((option) => option.id === selectedOptions.id)
        ? selectedOptions
        : null;
  }

  return (
    <Stack spacing={2}>
      {label && (
        <Typography id="group" variant="subtitle2">
          {label}
        </Typography>
      )}
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          handleSelectionChange(newValue);
        }}
        options={possibleOptions}
        isOptionEqualToValue={(option: T, value) => option.id === value.id}
        multiple={multiselect}
        noOptionsText="There are no matching options."
        ListboxProps={{
          className: "custom-scrollbar",
        }}
        PaperComponent={({ children }) => (
          <Paper elevation={5}>
            {children}
          </Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            aria-labelledby={ariaLabelledby}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
      />
    </Stack>
  );
};

export default SearchableSelect;
