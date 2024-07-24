import { useCallback, useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import theme from "@theme";
import CustomBackdrop from "@components/CustomBackdrop";
import SettingsIcon from "@mui/icons-material/Settings";
import { useMutation } from "react-query";
import { signOut } from "@apis/auth/signOut";
import PreferenceSettingsModal from "./PreferenceSettingsModal";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/Spinner";
import useFeedbackHandler from "@hooks/useFeedbackHandler";
import useLogout from "@hooks/useLogout";

const actions = [
  {
    id: "preferenceSetting",
    IconComponent: SettingsIcon,
    name: "Preference Setting",
    className: "tooltip-preference-setting",
  },
  {
    id: "logout",
    IconComponent: LogoutIcon,
    name: "Logout",
    className: "tooltip-logout",
  },
];

const MainPageSettings = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [showOptions, setShowOptions] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const [isPreferenceSettingsModalOpen, setIsPreferenceSettingsModalOpen] =
    useState(false);

  const {
    mutate: executeSignOut,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(() => signOut());

  useEffect(() => {
    if (isLoading) {
      <Spinner isOverlay />;
    }
  }, [isLoading]);

  useFeedbackHandler({
    isError,
    errorMessage:
      "Sorry, Something went wrong during sign-out. Please try again.",
    isSuccess,
    successAction: useCallback(() => {
      logout();
      navigate("/");
    }, []),
  });

  const handleActionClick = (actionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setShowOptions(false);
    setSelectedAction(actionId);

    if (actionId === "preferenceSetting") {
      setIsPreferenceSettingsModalOpen(true);
    } else if (actionId === "logout") {
      executeSignOut();
    }
  };

  useEffect(() => {
    const clickOutsideSpeedDial = (event: MouseEvent) => {
      const speedDialNode = document.getElementById("speed-dial");

      if (speedDialNode && !speedDialNode.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener(
        "mousedown",
        clickOutsideSpeedDial as unknown as EventListener
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        clickOutsideSpeedDial as unknown as EventListener
      );
    };
  }, [showOptions, setShowOptions]);

  return (
    <>
      <CustomBackdrop isOpen={showOptions} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        id="speed-dial"
        icon={<MoreVertIcon sx={{ fontSize: theme.spacing(2.3) }} />}
        onClick={() => setShowOptions((prev) => !prev)}
        open={showOptions}
        direction="down"
        sx={{
          zIndex: (theme) => theme.zIndex.tooltip,
          "& .MuiFab-root": {
            fontSize: theme.spacing(2),

            boxShadow: "none",
            backgroundColor: showOptions ? "white" : theme.palette.default.main,
            color: showOptions ? theme.palette.default.main : "white",
            "&:hover": {
              backgroundColor: showOptions
                ? "#E0E0E0"
                : theme.palette.default.light,
            },
            p: 1.5,
            my: 0.5,
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
            backgroundColor: theme.palette.primary.main,
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
      {isPreferenceSettingsModalOpen && (
        <PreferenceSettingsModal
          isOpen={isPreferenceSettingsModalOpen}
          closePreferenceSettingsModal={() =>
            setIsPreferenceSettingsModalOpen(false)
          }
        />
      )}
    </>
  );
};

export default MainPageSettings;
