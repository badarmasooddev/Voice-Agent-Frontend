import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import MainCard from '@/components/MainCard';

/***************************   GENERAL - BRAND ASSETS  ***************************/
export default function GeneralBrandAssets({ tab }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/setting/general/${tab}`);
  };

  return (
    <MainCard>
      <Stack direction="row" sx={{ gap: 0.5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack sx={{ gap: 0.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            Brand assets
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Integrate brand assets across sales channels, themes, and apps
          </Typography>
        </Stack>
        <Button variant="outlined" color="secondary" onClick={handleButtonClick}>
          Manage
        </Button>
      </Stack>
    </MainCard>
  );
}

GeneralBrandAssets.propTypes = { tab: PropTypes.string };
