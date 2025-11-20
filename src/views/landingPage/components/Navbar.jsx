import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { IconMenuDeep } from '@tabler/icons-react';
import NavPrimaryButton from "./NavbarButton";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handle_toggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact Us", path: "/contact" },
  ];
  console.log("nav links>>", navLinks);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none", padding: "10px 20px" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "600", color: "#006397", fontSize: { xs: "25px", sm: "25px", md: "30px", lg: "40px" }, fontFamily: "Poppins" }}
        >
          TERALEADS AI
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <Box
            sx={{
              backgroundColor: "#EBEEF3",
              padding: "10px 50px",
              borderRadius: "20px",
              display: "flex",
              gap: "20px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  color: window.location.pathname === link.path ? "#006397" : "#000",
                  fontSize: "1rem",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px" }}>
          <Link to="/auth/login">
            <NavPrimaryButton
              sx={{
                color: "#005f8c",
                borderColor: "#005f8c",
                borderRadius: "20px",
                textTransform: "capitalize",
                padding: "3px 25px",
                "&:hover": {
                  backgroundColor: "#e0f4ff",
                  borderColor: "#004a6e",
                },
              }}
              variant="outlined"
            >
              Login
            </NavPrimaryButton>
          </Link>
          <Link to="/auth/register">
            <NavPrimaryButton
              sx={{
                backgroundColor: "#005f8c",
                color: "#fff",
                borderRadius: "20px",
                textTransform: "capitalize",
                padding: "5px 25px",
                "&:hover": {
                  backgroundColor: "#004a6e",
                },
              }}
              variant="contained"
            >
              Signup
            </NavPrimaryButton>
          </Link>
        </Box>
        <IconButton
          sx={{ display: { xs: "block", md: "none" }, border: "none" }}
          onClick={handle_toggle}
        >
          <IconMenuDeep stroke={2} style={{ color: "#005f8c" }} />
        </IconButton>
      </Toolbar>
      <Drawer anchor="right" open={mobileOpen} onClose={handle_toggle}>
        <List sx={{ height: "100vh", width: 250, padding: "20px", bgcolor: "#00392" }}>
          {navLinks.map((link) => (
            <ListItem button={"true"} key={link.name} onClick={handle_toggle}>
              <Link to={link.path}>
                <ListItemText primary={link.name} sx={{ color: "#000", fontSize: "1rem", fontWeight: "600" }} />
              </Link>
            </ListItem>
          ))}
          <ListItem button={"true"}>
            <Link to="/login" style={{ textDecoration: "none", width: "100%" }}>
              <NavPrimaryButton sx={{
                color: "#005f8c",
                borderColor: "#005f8c",
                borderRadius: "20px",
                textTransform: "capitalize",
                padding: "3px 25px",
                "&:hover": {
                  backgroundColor: "#e0f4ff",
                  borderColor: "#004a6e",
                },
              }}
                variant="outlined">
                Login
              </NavPrimaryButton>
            </Link>
          </ListItem>
          <ListItem button={"true"}>
            <Link to="/signup" style={{ textDecoration: "none", width: "100%" }}>
              <NavPrimaryButton sx={{
                color: "#005f8c",
                borderColor: "#005f8c",
                borderRadius: "20px",
                textTransform: "capitalize",
                padding: "3px 20px",
                "&:hover": {
                  backgroundColor: "#e0f4ff",
                  borderColor: "#004a6e",
                },
              }}
                variant="outlined">
                Signup
              </NavPrimaryButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
