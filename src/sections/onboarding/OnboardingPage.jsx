import { Container, Typography, Box, AppBar, Toolbar } from "@mui/material";
import OnboardingForm from "./OnboardingForm";
import Copyright from "@/sections/auth/Copyright";

const OnboardingPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          width: "100vw",
          height: "5vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: "5vh",
            padding: 0,
          }}
        >
          <Box
            component="img"
            src="/Teralead icon.png"
            alt="Teraleads Logo"
            sx={{ height: "40%", mr:1 }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "#333",
              fontSize: "20px",
              lineHeight: "5vh",
            }}
          >
            tera
            <Typography
              component="span"
              sx={{ fontWeight: "bold", color: "#000", fontSize: "20px"}}
            >
              leads
            </Typography>
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          textAlign: "center",
          mt: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 2,
          }}
        >
          Welcome On Board!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#555",
            mb: 3,
            fontSize: "14px",
          }}
        >
          Before you can start using AI-driven features and seamless calling
          functionalities, you need to configure your API keys.  
          <br />
          Setting up your API keys ensures secure communication and unlocks the full potential of AI to assist you efficiently.
        </Typography>

        <OnboardingForm />
      </Box>
      <Copyright />
    </Container>
  );
};

export default OnboardingPage;
