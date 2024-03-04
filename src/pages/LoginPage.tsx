import kakaoLoginImg from "@assets/kakaoLoginImg.png";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomButton from "@components/CustomButton";

const LoginPage = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        maxWidth: "1000px",
        justifyContent: "center",
        alignSelf: "center",
        m: "auto",
        gap: 2,
        border: "10px dotted red",
      }}
    >
     
        <Box>
          <Typography>Let's</Typography>
          <Typography variant="h4">Settle Up</Typography>
          <Typography>Simplify. Split. Settle.</Typography>
        </Box>

        <Stack spacing={2} sx={{width: "100%"}}>
          {/* <img
            onClick={() => handleKakaoLogin()}
            src={kakaoLoginImg}
            alt="kakao-login-button"
          /> */}
          <Button
            onClick={() => handleKakaoLogin()}
            sx={{ backgroundColor: "#fee500", color: "black" }}
          >
            Kakao Login
          </Button>
          <CustomButton
            buttonStyle="primary"
            sx={{ borderRadius: 1, height: "45px" }}
          >
            How to use
          </CustomButton>
        </Stack>
    </Box>
  );
};

export default LoginPage;
