import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import theme from "@theme";
import { useFormatNumberAsKoreanWon } from "@hooks/useFormatNumberAsKoreanWon";

type Item = {
  itemId: string;
  itemName: string;
  unitPrice: string;
  itemQuantity: string;
};

type AllItemSummaryTableProps = {
  itemList: Item[];
};

const AllItemSummaryTable = ({ itemList }: AllItemSummaryTableProps) => {
  const formatToKoreanWon = useFormatNumberAsKoreanWon();
  
  return (
    <TableContainer
      className="custom-scrollbar"
      sx={{
        "&  *": {
          wordBreak: "none",
        },
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Receipt Items Summary Table">
        <TableHead>
          <TableRow
            sx={{
              "& > *": {
                whiteSpace: "nowrap",
              },
            }}
          >
            {["Item", "Unit Price", "Quantity", "Total Price"].map(
              (text, index) => (
                <TableCell
                  key={text}
                  sx={{
                    fontWeight: "bold",
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    backgroundColor:
                      index % 2 === 0
                        ? theme.palette.background.paper
                        : "#EDEDED",
                    color:
                      index % 2 === 0
                        ? theme.palette.text.secondary
                        : "inherit",
                  }}
                >
                  <Typography variant="subtitle2">{text}</Typography>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map(({ itemName, unitPrice, itemQuantity }, rowIndex) => {
            const parsedItemQuantity = parseFloat(itemQuantity);
            const totalPrice = parseFloat(unitPrice) * parsedItemQuantity;

            return (
              <TableRow key={rowIndex}>
                {[
                  itemName,
                  formatToKoreanWon(unitPrice),
                  Math.ceil(parsedItemQuantity),
                  formatToKoreanWon(totalPrice),
                ].map((cellData, cellIndex) => {
                  const isOdd = cellIndex % 2 === 0;
                  return (
                    <TableCell
                      key={`${rowIndex}-${cellIndex}`}
                      component={cellIndex === 0 ? "th" : undefined}
                      scope={cellIndex === 0 ? "row" : undefined}
                      sx={{
                        backgroundColor: isOdd
                          ? theme.palette.background.paper
                          : "#EDEDED",
                        color: isOdd ? theme.palette.text.secondary : "inherit",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.8rem" }}>
                        {cellData}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllItemSummaryTable;
