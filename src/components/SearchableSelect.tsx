import { Autocomplete, TextField } from "@mui/material";

type Option = {
  id: string;
  label: string;
};

type SearchableSelectProps<T extends Option> = {
  ariaLabel: string;
  possibleOptions: T[];
  selectedOptions: T;
  handleSelectionChange: (value : T | T[] | null) => void;
  multiselect?: boolean;
};

const SearchableSelect = <T extends Option>({
  ariaLabel,
  possibleOptions,
  selectedOptions,
  handleSelectionChange,
  multiselect = false,
}: SearchableSelectProps<T>) => {
  return (
    <Autocomplete
      value={selectedOptions ?? (multiselect ? [] : null)}
      onChange={(event, newValue) => handleSelectionChange(newValue)}
      options={possibleOptions}
      isOptionEqualToValue={(option: T, value) => option.id === value.id}
      multiple={multiselect}
      noOptionsText="일치하는 옵션이 없습니다"
      renderInput={(params) => (
        <TextField
          {...params}
          id={ariaLabel}
          variant="outlined"
          fullWidth
          placeholder="d"
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
