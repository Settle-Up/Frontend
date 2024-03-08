import React, { useState } from "react";
import { Button, Typography, Stack } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import theme from "@theme";
import { deepPurple } from "@mui/material/colors";
import { resizeImage } from "@utils/resizeImage";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";

const ImageUploaderWithPreview = () => {
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const [imgFileName, setImgFileName] = useState<string | null>(
    newExpense.receiptImgFile ? newExpense.receiptImgFile.name : null
  );
  const [imgFileUrl, setImgFileUrl] = useState<string | null>(
    newExpense.receiptImgFile
      ? URL.createObjectURL(newExpense.receiptImgFile)
      : null
  );

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      try {
        const resizedImg = await resizeImage(file, 9000, 9000, "JPEG", 70, 0);
        console.log("Resized image:", resizedImg);
        setNewExpense((prevState) => ({
          ...prevState,
          receiptImgFile: resizedImg,
        }));
        setImgFileName(file.name);
        setImgFileUrl(URL.createObjectURL(resizedImg));
      } catch (error) {
        console.error("Error resizing the image:", error);
      }
    }
  };

  return (
    <Button
      variant="outlined"
      component="label"
      sx={{
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          color: theme.palette.primary.dark,
          backgroundColor: deepPurple[50],
        },
        width: "100%",
        height: "400px",
        p: 5,
      }}
    >
      <input type="file" hidden onChange={handleImageFileChange} />
      <Stack
        sx={{
          "& > :not(:first-child)": {
            textTransform: "none",
          },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {imgFileUrl ? (
          <>
            <img
              src={imgFileUrl}
              alt="Uploaded Receipt"
              style={{
                maxHeight: "90%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
            <Typography variant="body2">{imgFileName}</Typography>
          </>
        ) : (
          <>
            <DriveFolderUploadIcon sx={{ fontSize: 120 }} />
            <Typography variant="subtitle1">Upload Receipt Image</Typography>
            <Typography variant="body1">
              Save time and effort by letting our system automatically extract
              the necessary fields for you!
            </Typography>
          </>
        )}
      </Stack>
    </Button>
  );
};

export default ImageUploaderWithPreview;
