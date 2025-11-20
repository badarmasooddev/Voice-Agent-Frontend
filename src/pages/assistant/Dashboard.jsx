import { Button, Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

export default function Dashboard({ id }) {
  return (
    <Stack spacing={3} sx={{ p: 3, bgcolor: 'background.default' }}>
      {/* Header */}
      <Typography variant="h5" fontWeight={600}>Dashboard</Typography>

      {/* Filters */}
      <Grid container justifyContent="flex-end" alignItems="center">
        <Grid item>
          <Select defaultValue="Last week" size="small" sx={{ minWidth: 120 }}>
            <MenuItem value="Last week">Last week</MenuItem>
            <MenuItem value="Last month">Last month</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Calls Summary */}
      <Card sx={{ borderRadius: 3, border: '1px solid #E0E0E0', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>Calls</Typography>
          <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ textAlign: 'center', minHeight: 150 }}>
            <Typography variant="body2" color="text.secondary">
              My Outbound Assistant has no calls recorded
            </Typography>
            <Typography variant="caption" color="text.secondary">
              A metric will appear here after your first call
            </Typography>
          </Stack>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" color="text.secondary">Total calls</Typography>
              <Typography variant="h6">0</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">Minutes used</Typography>
              <Typography variant="h6">0.0min</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">Avg. call duration</Typography>
              <Typography variant="h6">0.0min</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Actions Summary */}
      <Card sx={{ borderRadius: 3, border: '1px solid #E0E0E0', boxShadow: 3, mt: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600}>Actions</Typography>
          <Stack spacing={2} alignItems="center" justifyContent="center" sx={{ textAlign: 'center', minHeight: 150 }}>
            <Typography variant="body2" color="text.secondary">
              We couldn't find any actions
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Set up your first action in the actions tab
            </Typography>
          </Stack>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" color="text.secondary">Total actions</Typography>
              <Typography variant="h6">0</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">Appts. scheduled</Typography>
              <Typography variant="h6">n/a</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">Live transfers</Typography>
              <Typography variant="h6">n/a</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">SMS sent</Typography>
              <Typography variant="h6">n/a</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">Custom actions</Typography>
              <Typography variant="h6">n/a</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}