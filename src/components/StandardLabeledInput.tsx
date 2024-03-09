import React from "react";
import { Typography, TextField, SxProps } from "@mui/material";

interface StandardLabeledInputProps {
  error?: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  label: string;
  name: string;
  sx? : SxProps;
  value: string | number;
}

const StandardLabeledInput = ({
  error = false,
  handleInputChange,
  helperText = "",
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
        fullWidth
        helperText={helperText}
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
