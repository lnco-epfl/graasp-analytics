import { styled } from '@mui/material';

export const CustomTooltipDiv = styled('p')(({ theme }) => ({
  backgroundColor: 'white',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  border: '0.5px solid #cccccc',
}));

export const CustomTooltipDivCount = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
}));
