import { useState } from "react";
import ExpenseItemAccordion from "@components/ExpenseItemAccordion";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import { formatNumberWithLocaleAndNegatives } from "@utils/numberStringConversions";

type ExpenseItemAccordionListProps = {
  itemErrors: ItemOrderDetailsListError;
  setItemErrors: React.Dispatch<
    React.SetStateAction<ItemOrderDetailsListError>
  >;
};

const ExpenseItemAccordionList = ({
  itemErrors,
  setItemErrors,
}: ExpenseItemAccordionListProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);

  const toggleAccordion =
    (panelId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };

  const handleItemDetailsChange = (
    itemId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue: string = value;
    if (["unitPrice", "itemQuantity", "itemTotalPrice"].includes(name)) {
      formattedValue = formatNumberWithLocaleAndNegatives(value!);
      setItemErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        if (updatedErrors[itemId]) {
          updatedErrors[itemId] = {
            ...updatedErrors[itemId],
            [name]:
              formattedValue === ""
                ? {
                    hasError: true,
                    message: "Invalid input. Only numbers are allowed.",
                  }
                : {
                    hasError: false,
                    message: "",
                  },
          };
        }

        return updatedErrors;
      });
    }
    setNewExpense((prevExpense) => {
      const updatedItemList = prevExpense.itemOrderDetailsList.map(
        (item: ItemOrderDetails) => {
          if (item.itemId === itemId) {
            return { ...item, [name]: formattedValue ?? value };
          }
          return item;
        }
      );

      return {
        ...prevExpense,
        itemOrderDetailsList: updatedItemList,
      };
    });
  };

  // const handleItemDetailsChange = (
  //   itemId: string,
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setNewExpense((prevExpense) => {
  //     const updatedItemList = prevExpense.itemOrderDetailsList.map(
  //       (item: ItemOrderDetails) => {
  //         if (item.itemId === itemId) {
  //           let formattedValue: string = value;
  //           if (
  //             ["unitPrice", "itemQuantity", "itemTotalPrice"].includes(name)
  //           ) {
  //             formattedValue = formatNumberWithLocaleAndNegatives(value!);
  //           }
  //           return { ...item, [name]: formattedValue ?? value };
  //         }
  //         return item;
  //       }
  //     );

  //     return {
  //       ...prevExpense,
  //       itemOrderDetailsList: updatedItemList,
  //     };
  //   });
  // };

  const handleDeleteItem = (itemId: string) => {
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      itemOrderDetailsList: prevExpense.itemOrderDetailsList.filter(
        (item: ItemOrderDetails) => item.itemId !== itemId
      ),
    }));
  };

  return (
    <div>
      {newExpense.itemOrderDetailsList.map((item) => (
        <ExpenseItemAccordion
          key={item.itemId}
          item={item}
          itemErrors={itemErrors[item.itemId]}
          expanded={expanded === item.itemId}
          toggleAccordion={toggleAccordion(item.itemId)}
          handleItemDetailsChange={(e) => handleItemDetailsChange(item.itemId, e)}
          handleDelete={() => handleDeleteItem(item.itemId)}
        />
      ))}
    </div>
  );
};

export default ExpenseItemAccordionList;
