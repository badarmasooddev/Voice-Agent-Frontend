import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const integrations = [
    { name: "Zapier", description: "Automate tasks and workflows across multiple apps with Zapier.", logo: "/assets/images/logo/zapier.png" },
    { name: "HubSpot", description: "Import and manage your contacts directly by integrating HubSpot.", logo: "/assets/images/logo/hubspot.png" },
];

const CRMOptions = ({ onSelect }) => {
    return (
        <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", px: 0, pt: 0 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    Integrations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Take your journey to the next level with add-ons and integrations.
                </Typography>
                <Box sx={{ borderBottom: "1px solid #e0e0e0", my: 2 }} />
            </Box>

            <Typography variant="body2" fontWeight="bold" sx={{ mb: 2 }}>
                ALL INTEGRATIONS
            </Typography>

            <Grid container spacing={2}>
                {integrations.map((integration) => (
                    <Grid item xs={12} sm={6} md={4} key={integration.name}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                textAlign: "left",
                                cursor: "pointer",
                                border: "1px solid #e0e0e0",
                                transition: "0.3s",
                                "&:hover": { boxShadow: 4, borderColor: "#F4FCFF" }
                            }}
                            onClick={() => onSelect(integration.name)}
                        >
                            <Box display="flex" alignItems="center" gap={2} mb={1}>
                                <img 
                                    src={integration.logo} 
                                    alt={integration.name} 
                                    width={32} 
                                    height={32} 
                                    style={{ objectFit: "contain" }} 
                                />
                                <Typography variant="h6" fontWeight="bold">
                                    {integration.name}
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {integration.description}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CRMOptions;
