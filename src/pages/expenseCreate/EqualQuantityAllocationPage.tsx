import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import CustomButton from "@components/CustomButton";
import SelectableParticipantChipList from "@components/SelectableParticipantChipList";
import PurchasedItemToggletList from "@components/PurchasedItemToggletList";
import { useRecoilState } from "recoil";
import { newExpenseState } from "@store/expenseStore";
import HeadingWithTip from "@components/HeadingWithTip";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";

const initializeParticipantItemLinkStatus = (
  expenseParticipantList: GeneralUser[],
  itemOrderDetailsList: ItemOrderDetails[]
): ParticipantItemLinkStatusMap => {
  return expenseParticipantList.reduce((acc, participant) => {
    const isLinked = itemOrderDetailsList.some((item) =>
      item.jointPurchaserList?.some(
        (purchaser) => purchaser.userId === participant.userId
      )
    );
    acc[participant.userId] = isLinked;
    return acc;
  }, {} as ParticipantItemLinkStatusMap);
};

const EqualQuantityAllocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { groupMemberList } = location.state;
  const [newExpense, setNewExpense] = useRecoilState(newExpenseState);
  const { allocationType, expenseParticipantList, itemOrderDetailsList } =
    newExpense;
  const [selectedParticipantId, setSelectedParticipantId] = useState<string>(
    expenseParticipantList[0].userId
  );
  const [participantItemLinkStatus, setParticipantItemLinkStatus] = useState(
    initializeParticipantItemLinkStatus(
      expenseParticipantList,
      itemOrderDetailsList
    )
  );

  const setSnackbar = useSetRecoilState(snackbarState);

  const isUserLinkedToAnyItems = (userId: string) =>
    itemOrderDetailsList.some((itemOrderDetail) =>
      itemOrderDetail.jointPurchaserList?.some(
        (purchaser) => purchaser.userId === userId
      )
    );

  const updateParticipantItemLinkStatus = () => {
    const updatedStatus = { ...participantItemLinkStatus };
    expenseParticipantList.forEach((participant) => {
      updatedStatus[participant.userId] = isUserLinkedToAnyItems(
        participant.userId
      );
    });
    setParticipantItemLinkStatus(updatedStatus);
  };

  useEffect(() => {
    updateParticipantItemLinkStatus();
  }, [itemOrderDetailsList]);

  const handleConfirmClick = () => {
    const allUsersLinked = Object.values(participantItemLinkStatus).every(
      (status) => status
    );
    if (allUsersLinked) {
      navigate("/expense/submission/review");
    } else {
      // setShowAllocationIncompleteAlert(true);
      setSnackbar({
        show: true,
        message:
          "To proceed, please ensure that each participant has items allocated to them.",
        severity: "warning",
      });
    }
  };

  const handleNewExpenseChange = (
    key: string,
    value: string | AllocationType | ItemOrderDetails[] | GeneralUser[]
  ) => {
    setNewExpense((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <>
      <Stack sx={{ flexGrow: 1, justifyContent: "space-between" }}>
        <Stack spacing={2}>
          <HeadingWithTip
            heading="Allocate Items to Members"
            tipMessage="Select the items each member was involved in purchasing. Tap on a member's name to highlight it, then check the items they contributed to."
          />
          <SelectableParticipantChipList
            expenseParticipantList={expenseParticipantList}
            groupMemberList={groupMemberList}
            handleNewExpenseChange={handleNewExpenseChange}
            participantItemLinkStatus={participantItemLinkStatus}
            selectedParticipantId={selectedParticipantId}
            setSelectedParticipantId={setSelectedParticipantId}
          />
          <PurchasedItemToggletList
            handleNewExpenseChange={handleNewExpenseChange}
            itemOrderDetailsList={itemOrderDetailsList}
            userId={selectedParticipantId}
          />
        </Stack>
        <CustomButton
          buttonStyle="default"
          onClick={handleConfirmClick}
          sx={{
            alignSelf: "flex-end",
            width: { xs: "100%", sm: "auto" },
            mt: 5,
          }}
        >
          Confirm
        </CustomButton>
      </Stack>
    </>
  );
};

export default EqualQuantityAllocationPage;
