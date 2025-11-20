import PropTypes from 'prop-types';
import { useEffect ,useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

import { handlerActiveItem, useGetMenuMaster } from '@/states/menu';
import { AuthenticationSetting, GeneralSetting, I18nSetting, PricingSetting, ProfileSetting, AppSetting } from '../../../sections/setting';
import { IconDownload, IconPlus, IconUpload } from '@tabler/icons-react';

export default function Setting() {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuMaster } = useGetMenuMaster();
  const [tab, setTab] = useState('profile');
  const handleChange = (event, newValue) => {
    navigate(`/setting/${newValue}`);
    setTab(newValue);
  };
  useEffect(() => {
    if (menuMaster.openedItem !== 'setting') handlerActiveItem('setting');
  }, [location.pathname]);

  return (
    <Stack sx={{ gap: { xs: 2.5, md: 4 } }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 3, justifyContent: 'space-between' }}>
        <Tabs variant="scrollable" scrollButtons="auto" value={tab} onChange={handleChange} aria-label="setting tabs">
          <Tab label="Profile" value="profile" />
          <Tab label="App Setting" value="appsetting" />
          {/* <Tab label="Pricing" value="pricing" /> */}
          {/* <Tab label="Internationalization" value="internationalization" /> */}
          {/* <Tab label="Authentication" value="authentication" /> */}
        </Tabs>
        {/* {tab === 'internationalization' && (
          <Stack
            direction="row"
            sx={{ width: { xs: 1, sm: 'unset' }, gap: 1.5, alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' } }}
          >
            <Button variant="outlined" color="secondary" startIcon={<IconUpload size={16} />}>Export</Button>
            <Button variant="outlined" color="secondary" startIcon={<IconDownload size={16} />}>Import</Button>
            <IconButton variant="contained" color="primary" aria-label="add">
              <IconPlus size={16} />
            </IconButton>
          </Stack>
        )} */}
      </Stack>

      <Box>
        {tab === 'profile' && <ProfileSetting />}
        {tab === 'appsetting' && <AppSetting />}
        {/* {tab === 'pricing' && <PricingSetting />} */}
        {/* {tab === 'internationalization' && <I18nSetting />} */}
        {/* {tab === 'authentication' && <AuthenticationSetting />} */}
      </Box>
    </Stack>
  );
}

Setting.propTypes = { tab: PropTypes.string };