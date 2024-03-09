import { Autocomplete, TextField } from "@mui/material";

type Option = {
  id: string;
  label: string;
};

type SearchableSelectProps<T extends Option> = {
  ariaLabelledby: string;
  handleSelectionChange: (value: T | T[] | null) => void;
  multiselect?: boolean;
  possibleOptions: T[];
  selectedOptions: T | T[] | null;
};

const SearchableSelect = <T extends Option>({
  ariaLabelledby,
  handleSelectionChange,
  multiselect = false,
  possibleOptions,
  selectedOptions,
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
    <Autocomplete
      value={value}
      onChange={(event, newValue) => handleSelectionChange(newValue)}
      options={possibleOptions}
      isOptionEqualToValue={(option: T, value) => option.id === value.id}
      multiple={multiselect}
      noOptionsText="There are no matching options."
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
  );
};

export default SearchableSelect;
