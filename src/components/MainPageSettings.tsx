import { useEffect, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import theme from "@theme";
import CustomBackdrop from "@components/CustomBackdrop";
import SettingsIcon from "@mui/icons-material/Settings";
import { useMutation } from "react-query";
import { signOut } from "@apis/auth/signOut";
import PreferenceSettingsModal from "./PreferenceSettingsModal";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "@store/snackbarStore";
import { useNavigate } from "react-router-dom";
import Spinner from "@components/Spinner";

const actions = [
  {
    id: "preferenceSetting",
    icon: <SettingsIcon sx={{ color: "white" }} />,
    name: "Preference Setting",
    className: "tooltip-preference-setting",
  },
  {
    id: "logout",
    icon: <LogoutIcon sx={{ color: "white" }} />,
    name: "Logout",
    className: "tooltip-logout",
  },
];

const MainPageSettings = () => {
  const navigate = useNavigate();

  const [showOptions, setShowOptions] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const setSnackbar = useSetRecoilState(snackbarState);


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
      <Spinner isOverlay/>
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      setSnackbar({
        show: true,
        message:
          "Sorry, Something went wrong during sign-out. Please try again.",
        severity: "error",
      });
    }
  }, [isError, setSnackbar]);


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
        icon={<MoreVertIcon />}
        onClick={() => setShowOptions((prev) => !prev)}
        open={showOptions}
        direction="down"
        sx={{
          zIndex: (theme) => theme.zIndex.tooltip,
          "& .MuiFab-root": {
            boxShadow: "none",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
            p: 1.5,
            my: 0.5,
            width: (theme) => theme.spacing(4),
            height: (theme) => theme.spacing(4),
            minHeight: (theme) => theme.spacing(4),
          },
          // "& .MuiSpeedDial-actions": {
          //   p: 0,
          //   m: 0,
          //   border: "2px solid red",
          // },
          "& .MuiSpeedDial-actions > *": {
            my: 1,
          },
          "& .MuiSpeedDialAction-staticTooltipLabel": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
            textWrap: "nowrap",
          },
          [`& .${hoveredAction}`]: {
            backgroundColor: theme.palette.primary.light,
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
