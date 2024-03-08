import { Autocomplete, TextField } from "@mui/material";

type Option = {
  id: string;
  label: string;
};

type SearchableSelectProps<T extends Option> = {
  ariaLabelledby: string;
  possibleOptions: T[];
  selectedOptions: T | T[] | null;
  handleSelectionChange: (value: T | T[] | null) => void;
  multiselect?: boolean;
};

const SearchableSelect = <T extends Option>({
  ariaLabelledby,
  possibleOptions,
  selectedOptions,
  handleSelectionChange,
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
    <Autocomplete
      value={value}
      onChange={(event, newValue) => handleSelectionChange(newValue)}
      options={possibleOptions}
      isOptionEqualToValue={(option: T, value) => option.id === value.id}
      multiple={multiselect}
      noOptionsText="일치하는 옵션이 없습니다"
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
