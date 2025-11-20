// @mui
import Grid from '@mui/material/Grid2';

// @project;
import AnalyticsBehaviorCard from './AnalyticsBehaviorCard';
import AnalyticsBehaviorChart from './AnalyticsBehaviorChart';
import AnalyticsBehaviorTable from './AnalyticsBehaviorTable';
import AnalyticsBehaviorTrafficDevice from './AnalyticsBehaviorTrafficDevice';
import CampaignPerformance from './CampaignPerformance';

/***************************  ANALYTICS - USER BEHAVIOR  ***************************/

export default function Analytics() {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid size={12}>
        <AnalyticsBehaviorTable />
      </Grid>
      <Grid size={12}>
        {/* <AnalyticsBehaviorCard /> */}
      </Grid>
      {/* <Grid size={12} sx={{display: "flex", gap: 2}}>
        <AnalyticsBehaviorChart />
        <CampaignPerformance/>
      </Grid> */}
    </Grid>
  );
}
