import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import MainCard from '@/components/MainCard';

/***************************  PRESENTATION CARD  ***************************/

export default function PresentationCard({ title, children }) {
  return (
    <MainCard sx={{
      p: 5,
      textAlign: "start",
      backgroundColor: "#E6E8EE",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "start",
      borderRight: "2px solid #C2C2C2",
      borderBottom: "2px solid #C2C2C2",
    }}>
      <Stack sx={{ gap: 3.25 }}>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </MainCard>
  );
}

PresentationCard.propTypes = { title: PropTypes.string, children: PropTypes.any };
