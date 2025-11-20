import React, { useState } from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CRMOptions from "../../../sections/crm-integration/CRMOptions";
import CRMIntegrationForm from "../../../sections/crm-integration/CRMIntegrationForm";

const CRMIntegration = () => {
    const [selectedCRM, setSelectedCRM] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleOpenDrawer = (crm) => {
        setSelectedCRM(crm);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setTimeout(() => setSelectedCRM(null), 300);
    };

    return (
        <Box sx={{ minHeight: "100vh", p: 0 }}>
            <CRMOptions onSelect={handleOpenDrawer} />

            <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer} > 
                <Box sx={{ width: 400, p: 3, position: "relative" }}>
                    <IconButton 
                        onClick={handleCloseDrawer} 
                        sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {selectedCRM && <CRMIntegrationForm crmType={selectedCRM} onClose={handleCloseDrawer} />}
                </Box>
            </Drawer>
        </Box>
    );
};

export default CRMIntegration;
