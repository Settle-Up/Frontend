import { useState } from "react";
import CustomButton from "@components/CustomButton";
import { Button, Typography, Box, Stack } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import theme from "@theme";
import { deepPurple } from "@mui/material/colors";
import SearchableSelect from "@components/SearchableSelect";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { useQuery } from "react-query";
import { getGroupSummaryList } from "@apis/group/getGroupSummaryList";
import { mockJoinedGroupSummaryData } from "@mock/groupMock";
import { useMutation } from "react-query";
import { getProcessedReceipt } from "@apis/expense/getProcessedReceipt";
import ReceiptProcessPage from "./ReceiptProcessPage";
import { mergeReceiptInToExpense } from "@utils/mergeReceiptIntoExpense";
import { resizeImage } from "@utils/resizeImage";

type ReceiptUploadPageProps = {};

type GroupOption = {
  id: string;
  label: string;
};

/* ----------------------------- MAKE SURE TO CALL URL.revokeObjectURL() LATER ON TO AVOID MEMORY LEAK -------------- */

const ReceiptUploadPage = ({}: ReceiptUploadPageProps) => {
  const navigate = useNavigate();
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const [imgFileName, setImgFileName] = useState<string | null>(
    newExpense.receiptImgFile ? newExpense.receiptImgFile.name : null
  );
  const [imgFileUrl, setImgFileUrl] = useState<string | null>(
    newExpense.receiptImgFile
      ? URL.createObjectURL(newExpense.receiptImgFile)
      : null
  );

  // const {
  //   data: groupSummaryList,
  //   isLoading,
  //   error,
  // } = useQuery("groupSummaryList", getGroupSummaryList);

  // const possibleGroupOptions: GroupOption[] =
  //   groupSummaryList?.map((group: JoinedGroupSummary) => ({
  //     id: group.groupId,
  //     label: group.groupName,
  //   })) ?? [];

  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      try {
        const resizedImg = await resizeImage(
          file,
          10000,
          10000,
          "JPEG",
          100,
          0
        );
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

  const handleSelectedGroupChange = (
    selectedGroup: GroupOption | GroupOption[] | null
  ) => {
    if (selectedGroup && !Array.isArray(selectedGroup)) {
      setNewExpense((prev) => ({
        ...prev,
        groupId: selectedGroup.id,
        groupName: selectedGroup.label,
      }));
    }
  };

  const extractedGroupData = mockJoinedGroupSummaryData.map((group) => ({
    id: group.groupId,
    label: group.groupName,
  }));

  const getProcessedReceiptMutation = useMutation(getProcessedReceipt, {
    onSuccess: (newReceipt) => {
      if (newReceipt) {
        const mergedData = mergeReceiptInToExpense(newReceipt, newExpense);
        console.log("-----------------merged data", mergedData);
        setNewExpense(mergedData);
        navigate("/processed-receipt/initial-review");
      }
    },
  });

  const handleProcessReceiptClick = () => {
    if (newExpense.receiptImgFile) {
      const requestData = new FormData();
      requestData.append("image", newExpense.receiptImgFile);
      getProcessedReceiptMutation.mutate(requestData);
    }
  };

  return (
    <>
      {getProcessedReceiptMutation.isLoading ? (
        <ReceiptProcessPage />
      ) : (
        <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
          <Stack spacing={2}>
            <Typography id="select-group" variant="subtitle2">
              Choose Group
            </Typography>
            <SearchableSelect
              ariaLabelledby="select-group"
              // possibleOptions={possibleGroupOptions}
              possibleOptions={extractedGroupData}
              selectedOptions={{
                id: newExpense.groupId,
                label: newExpense.groupName,
              }}
              handleSelectionChange={handleSelectedGroupChange}
            />
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
                    <Typography variant="subtitle1">
                      Upload Receipt Image
                    </Typography>
                    <Typography variant="body1">
                      Save time and effort by letting our system automatically
                      extract the necessary fields for you!
                    </Typography>
                  </>
                )}
              </Stack>
            </Button>
          </Stack>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: { xs: "flex-end" },
              gap: 2,
              my: 3,
            }}
          >
            <CustomButton
              buttonStyle="default"
              onClick={handleProcessReceiptClick}
            >
              Process Receipt
            </CustomButton>
            <CustomButton
              buttonStyle="primaryPlain"
              endIcon={<EastIcon />}
              onClick={() => {
                navigate("/edit-receipt");
              }}
            >
              Go Enter Details Manually
            </CustomButton>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default ReceiptUploadPage;
