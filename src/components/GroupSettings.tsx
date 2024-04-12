import { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import theme from "@theme";
import CustomModal from "@components/CustomModal";
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
    icon: <Diversity3Icon sx={{ color: "white" }} />,
    name: "View Members",
    className: "tooltip-view-members",
  },
  {
    id: "addMembers",
    icon: <PersonAddAlt1Icon sx={{ color: "white" }} />,
    name: "Add Members",
    className: "tooltip-add-members",
  },
  {
    id: "monthlyReport",
    icon: <AssessmentIcon sx={{ color: "white" }} />,
    name: "Monthly Report",
    className: "tooltip-monthly-report",
  },
  {
    id: "leaveGroup",
    icon: <LogoutIcon sx={{ color: "white" }} />,
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
  show: boolean;
};

const GroupSettings = ({
  groupId,
  groupName,
  isMonthlyReportUpdateOn,
  setIsGroupOptionsVisible,
  show,
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

    if (show) {
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
  }, [show, setIsGroupOptionsVisible]);

  return (
    <>
      <CustomBackdrop isOpen={show} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        id="speed-dial"
        icon={<MoreVertIcon />}
        onClick={() => setIsGroupOptionsVisible((prev) => !prev)}
        open={show}
        direction="down"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.tooltip,
          "& .MuiFab-root": {
            boxShadow: "none",
            backgroundColor: theme.palette.primary.light,
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
            width: (theme) => theme.spacing(4),
            height: (theme) => theme.spacing(4),
            minHeight: (theme) => theme.spacing(4),
          },
          "& .MuiSpeedDial-actions > *": {
            my: 1,
          },
          "& .MuiSpeedDialAction-staticTooltipLabel": {
            backgroundColor: theme.palette.primary.light,
            color: "white",
            textWrap: "nowrap",
          },
          [`& .${hoveredAction}`]: {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
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
      <CustomModal
        ariaLabel="Modal Title based on action"
        closeModal={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        showCloseButton={true}
      >
        {renderModalContent()}
      </CustomModal>
    </>
  );
};

export default GroupSettings;
