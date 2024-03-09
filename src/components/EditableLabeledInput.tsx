import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import theme from "@theme";
import CustomButton from "@components/CustomButton";
import { grey } from "@mui/material/colors";

type EditableLabeledInputProps = {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
};
const EditableLabeledInput = ({
  handleInputChange,
  label,
  name,
  ...props
}: EditableLabeledInputProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Stack spacing={1} sx={{ my: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography id={name} gutterBottom variant="subtitle2">
          {label}
        </Typography>
        <CustomButton
          buttonStyle={isEditing ? "secondary" : "primary"}
          sx={{ py: 0 }}
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </CustomButton>
      </Box>
      <TextField
        {...props}
        name={name}
        aria-labelledby={name}
        fullWidth
        disabled={!isEditing}
        onChange={handleInputChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.secondary.main,
            },
            "&:hover fieldset": {
              borderColor: isEditing ? theme.palette.secondary.dark : grey[400],
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.secondary.dark,
            },
          },
        }}
      />
    </Stack>
  );
};

export default EditableLabeledInput;
