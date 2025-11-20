import PropTypes from "prop-types";

// MUI
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Project
import Analytics from "@/sections/assistant-dashboard/index";

/***************************  DASHBOARD - ANALYTICS  ***************************/

export default function DashboardAnalytics() {

  return (
    <Stack sx={{ gap: 4 }}>

      <Box>
        <Analytics />
      </Box>
    </Stack>
  );
}

DashboardAnalytics.propTypes = { tab: PropTypes.string };