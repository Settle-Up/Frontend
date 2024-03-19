const mockExpense: NewGroupExpense = {
  receiptImgFile: null,
  expenseParticipantList: [
    {
      userId: "Id1",
      userName: "user 1",
      userEmail: "userA@example.com",
    },
    {
      userId: "Id2",
      userName: "user 2",
      userEmail: "userB@example.com",
    },
    {
      userId: "Id3",
      userName: "user 3",
      userEmail: "userC@example.com",
    },
    {
      userId: "Id4",
      userName: "user 4",
      userEmail: "userC@example.com",
    },
    {
      userId: "Id5",
      userName: "user 5",
      userEmail: "userC@example.com",
    },
    {
      userId: "Id6",
      userName: "user 6",
      userEmail: "userC@example.com",
    },
  ],
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
      jointPurchaserList: [
        { userId: "Id1" },
        { userId: "Id2" },
        { userId: "Id3" },
        { userId: "Id4" },
      ],
    },
    {
      id: "item2",
      itemName: "Item 2",
      unitPrice: "15.00",
      itemQuantity: "1",
      itemTotalPrice: "15.00",
      jointPurchaserList: [
        { userId: "Id1" },
        { userId: "Id2" },
        { userId: "Id3" },
        { userId: "Id4" },
      ],
    },
    {
      id: "item3",
      itemName: "Item 3",
      unitPrice: "8.00",
      itemQuantity: "3",
      itemTotalPrice: "24.00",
      jointPurchaserList: [
        { userId: "Id2" },
        { userId: "Id4" },
      ],
    },
    {
      id: "item4",
      itemName: "Item 4",
      unitPrice: "5.00",
      itemQuantity: "4",
      itemTotalPrice: "20.00",
      jointPurchaserList: [
        { userId: "Id3" },
        { userId: "Id5" },
      ],
    },
    {
      id: "item5",
      itemName: "Item 5",
      unitPrice: "12.00",
      itemQuantity: "2",
      itemTotalPrice: "24.00",
      jointPurchaserList: [
        { userId: "Id6" },
      ],
    },
  ],
};

export default mockExpense;
