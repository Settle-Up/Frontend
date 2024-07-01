import ExpenseItemAccordion from "@components/ExpenseItemAccordion";

type ExpenseItemAccordionListProps = {
  itemList: Item[];
  itemErrorList?: Record<string, ItemError>;
  removeItem: (itemId: string) => void;
  updateItemField: (
    itemId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const ExpenseItemAccordionList = ({
  itemList,
  itemErrorList,
  removeItem,
  updateItemField,
}: ExpenseItemAccordionListProps) => {

  return (
    <>
      {itemList.map((item) => (
        <ExpenseItemAccordion
          key={item.itemId}
          item={item}
          itemErrors={itemErrorList?.[item.itemId]}
         
          updateItem={(e) =>
            updateItemField(
              item.itemId,
              e,
            )
          }
          removeItem={() => removeItem(item.itemId)}
        />
      ))}
    </>
  );
};

export default ExpenseItemAccordionList;
