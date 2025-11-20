// @mui
import Grid from '@mui/material/Grid2';

// @project
import AnalyticsOverviewCard from './AnalyticsOverviewCard';
import AnalyticsOverviewChart from './AnalyticsOverviewChart';
import AnalyticsTopRef from './AnalyticsTopRef';
import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from '../../../../api/analyticsApi';
import PageLoader from '@/components/PageLoader';

/***************************  ANALYTICS - OVERVIEW  ***************************/

export default function AnalyticsOverview() {

  const { data, isLoading } = useQuery({
    queryKey: ['getAanlytics'],
    queryFn: getAnalytics
  })

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {isLoading && <PageLoader />}
      {!isLoading &&
        <><Grid size={12}>
          <AnalyticsOverviewCard data={data.data.data} />
        </Grid>
          <Grid size={12}>
            <AnalyticsOverviewChart dailyCallData={data.data.data.dailyStats} />
          </Grid>
          <Grid size={12}>
            <AnalyticsTopRef data={data.data.data.agentStats} />
          </Grid>
        </>
      }
    </Grid>
  );
}
