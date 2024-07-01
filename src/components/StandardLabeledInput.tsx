import React from "react";
import { Box, Typography, TextField, SxProps } from "@mui/material";

type StandardLabeledInputProps = {
  error?: CustomError;
  changeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
  placeholder?: string;
  sx?: SxProps;
  value: string | number | null;
};

const StandardLabeledInput = ({
  error,
  changeInput,
  label,
  name,
  placeholder,
  sx,
  value,
}: StandardLabeledInputProps) => {
  return (
    <Box>
      {label && (
        <Typography id={name} variant="subtitle2" gutterBottom>
          {label}
        </Typography>
      )}
      <TextField
        aria-labelledby={name}
        error={!!error}
        helperText={error}
        fullWidth
        name={name}
        onChange={changeInput}
        placeholder={placeholder}
        required={true}
        sx={sx}
        value={value}
        variant="outlined"
      />
    </Box>
  );
};

export default StandardLabeledInput;
