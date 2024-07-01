const validateField = (value: any, criteria: number[]): CustomError => {
  if (
    criteria.includes(1) &&
    (value === null || value === undefined || value === "" || value === "0")
  ) {
    return "This field is required.";
  }
  if (criteria.includes(2) && !/^\d*\.?\d+$/.test(value)) {
    return "Invalid input. Only numbers are allowed.";
  }
  return undefined;
};

const validateItem = (item: Item): ItemError => {
  const itemErrors: ItemError = {};

  itemErrors.itemName = validateField(item.itemName, [1]);
  itemErrors.unitPrice = validateField(item.unitPrice, [1, 2]);
  itemErrors.itemQuantity = validateField(item.itemQuantity, [1, 2]);
  itemErrors.itemTotalPrice = validateField(item.itemTotalPrice, [1, 2]);

  const unitPrice = parseFloat(item.unitPrice);
  const itemQuantity = parseInt(item.itemQuantity);
  const itemTotalPrice = parseFloat(item.itemTotalPrice);

  if (
    !itemErrors.itemTotalPrice &&
    itemTotalPrice !== unitPrice * itemQuantity
  ) {
    itemErrors.itemTotalPrice =
      "Total price does not match unit price multiplied by quantity.";
  }

  return itemErrors;
};

const validateExpenseInput = <T extends "NewExpense" | "Item">(
  data: T extends "NewExpense" ? NewExpense : Item,
  dataType: T
): ValidationResult<T> => {
  const errors: any = {};
  let isValid = true;

  if (dataType === "NewExpense") {
    const newExpense = data as NewExpense;
    const newExpenseErrors: NewExpenseError = {};

    newExpenseErrors.groupName = validateField(newExpense.groupName, [1]);
    newExpenseErrors.receiptName = validateField(newExpense.receiptName, [1]);
    newExpenseErrors.address = validateField(newExpense.address, [1]);
    newExpenseErrors.receiptDate = validateField(newExpense.receiptDate, [1]);
    newExpenseErrors.receiptTotalPrice = validateField(
      newExpense.receiptTotalPrice,
      [1, 2]
    );

    Object.values(newExpenseErrors).forEach((error) => {
      if (error !== undefined) {
        isValid = false;
      }
    });

    let totalCalculatedPrice = 0;

    newExpense.itemList.forEach((item) => {
      const itemErrors = validateItem(item);

      if (Object.values(itemErrors).some((error) => error !== undefined)) {
        if (!newExpenseErrors.itemList) {
          newExpenseErrors.itemList = {};
        }
        newExpenseErrors.itemList[item.itemId] = itemErrors;
        isValid = false;
      }

      totalCalculatedPrice += parseFloat(item.itemTotalPrice);
    });

    const receiptTotalPrice = parseFloat(newExpense.receiptTotalPrice);
    if (
      !newExpenseErrors.receiptTotalPrice &&
      totalCalculatedPrice !== receiptTotalPrice
    ) {
      newExpenseErrors.receiptTotalPrice =
        "Total receipt price does not match the sum of item total prices.";
      isValid = false;
    }

    return { errors: newExpenseErrors, isValid } as ValidationResult<T>;
  } else {
    const itemDetails = data as Item;
    const itemErrors = validateItem(itemDetails);

    if (Object.values(itemErrors).some((error) => error !== undefined)) {
      errors.itemList = { [itemDetails.itemId]: itemErrors };
      isValid = false;
    }

    return { errors: itemErrors, isValid } as ValidationResult<T>;
  }
};

export default validateExpenseInput;
