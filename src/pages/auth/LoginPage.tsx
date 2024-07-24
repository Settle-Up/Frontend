import { Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import theme from "@theme";

const LoginPage = () => {
  const navigate = useNavigate();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "white",
          position: "relative",
        }}
      >
        <Stack
          spacing={1}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            "& > *": {
              whiteSpace: "nowrap",
            },
          }}
        >
          <CustomButton
            startIcon={<GitHubIcon />}
            href="https://github.com/Settle-Up/settle-up-client"
            sx={{
              fontSize: 12,
              py: 0.5,
              backgroundColor: "transparent",
              color: "white",
              "&:hover": {
                backgroundColor: theme.palette.default.main,
              },
              border: "2px solid white",
            }}
          >
            Frontend
          </CustomButton>
          <CustomButton
            startIcon={<GitHubIcon />}
            href="https://donghee9.github.io/IntroduceSettleUp/"
            sx={{
              fontSize: 12,
              py: 0.5,
              backgroundColor: "transparent",
              color: "white",
              "&:hover": {
                backgroundColor: theme.palette.default.main,
              },
              border: "2px solid white",
            }}
          >
            Backend
          </CustomButton>
        </Stack>
        <Typography variant="h5">Let's</Typography>
        <Typography variant="h3">SettleUp</Typography>
        <Typography variant="subtitle1" sx={{ pt: 5 }}>
          Simplify. Split. Settle.
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <CustomButton
          onClick={() => handleKakaoLogin()}
          startIcon={<ChatBubbleIcon />}
          sx={{
            fontSize: 15,
            backgroundColor: "#fee500",
            color: "black",
            "&:hover": {
              backgroundColor: "#FFED47",
            },
          }}
        >
          Kakao Login
        </CustomButton>
        <CustomButton
          startIcon={<LockOpenIcon />}
          sx={{ fontSize: 15 }}
          onClick={() => {
            navigate("/start-demo");
          }}
          buttonStyle="default"
        >
          Try It Without Sign Up
        </CustomButton>
        <CustomButton
          startIcon={<InfoIcon />}
          sx={{ fontSize: 15 }}
          onClick={() => {
            navigate("/how-to-use");
          }}
          buttonStyle="default"
        >
          How To Use
        </CustomButton>
      </Stack>
    </>
  );
};

export default LoginPage;
