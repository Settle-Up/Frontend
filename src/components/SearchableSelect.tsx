import {
  Autocomplete,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { PaperProps } from "@mui/material";

type Option = {
  id?: string;
  label: string;
};

type SearchableSelectProps<T extends Option> = {
  ariaLabelledby: string;
  endOfListElement?: React.ReactNode;
  handleSelectionChange: (value: T | T[] | null) => void;
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
  label,
  possibleOptions,
  selectedOptions,
  multiselect = false,
  noOptionsText = "No options available",
  lastElementRef,
}: SearchableSelectProps<T>) => {
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

  console.log("LAST ELEMENT REF", lastElementRef)
  const CustomPaperComponent: React.FC<
    PaperProps & { children?: React.ReactNode }
  > = ({ children, ...other }) => (
    <Paper elevation={5} {...other} sx={{maxHeight: "100px"}}>
      {children}
      {endOfListElement}
      <div
          ref={lastElementRef}
          style={{
            display: "inline",
            border: "3px solid orange",
          }}
        />
    </Paper>
  );

  return (
    <Stack spacing={2}>
      {label && (
        <Typography id={ariaLabelledby} variant="subtitle2">
          {label}
        </Typography>
      )}
      <Autocomplete
        value={value}
        onChange={(event, newValue) => handleSelectionChange(newValue)}
        options={possibleOptions || []}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        multiple={multiselect}
        noOptionsText={noOptionsText}
        ListboxProps={{
          className: "custom-scrollbar",
        }}
        PaperComponent={CustomPaperComponent}
        renderInput={(params) => (
          <TextField
            {...params}
            aria-labelledby={ariaLabelledby}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>{params.InputProps.endAdornment}</Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
      />
    </Stack>
  );
};

export default SearchableSelect;
