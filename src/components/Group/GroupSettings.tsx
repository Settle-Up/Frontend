import { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import theme from "@theme";
import Modal from "@components/Modal";
import {
  AddMembersContent,
  LeaveGroupContent,
  MonthlyReportContent,
  ViewMembersContent,
} from "@components/GroupOptions";
import CustomBackdrop from "@components/CustomBackdrop";

const actions = [
  {
    id: "viewMembers",
    IconComponent: Diversity3Icon,
    name: "View Members",
    className: "tooltip-view-members",
  },
  {
    id: "addMembers",
    IconComponent: PersonAddAlt1Icon,
    name: "Add Members",
    className: "tooltip-add-members",
  },
  {
    id: "monthlyReport",
    IconComponent: AssessmentIcon,
    name: "Monthly Report",
    className: "tooltip-monthly-report",
  },
  {
    id: "leaveGroup",
    IconComponent: LogoutIcon,
    name: "Leave Group",
    className: "tooltip-leave-group",
  },
];

type GroupSettingsProps = {
  groupId: string;
  groupName: string;
  isMonthlyReportUpdateOn: boolean;
  setIsGroupOptionsVisible: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  showOptions: boolean;
};

const GroupSettings = ({
  groupId,
  groupName,
  isMonthlyReportUpdateOn,
  setIsGroupOptionsVisible,
  showOptions,
}: GroupSettingsProps) => {
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = (actionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsGroupOptionsVisible(false);
    setSelectedAction(actionId);
    setIsModalOpen(true);
  };

  const renderModalContent = () => {
    switch (selectedAction) {
      case "viewMembers":
        return (
          <ViewMembersContent
            groupId={groupId}
            groupName={groupName}
            closeModal={() => setIsModalOpen(false)}
          />
        );
      case "addMembers":
        return (
          <AddMembersContent
            groupId={groupId}
            groupName={groupName}
            closeModal={() => setIsModalOpen(false)}
          />
        );
      case "monthlyReport":
        return (
          <MonthlyReportContent
            groupId={groupId}
            groupName={groupName}
            closeModal={() => setIsModalOpen(false)}
            isMonthlyReportUpdateOn={isMonthlyReportUpdateOn}
          />
        );
      case "leaveGroup":
        return (
          <LeaveGroupContent
            groupId={groupId}
            groupName={groupName}
            closeModal={() => setIsModalOpen(false)}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const speedDialNode = document.getElementById("speed-dial");

      if (speedDialNode && !speedDialNode.contains(event.target as Node)) {
        setIsGroupOptionsVisible(false);
      }
    };

    if (showOptions) {
      document.addEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, [showOptions, setIsGroupOptionsVisible]);

  return (
    <>
      <CustomBackdrop isOpen={showOptions} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        id="speed-dial"
        icon={<MoreVertIcon sx={{ fontSize: theme.spacing(2.3) }} />}
        onClick={() => setIsGroupOptionsVisible((prev) => !prev)}
        open={showOptions}
        direction="down"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.tooltip,
          "& .MuiFab-root": {
            boxShadow: "none",
            backgroundColor: showOptions ? "white" : theme.palette.default.main,
            color: showOptions ? theme.palette.default.main : "white",
            "&:hover": {
              backgroundColor: showOptions
                ? "#E0E0E0"
                : theme.palette.default.light,
            },
            width: (theme) => theme.spacing(3.5),
            height: (theme) => theme.spacing(3.5),
            minHeight: (theme) => theme.spacing(3.5),
          },
          "& .MuiSpeedDial-actions > *": {
            my: 1,
          },
          "& .MuiSpeedDialAction-staticTooltipLabel": {
            backgroundColor: "white",
            color: theme.palette.default.main,
            textWrap: "nowrap",
            fontSize: "14px",
            fontWeight: "bold",
          },
          [`& .${hoveredAction}`]: {
            backgroundColor: "white",
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <action.IconComponent
                sx={{
                  fontSize: theme.spacing(2.3),
                  color: theme.palette.default.main,
                }}
              />
            }
            tooltipTitle={
              <span className={action.className}>{action.name}</span>
            }
            tooltipOpen={true}
            onMouseEnter={() => setHoveredAction(action.id)}
            onMouseLeave={() => setHoveredAction(null)}
            TooltipClasses={{
              tooltip: hoveredAction === action.id ? "tooltipHovered" : "",
            }}
            onClick={(e) => {
              handleActionClick(action.id, e);
            }}
          />
        ))}
      </SpeedDial>
      <Modal
        ariaLabel="Modal Title based on action"
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        showCloseButton={true}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default GroupSettings;
