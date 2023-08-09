import InfoIcon from '@mui/icons-material/Info';
import { Stack, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

const ChartTitle = ({
  title,
  description = title,
}: {
  title: string;
  description?: string;
}): JSX.Element => (
  <Stack
    spacing={1}
    pt={2}
    direction="row"
    alignItems="center"
    justifyContent="center"
  >
    <Typography variant="h6" align="center">
      {title}
    </Typography>
    <Tooltip title={description}>
      <InfoIcon color="primary" />
    </Tooltip>
  </Stack>
);

export default ChartTitle;
