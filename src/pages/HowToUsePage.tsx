import { Stack, Typography } from "@mui/material";

const HowToUsePage = () => {
  return (
    <Stack
      spacing={5}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "white",
      }}
    >
      <Typography variant="h4" color="white">
        How To Use
      </Typography>
      <video width="100%" controls>
        <source src="/videos/how-to-use.mp4" type="video/mp4" />
      </video>
    </Stack>
  );
};

export default HowToUsePage;
