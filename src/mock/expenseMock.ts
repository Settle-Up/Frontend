// const mockExpense: NewGroupExpense = {
//   receiptImgFile: null,
//   expenseParticipantList: [
//     {
//       userId: "UserId1",
//       userName: "Sally",
//       userEmail: "sally@example.com",
//     },
//     {
//       userId: "UserId2",
//       userName: "Bartholomew Montgomery",
//       userEmail: "user2@example.com",
//     },
//     {
//       userId: "UserId3",
//       userName: "Seraphina Isabella Alexandra Constantine",
//       userEmail: "user3@example.com",
//     },
//     {
//       userId: "UserId4",
//       userName: "박준수",
//       userEmail: "user4@example.com",
//     },
//     {
//       userId: "UserId5",
//       userName: "Victor Quan",
//       userEmail: "user5@example.com",
//     },
//     {
//       userId: "UserId6",
//       userName: "김유민",
//       userEmail: "user6@example.com",
//     },
//   ],
//   groupId: "GroupId1",
//   groupName: "Group 1",
//   payerUserId: "UserId1",
//   payerUserName: "Sally",
//   receiptName: "Example Receipt",
//   address: "123 Example St",
//   receiptDate: "2024-03-09",
//   receiptTotalPrice: "269000",
//   discountApplied: "0",
//   actualPaidPrice: "269000",
//   allocationType: "Equal Quantity",
//   itemOrderDetailsList: [
//     {
//       itemId: "item1",
//       itemName: "Item 1",
//       unitPrice: "10000",
//       itemQuantity: "7",
//       itemTotalPrice: "70000",
//       jointPurchaserList: [
//         { userId: "UserId1", purchasedQuantity: "2" },
//         { userId: "UserId2", purchasedQuantity: "2" },
//         { userId: "UserId3", purchasedQuantity: "1" },
//         { userId: "UserId4", purchasedQuantity: "2" },
//       ],
//     },
//     {
//       itemId: "item2",
//       itemName: "Item 2",
//       unitPrice: "15000",
//       itemQuantity: "8",
//       itemTotalPrice: "120000",
//       jointPurchaserList: [
//         { userId: "UserId1", purchasedQuantity: "1" },
//         { userId: "UserId2", purchasedQuantity: "1" },
//         { userId: "UserId3", purchasedQuantity: "4" },
//         { userId: "UserId4", purchasedQuantity: "2" },
//       ],
//     },
//     {
//       itemId: "item3",
//       itemName: "Item 3",
//       unitPrice: "8000",
//       itemQuantity: "4",
//       itemTotalPrice: "32000",
//       jointPurchaserList: [
//         { userId: "UserId2", purchasedQuantity: "3" },
//         { userId: "UserId4", purchasedQuantity: "1" },
//       ],
//     },
//     {
//       itemId: "item4",
//       itemName: "Item 4",
//       unitPrice: "5000",
//       itemQuantity: "7",
//       itemTotalPrice: "35000",
//       jointPurchaserList: [
//         { userId: "UserId3", purchasedQuantity: "5" },
//         { userId: "UserId5", purchasedQuantity: "2" },
//       ],
//     },
//     {
//       itemId: "item5",
//       itemName: "Item 5",
//       unitPrice: "12000",
//       itemQuantity: "1",
//       itemTotalPrice: "12000",
//       jointPurchaserList: [{ userId: "UserId6", purchasedQuantity: "1" }],
//     },
//   ],
// };

// export default mockExpense;

const mockExpense: NewGroupExpense = {
  receiptImgFile: null,
  expenseParticipantList: [
    {
      userId: "UserId1",
      userName: "Sally",
      userEmail: "sally@example.com",
    },
    {
      userId: "UserId2",
      userName: "Bartholomew Montgomery",
      userEmail: "user2@example.com",
    },
    {
      userId: "UserId3",
      userName: "Seraphina Isabella Alexandra Constantine",
      userEmail: "user3@example.com",
    },
    {
      userId: "UserId4",
      userName: "박준수",
      userEmail: "user4@example.com",
    },
    {
      userId: "UserId5",
      userName: "Victor Quan",
      userEmail: "user5@example.com",
    },
    {
      userId: "UserId6",
      userName: "김유민",
      userEmail: "user6@example.com",
    },
  ],
  groupId: "2c558b05-d556-4e2e-a1e5-19b3d2bff1a1",
  groupName: "optimization 1st test group",
  payerUserId: "5258627f-7254-36bc-ad4c-2a2fa1eed933",
  payerUserName: "박수빈",
  receiptName: "Example Receipt",
  address: "123 Example St",
  receiptDate: "2024-03-09",
  receiptTotalPrice: "269000",
  allocationType: "Equal Quantity",
  itemOrderDetailsList: [
    {
      itemId: "item1",
      itemName: "Item 1",
      unitPrice: "10000",
      itemQuantity: "7",
      itemTotalPrice: "70000",
      jointPurchaserList: [
        { userId: "UserId1", purchasedQuantity: "2" },
        { userId: "UserId2", purchasedQuantity: "2" },
        { userId: "UserId3", purchasedQuantity: "1" },
        { userId: "UserId4", purchasedQuantity: "2" },
      ],
    },
    {
      itemId: "item2",
      itemName: "Item 2",
      unitPrice: "15000",
      itemQuantity: "8",
      itemTotalPrice: "120000",
      jointPurchaserList: [
        { userId: "UserId1", purchasedQuantity: "1" },
        { userId: "UserId2", purchasedQuantity: "1" },
        { userId: "UserId3", purchasedQuantity: "4" },
        { userId: "UserId4", purchasedQuantity: "2" },
      ],
    },
    {
      itemId: "item3",
      itemName: "Item 3",
      unitPrice: "8000",
      itemQuantity: "4",
      itemTotalPrice: "32000",
      jointPurchaserList: [
        { userId: "UserId2", purchasedQuantity: "3" },
        { userId: "UserId4", purchasedQuantity: "1" },
      ],
    },
    {
      itemId: "item4",
      itemName: "Item 4",
      unitPrice: "5000",
      itemQuantity: "7",
      itemTotalPrice: "35000",
      jointPurchaserList: [
        { userId: "UserId3", purchasedQuantity: "5" },
        { userId: "UserId5", purchasedQuantity: "2" },
      ],
    },
    {
      itemId: "item5",
      itemName: "Item 5",
      unitPrice: "12000",
      itemQuantity: "1",
      itemTotalPrice: "12000",
      jointPurchaserList: [{ userId: "UserId6", purchasedQuantity: "1" }],
    },
  ],
};

export default mockExpense;

