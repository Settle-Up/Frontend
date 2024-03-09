const mockExpense: NewGroupExpense = {
    receiptImgFile: null,
    groupId: "group1",
    groupName: "Example Group",
    payerId: "user1",
    payerName: "John Doe",
    receiptName: "Example Receipt",
    address: "123 Example St",
    receiptDate: "2024-03-09",
    receiptTotalPrice: "100.00",
    discountApplied: "0.00",
    actualPaidPrice: "100.00",
    allocationType: "EqualQuantity",
    itemOrderDetailsList: [
      {
        id: "item1",
        itemName: "Item 1",
        unitPrice: "10.00",
        itemQuantity: "2",
        itemTotalPrice: "20.00",
      },
      {
        id: "item2",
        itemName: "Item 2",
        unitPrice: "15.00",
        itemQuantity: "1",
        itemTotalPrice: "15.00",
      },
      {
        id: "item3",
        itemName: "Item 3",
        unitPrice: "8.00",
        itemQuantity: "3",
        itemTotalPrice: "24.00",
      },
      {
        id: "item4",
        itemName: "Item 4",
        unitPrice: "5.00",
        itemQuantity: "4",
        itemTotalPrice: "20.00",
      },
      {
        id: "item5",
        itemName: "Item 5",
        unitPrice: "12.00",
        itemQuantity: "2",
        itemTotalPrice: "24.00",
      },
    ],
  };

  export default mockExpense;