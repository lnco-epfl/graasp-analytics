import { Alert, styled } from '@mui/material';

const StyledAlert = styled(Alert)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

export default StyledAlert;
