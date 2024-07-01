type CustomError = string | undefined;

type NewExpenseError = {
  groupName?: CustomError;
  receiptName?: CustomError;
  address?: CustomError;
  receiptDate?: CustomError;
  receiptTotalPrice?: CustomError;
  itemList?: Record<string, ItemError>;
};

type ItemError = {
  itemName?: CustomError;
  unitPrice?: CustomError;
  itemQuantity?: CustomError;
  itemTotalPrice?: CustomError;
};


  type ValidationResult<T> = T extends "NewExpense"
  ? { errors: NewExpenseError; isValid: boolean }
  : { errors: ItemError; isValid: boolean };
