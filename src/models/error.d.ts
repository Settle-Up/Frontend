type ItemFieldError = {
  hasError: boolean;
  message: string;
};

type ItemError = {
  itemName: ItemFieldError;
  unitPrice: ItemFieldError;
  itemQuantity: ItemFieldError;
  itemTotalPrice: ItemFieldError;
};

type ItemOrderDetailsListError = {
  [itemId: string]: ItemError;
};
