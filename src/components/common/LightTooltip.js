import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background,
    color: 'white',
    fontSize: 12,
  },
}))(Tooltip);

export default LightTooltip;
