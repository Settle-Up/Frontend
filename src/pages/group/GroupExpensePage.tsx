import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const GroupExpensePage = () => {
  let { receiptId } = useParams();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" sx={{ alignSelf: "center" }}>
        receiptName
        {/* {receiptName} */}
      </Typography>
      <IconButton
        color="primary"
        aria-label="dropdown"
        onClick={() => {}}
        sx={{ p: 0.5 }}
      > 
        <DeleteIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default GroupExpensePage;
