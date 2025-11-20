import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

// MUI
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

// Project
import { handlerActiveItem, useGetMenuMaster } from "@/states/menu";
import { AnalyticsOverview, AnalyticsPerformance, AnalyticsUserBehavior } from "@/sections/dashboard/analytics";

/***************************  DASHBOARD - ANALYTICS  ***************************/

export default function DashboardAnalytics() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { menuMaster } = useGetMenuMaster();

  // Get tab from URL params or default to "overview"
  const [tab, setTab] = useState(params.tab || "overview");
  const handleChange = (event, newValue) => {
    navigate(`/dashboard/analytics/${newValue}`);
    setTab(newValue);
  };


  useEffect(() => {
    if (menuMaster.openedItem !== "dashboard") handlerActiveItem("dashboard");
  }, [location.pathname]);

  return (
    <Stack sx={{ gap: 4 }}>
      {/* <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={tab}
        onChange={handleChange}
        aria-label="analytics tabs"
      >
        <Tab label="Overview" value="overview" />
        <Tab label="User Behavior" value="user-behavior" />
        <Tab label="Performance" value="performance" />
      </Tabs> */}
      <Box>
        <AnalyticsOverview />
        {/* {tab === "overview" && <AnalyticsOverview />} */}
        {/* {tab === "user-behavior" && <AnalyticsUserBehavior />}
        {tab === "performance" && <AnalyticsPerformance />} */}
      </Box>
    </Stack>
  );
}

DashboardAnalytics.propTypes = { tab: PropTypes.string };