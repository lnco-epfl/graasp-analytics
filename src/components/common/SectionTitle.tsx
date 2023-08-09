import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

const SectionTitle = ({
  title,
  icons,
}: {
  title: string;
  icons?: JSX.Element[];
}): JSX.Element => (
  <Grid container alignItems="center" justifyContent="center">
    <Typography variant="h3" align="center" fontWeight={900} color="#8C8C8C">
      {title}
      {icons}
    </Typography>
  </Grid>
);

export default SectionTitle;
