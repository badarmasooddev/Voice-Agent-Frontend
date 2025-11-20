import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

// @project
import BehaviorCard from '@/components/cards/BehaviorCard';
import MainCard from '@/components/MainCard';
import { getRadiusStyles } from '@/utils/getRadiusStyles';

// @assets
import { IconArrowDown, IconArrowUpRight } from '@tabler/icons-react';
import { getElevenLabConversations } from '@/api/callLogs';
import { getAssistantById } from '@/api/assistantApi';
import PageLoader from '@/components/PageLoader';

/***************************  CARDS - BORDER WITH RADIUS  ***************************/

export function applyBorderWithRadius(radius, theme) {
  return {
    overflow: 'hidden',
    '--Grid-borderWidth': '1px',
    borderTop: 'var(--Grid-borderWidth) solid',
    borderLeft: 'var(--Grid-borderWidth) solid',
    borderColor: 'divider',
    '& > div': {
      overflow: 'hidden',
      borderRight: 'var(--Grid-borderWidth) solid',
      borderBottom: 'var(--Grid-borderWidth) solid',
      borderColor: 'divider',
      [theme.breakpoints.down('md')]: {
        '&:nth-of-type(1)': getRadiusStyles(radius, 'topLeft'),
        '&:nth-of-type(2)': getRadiusStyles(radius, 'topRight'),
        '&:nth-of-type(3)': getRadiusStyles(radius, 'bottomLeft'),
        '&:nth-of-type(4)': getRadiusStyles(radius, 'bottomRight')
      },
      [theme.breakpoints.up('md')]: {
        '&:first-of-type': getRadiusStyles(radius, 'topLeft', 'bottomLeft'),
        '&:last-of-type': getRadiusStyles(radius, 'topRight', 'bottomRight')
      }
    }
  };
}

/***************************   BEHAVIOR CARD - DATA  ***************************/


// const userBehaviorAnalytics = [
//   {
//     title: 'Total call made',
//     value: '23,876',
//     compare: 'vs last month',
//     chip: {
//       label: '24.5%',
//       icon: <IconArrowUpRight />
//     }
//   },
//   {
//     title: 'Success Ration',
//     value: '30,450',
//     compare: 'vs last month',
//     chip: {
//       label: '20.5%',
//       icon: <IconArrowUpRight />
//     }
//   },
//   {
//     title: 'Average call duration',
//     value: '34,789',
//     compare: 'vs last month',
//     chip: {
//       label: '20.5%',
//       color: 'error',
//       icon: <IconArrowDown />
//     }
//   }
// ];

/***************************   USER BEHAVIOR - CARDS  ***************************/

export default function AnalyticsBehaviorCard() {
  const theme = useTheme();
  const cardCommonProps = { border: 'none', borderRadius: 0, boxShadow: 'none' };
  const { id: assistantId } = useParams();

  const [agentId, setAgentId] = useState(null);

  const { data: assistantData, isLoading: isAssistantLoading, isError: isAssistantError } = useQuery({
    queryKey: ['assistant', assistantId],
    queryFn: () => getAssistantById(assistantId),
    enabled: !!assistantId,
  });

  useEffect(() => {
    if (assistantData?.data?.agentId) {
      setAgentId(assistantData.data.agentId);
    }
  }, [assistantData]);

  const { data: apiResponse, isLoading: isCallLogsLoading, isError: isCallLogsError } = useQuery({
    queryKey: ['callLogs', agentId],
    queryFn: () => getElevenLabConversations(agentId),
    enabled: !!agentId,
  });
  console.log(apiResponse)

// Ensure apiResponse and its structure before accessing properties
const totalCalls = apiResponse?.data?.conversations?.length || 0;

// Success Ratio Calculation
const successfulCalls = apiResponse?.data?.conversations?.filter(conv => conv.call_successful === "success").length || 0;
const successRatio = totalCalls > 0 ? ((successfulCalls / totalCalls) * 100).toFixed(1) + "%" : "0%";

// Average Call Duration Calculation
const totalDuration = apiResponse?.data?.conversations?.reduce((acc, conv) => acc + conv.call_duration_secs, 0) || 0;
const avgCallDuration = totalCalls > 0 ? (totalDuration / totalCalls).toFixed(2) + " secs" : "0 secs";

// Final analytics array
const userBehaviorAnalytics = [
  {
    title: 'Total Calls Made',
    value: totalCalls.toLocaleString(),
    compare: 'vs last month',
    chip: {
      label: '24.5%',
      icon: <IconArrowUpRight />
    }
  },
  {
    title: 'Success Ratio',
    value: successRatio,
    compare: 'vs last month',
    chip: {
      label: '20.5%',
      icon: <IconArrowUpRight />
    }
  },
  {
    title: 'Average Call Duration',
    value: avgCallDuration,
    compare: 'vs last month',
    chip: {
      label: '20.5%',
      color: 'error',
      icon: <IconArrowDown />
    }
  }
];

  return (
    <> {isAssistantLoading || isCallLogsLoading ? (
      <PageLoader />
    ) : isAssistantError || isCallLogsError ? (
      <Typography color="error">Failed to fetch data.</Typography>
    ) : (
      <Grid container sx={{ borderRadius: 4, boxShadow: theme.customShadows.section, ...applyBorderWithRadius(16, theme) }}>
        {userBehaviorAnalytics.map((item, index) => (
          <Grid key={index} size={{ xs: 6, md: 2.75 }}>
            <BehaviorCard {...{ ...item, cardProps: { sx: cardCommonProps } }} />
          </Grid>
        ))}
        <Grid size={{ xs: 6, md: 3.75 }}>
          <MainCard sx={{ ...cardCommonProps, height: 1, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              You have increased your call by{' '}
              <Typography
                component="span"
                variant="inherit"
                sx={{ color: 'success.main', ...theme.applyStyles('dark', { color: 'success.light' }) }}
              >
                6.2%
              </Typography>{' '}
              this month and decreased by{' '}
              <Typography
                component="span"
                variant="inherit"
                sx={{ color: 'error.main', ...theme.applyStyles('dark', { color: 'error.light' }) }}
              >
                3.2%
              </Typography>
            </Typography>
          </MainCard>
        </Grid>
      </Grid>
    )}</>
  );
}
