import { Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";
import CodeIcon from '@mui/icons-material/Code';
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const LoginPage = () => {
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
        }}
      >
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
        <CustomButton startIcon={<CodeIcon />} sx={{ fontSize: 15 }}>
          Behind The Code
        </CustomButton>
      </Stack>
    </>
  );
};

export default LoginPage;
