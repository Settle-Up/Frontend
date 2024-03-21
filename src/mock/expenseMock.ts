const mockExpense: NewGroupExpense = {
  receiptImgFile: null,
  expenseParticipantList: [
    {
      userId: "Id1",
      userName: "Maximilian Alexander Bartholomew Fitzwilliam",
      userEmail: "userA@example.com",
    },
    {
      userId: "Id2",
      userName: "Bartholomew Montgomery",
      userEmail: "userB@example.com",
    },
    {
      userId: "Id3",
      userName: "Seraphina Isabella Alexandra Constantine",
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
      userName: "Wilhelmina Penelope Genevieve Cumberland Kensington",
      userEmail: "userC@example.com",
    },
    {
      userId: "Id7",
      userName: "Wilhelmina Penelope Genevieve Cumberland Kensington",
      userEmail: "userC@example.com",
    },
    {
      userId: "Id8",
      userName: "Wilhelmina Penelope Genevieve Cumberland Kensington",
      userEmail: "userC@example.com",
    },
    {
      userId: "Id9",
      userName: "Wilhelmina Penelope Genevieve Cumberland Kensington",
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
  allocationType: "Equal Quantity",
  itemOrderDetailsList: [
    {
      itemId: "item1",
      itemName: "Item 1",
      unitPrice: "10.00",
      itemQuantity: "2",
      itemTotalPrice: "20.00",
      jointPurchaserList: [
        { userId: "Id1", purchasedQuantity: "0" },
        { userId: "Id2", purchasedQuantity: "0" },
        { userId: "Id3", purchasedQuantity: "0" },
        { userId: "Id4", purchasedQuantity: "0" },
      ],
    },
    {
      itemId: "item2",
      itemName: "Item 2",
      unitPrice: "15.00",
      itemQuantity: "1",
      itemTotalPrice: "15.00",
      jointPurchaserList: [
        { userId: "Id1", purchasedQuantity: "0" },
        { userId: "Id2", purchasedQuantity: "0" },
        { userId: "Id3", purchasedQuantity: "0" },
        { userId: "Id4", purchasedQuantity: "0" },
      ],
    },
    {
      itemId: "item3",
      itemName: "Item 3",
      unitPrice: "8.00",
      itemQuantity: "3",
      itemTotalPrice: "24.00",
      jointPurchaserList: [
        { userId: "Id2", purchasedQuantity: "0" },
        { userId: "Id4", purchasedQuantity: "0" },
      ],
    },
    {
      itemId: "item4",
      itemName: "Item 4",
      unitPrice: "5.00",
      itemQuantity: "4",
      itemTotalPrice: "20.00",
      jointPurchaserList: [
        { userId: "Id3", purchasedQuantity: "0" },
        { userId: "Id5", purchasedQuantity: "0" },
      ],
    },
    {
      itemId: "item5",
      itemName: "Item 5",
      unitPrice: "12.00",
      itemQuantity: "2",
      itemTotalPrice: "24.00",
      jointPurchaserList: [{ userId: "Id6", purchasedQuantity: "0" }],
    },
  ],
};

export default mockExpense;
