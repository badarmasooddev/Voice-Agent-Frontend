import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import MainCard from '@/components/MainCard';
import CustomTooltip from '@/components/third-party/chart/CustomTooltip';
import Legend from '@/components/third-party/chart/Legend';

// @assets
import { getElevenLabConversations } from '@/api/callLogs';
import { getAssistantById } from '@/api/assistantApi';

// **************************** CHART - CUSTOM TOOLTIP **************************** //

function TooltipWrapper({ counter, groupLabel = '', label = '' }) {
  return <CustomTooltip counter={counter} groupLabel={groupLabel} label={label} />;
}

// ***************************  USER BEHAVIOR - DAILY CHART ************************** //

export default function AnalyticsBehaviorChart() {
  const theme = useTheme();
  const { id: assistantId } = useParams();

  const [barchart, setBarchart] = useState({
    success: true,
    failed: true
  });

  const { data: assistantData, isLoading: isAssistantLoading, isError: isAssistantError } = useQuery({
    queryKey: ['assistant', assistantId],
    queryFn: () => getAssistantById(assistantId),
    enabled: !!assistantId,
  });

  const agentId = assistantData?.data?.agentId;

  const { data: apiResponse, isLoading: isCallLogsLoading, isError: isCallLogsError } = useQuery({
    queryKey: ['dailyCallLogs', agentId],
    queryFn: () => getElevenLabConversations(agentId),
    enabled: !!agentId,
  });

  const dailyData = {};

  if (apiResponse?.data?.conversations) {
    apiResponse.data.conversations.forEach((conv) => {
      if (conv.start_time_unix_secs) {
        const date = new Date(conv.start_time_unix_secs * 1000).toISOString().split('T')[0];
  
        if (!dailyData[date]) {
          dailyData[date] = { success: 0, failed: 0 };
        }
  
        if (conv.call_successful === "success") {
          dailyData[date].success += 1;
        } else {
          dailyData[date].failed += 1;
        }
      }
    });
  }
  
  const xAxisData = Object.keys(dailyData);
  const successData = xAxisData.map(date => dailyData[date].success);
  const failedData = xAxisData.map(date => dailyData[date].failed);

  const seriesData = [
    {
      data: successData,
      label: 'Success',
      id: 'success',
      color: theme.palette.primary.main,
      visible: barchart['success']
    },
    {
      data: failedData,
      label: 'Failed',
      id: 'failed',
      color: theme.palette.primary.light,
      visible: barchart['failed']
    }
  ];

  const visibleSeries = seriesData.filter((s) => s.visible);

  const legendItems = seriesData.map((series) => ({
    label: series.label,
    color: series.color,
    visible: series.visible,
    id: series.id
  }));

  return (
    <MainCard sx={{width: "65%"}}>
      <Stack sx={{ gap: 3.75 }}>
        <Stack direction="row" sx={{ alignItems: 'end', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h4">Daily Call Analysis</Typography>
            <Typography variant="caption" color="grey.700">
              Monitor daily call behavior to enhance user experience and retention.
            </Typography>
          </Stack>
        </Stack>
        <Legend items={legendItems} onToggle={(id) => setBarchart(prev => ({ ...prev, [id]: !prev[id] }))} />
      </Stack>

      {isAssistantLoading || isCallLogsLoading ? (
        <Typography align="center">Loading data...</Typography>
      ) : isAssistantError || isCallLogsError ? (
        <Typography align="center" color="error">Failed to fetch data.</Typography>
      ) : (
        <BarChart
          xAxis={[{ scaleType: 'band', data: xAxisData, disableLine: true, disableTicks: true }]}
          grid={{ horizontal: true }}
          series={visibleSeries}
          yAxis={[{ disableLine: true, disableTicks: true }]}
          colors={seriesData.map((series) => series.color)}
          height={256}
          borderRadius={8}
          slots={{
            itemContent: ({ series, itemData }) => (
              <TooltipWrapper
                counter={series.data[itemData.dataIndex] || ''}
                groupLabel={series.label}
                label={xAxisData[itemData.dataIndex]}
              />
            )
          }}
          slotProps={{ legend: { hidden: true } }}
          tooltip={{ trigger: 'item' }}
          margin={{ top: 40, right: 20, bottom: 20, left: 40 }}
        />
      )}
    </MainCard>
  );
}

TooltipWrapper.propTypes = { counter: PropTypes.any, groupLabel: PropTypes.string, label: PropTypes.string };
