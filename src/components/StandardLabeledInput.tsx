import React from "react";
import { Typography, TextField } from "@mui/material";

interface StandardLabeledInputProps {
  ariaLabel: string;
  label: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean; 
  helperText?: string; 
}

const StandardLabeledInput = ({
  ariaLabel,
  label,
  handleInputChange,
  error = false,
  helperText = ''
}: StandardLabeledInputProps) => {
  return (
    <>
      <Typography id={ariaLabel} gutterBottom variant="subtitle2">
        {label}
      </Typography>
      <TextField
        aria-labelledby={ariaLabel}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={handleInputChange}
        error={error}
        helperText={helperText}
      />
    </>
  );
};

export default StandardLabeledInput;
