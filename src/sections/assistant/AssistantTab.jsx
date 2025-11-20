import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// @mui
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

// @project
import PageLoader from '@/components/PageLoader';
import { handlerActiveItem, useGetMenuMaster } from '@/states/menu';
import AssistantDashboard from '../../views/admin/assistant-dashboard/analytics';

export default function AssistantTabs() {
    const navigate = useNavigate();
    const location = useLocation();
    const { menuMaster } = useGetMenuMaster();

    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('assistant');
    const handleChange = (event, newValue) => {
        navigate(`/assistant/${newValue}`);
        setTab(newValue)
    };
    useEffect(() => {
        if (menuMaster.openedItem !== 'assitant') handlerActiveItem('assitant');
    }, [location.pathname]);

    return (
        <Stack sx={{ gap: { xs: 2.5, md: 4 } }}>
            {loading && <PageLoader />}
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 3, justifyContent: 'space-between' }}>
                <Tabs variant="scrollable" scrollButtons="auto" value={tab} onChange={handleChange} aria-label="assitant tabs">
                    <Tab label="Dashboard" value="dashboard" />
                    <Tab label="App Setting" value="app-setting" />
                    <Tab label="Test" value="test" />
                </Tabs>
            </Stack>
            <Box>
                {tab === 'Dashboard' && <AssistantDashboard />}
                {tab === 'App Setting' && <AssistantDashboard />}
                {tab === 'Test' && <AssistantDashboard />}
            </Box>
        </Stack>
    );
}

AssistantTabs.propTypes = { tab: PropTypes.string };