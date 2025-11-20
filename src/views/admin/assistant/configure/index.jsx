import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import General from './components/General';
import Voice from './components/Voice';
import CallConfiguration from './components/CallConfiguration';
import DataCollection from './components/DataExtraction';

// Import MUI components for tabs
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import PageLoader from '@/components/PageLoader';
import { getAssistantConfig } from '../../../../api/assistantApi';
import { useQuery } from '@tanstack/react-query';
import { AssistantList, NewAssistant, AssistantSidebar, AssistantTab } from '@/sections/assistant';
import { wrap } from 'lodash-es';

const ConfigureDashboard = () => {
  const { id: assistantId } = useParams();

  const [tab, setTab] = useState('General');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['assistantConfig', assistantId],
    queryFn: () => getAssistantConfig({ queryKey: ['assistantConfig', assistantId] }),
    enabled: !!assistantId,
  });

  // Handle loading state
  // if (isLoading) return <PageLoader />;

  // Handle error state
  if (isError) return <p>Error: {error.message}</p>;

  return (

    <Grid container spacing={4} sx={{ height: 'calc(100vh - 110px)', overflow: 'hidden', flexWrap: "nowrap" }}>
      {/* Sidebar */}
      <Grid
        item
        xs={3}
        md={3}
        sx={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <AssistantSidebar />
      </Grid>

      {/* Main content with scroll */}
      {isLoading ? <PageLoader /> :
        <Grid
          item
          xs={9}
          md={9}
          sx={{
            height: '100%',
            overflow: 'auto',
          }}
        >
          <General data={data?.data} />

        </Grid>
      }
    </Grid>

    // <Stack sx={{ gap: { xs: 2.5, md: 4 } }}>
    //   {/* <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 3, justifyContent: 'space-between' }}>
    //     <Tabs variant="scrollable" scrollButtons="auto" value={tab} onChange={handleChange} aria-label="setting tabs">
    //       <Tab label="General" value="General" />
    //       <Tab label="Voice" value="Voice" />
    //       <Tab label="Data Extraction" value="Data Extraction" />
    //       <Tab label="Call Configuration" value="Call Configuration" />
    //     </Tabs>
    //   </Stack> */}
    //   <Grid item xs={3}>
    //     <AssistantSidebar />
    //   </Grid>
    //   <Box>
    //     {tab === 'General' && <General data={data?.data} />}
    //     {tab === 'Voice' && <Voice data={data?.data} />}
    //     {tab === 'Call Configuration' && <CallConfiguration />}
    //     {tab === 'Data Extraction' && <DataCollection data={data?.data} />}
    //   </Box>
    // </Stack>
  );
};

export default ConfigureDashboard;
