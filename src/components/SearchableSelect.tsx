import {
  Autocomplete,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { PaperProps } from "@mui/material";

type Option = {
  id?: string;
  label: string;
};

type SearchableSelectProps<T extends Option> = {
  ariaLabelledby: string;
  endOfListElement?: React.ReactNode;
  handleSelectionChange: (value: T | T[] | null) => void;
  helperText?: string | null;
  label?: string;
  possibleOptions: T[] | null;
  selectedOptions: T | T[] | null;
  multiselect?: boolean;
  noOptionsText?: string;
  lastElementRef?: React.MutableRefObject<HTMLDivElement | null>;
};

const SearchableSelect = <T extends Option>({
  ariaLabelledby,
  endOfListElement,
  handleSelectionChange,
  helperText,
  label,
  possibleOptions,
  selectedOptions,
  multiselect = false,
  noOptionsText = "No options available",
  lastElementRef,
}: SearchableSelectProps<T>) => {
  const [open, setOpen] = useState(false);

  let value;
  if (multiselect) {
    value = Array.isArray(selectedOptions) ? selectedOptions : [];
  } else {
    value =
      selectedOptions &&
      !Array.isArray(selectedOptions) &&
      selectedOptions.id !== "" &&
      possibleOptions?.some((option) => option.id === selectedOptions.id)
        ? selectedOptions
        : null;
  }

  const handleDropdownOpen = () => {
    setOpen(true);
  };

  const handleDropdownClose = (event: React.SyntheticEvent<Element, Event>, reason: string) => {
    if (multiselect && reason === "selectOption") {
      event.stopPropagation();
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2}>
      {label && (
        <Typography id={ariaLabelledby} variant="subtitle2">
          {label}
        </Typography>
      )}
      <Autocomplete
        open={open}
        onOpen={handleDropdownOpen}
        onClose={handleDropdownClose}
        value={value}
        onChange={(event, newValue) => handleSelectionChange(newValue)}
        options={possibleOptions || []}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        multiple={multiselect}
        noOptionsText={noOptionsText}
        ListboxProps={{
          className: "custom-scrollbar",
        }}
        PaperComponent={({ children }) => (
          <Paper>
            <Stack spacing={2}>
              {children}
              {endOfListElement}
            </Stack>
          </Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            aria-labelledby={ariaLabelledby}
            variant="outlined"
            fullWidth
            error={!!helperText}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>{params.InputProps.endAdornment}</Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
        aria-expanded="true"
      />
    </Stack>
  );
};

export default SearchableSelect;
