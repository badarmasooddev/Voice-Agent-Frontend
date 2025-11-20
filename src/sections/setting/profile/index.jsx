// @mui
import Grid from '@mui/material/Grid2';

// @project
import ProfileDetails from './ProfileDetails';
import ProfileLoginService from './ProfileLoginService';
import ProfilePreferredLanguage from './ProfilePreferredLanguage';
import ProfileTimezone from './ProfileTimezone';
import { useState } from 'react';

/***************************  SETTING - PROFILE  ***************************/

export default function ProfileSetting() {
  const [loading, setLoading] = useState(false); 
  // this is the profle main component
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid size={12}>
        <ProfileDetails loading={loading} setLoading={setLoading} />
      </Grid>
      {/* <Grid size={12}>
        <ProfileLoginService />
      </Grid> */}
      {/* <Grid size={12}>
        <ProfilePreferredLanguage />
      </Grid> */}
      {/* <Grid size={12}>
        <ProfileTimezone />
      </Grid> */}
    </Grid>
  );
}
