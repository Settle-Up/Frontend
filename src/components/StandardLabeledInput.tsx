import React from "react";
import { Typography, TextField, SxProps } from "@mui/material";

interface StandardLabeledInputProps {
  error?: boolean;
  errorText?: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  sx?: SxProps;
  value: string | number;
}

const StandardLabeledInput = ({
  error = false,
  errorText,
  handleInputChange,
  label,
  name,
  sx,
  value,
}: StandardLabeledInputProps) => {
  return (
    <>
      <Typography id={name} variant="subtitle2" gutterBottom>
        {label}
      </Typography>
      <TextField
        aria-labelledby={name}
        error={error}
        helperText={errorText}
        fullWidth
        name={name}
        onChange={handleInputChange}
        required={true}
        sx={sx}
        value={value}
        variant="outlined"
      />
    </>
  );
};

export default StandardLabeledInput;
