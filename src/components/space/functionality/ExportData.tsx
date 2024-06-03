import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import { ExportActionsFormatting } from '@graasp/sdk';

import { Braces, Grid3X3 } from 'lucide-react';

import { useAnalyticsTranslation } from '@/config/i18n';
import {
  EXPORT_ACTIONS_BUTTON_ID,
  buildSelectExportFormatID,
} from '@/config/selectors';
import { ANALYTICS } from '@/langs/constants';

import { mutations } from '../../../config/queryClient';

const SelectFormatRadio = ({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: ExportActionsFormatting;
  description: string;
}) => (
  <FormControlLabel
    control={<Radio value={title} />}
    id={buildSelectExportFormatID(title)}
    label={
      <>
        <Box display="flex" alignItems="center" gap={0.5}>
          {icon}
          {title}
        </Box>
        <Typography variant="caption">{description}</Typography>
      </>
    }
  />
);

const ExportData = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const [format, setFormat] = useState(ExportActionsFormatting.CSV);

  const [isFormatExported, setIsFormatExported] = useState({
    [ExportActionsFormatting.CSV]: false,
    [ExportActionsFormatting.JSON]: false,
  });

  const { mutate: exportActions } = mutations.useExportActions();
  const { itemId } = useParams();

  const icons = {
    [ExportActionsFormatting.CSV]: <Grid3X3 size={16} />,
    [ExportActionsFormatting.JSON]: <Braces size={16} />,
  };
  const onClick = () => {
    if (itemId) {
      exportActions({ itemId, format });
      setIsFormatExported({ ...isFormatExported, [format]: true });
    }
  };

  const formats = Object.values(ExportActionsFormatting).slice().reverse();

  return (
    <>
      <FormControl sx={{ display: 'block' }}>
        <Typography variant="h6">{t(ANALYTICS.SELECT_FORMAT_TITLE)}</Typography>
        <Typography variant="body1">
          {t(ANALYTICS.SELECT_FORMAT_DIALOG_DESCRIPTION)}
        </Typography>
        <RadioGroup
          name="export-format"
          value={format}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFormat(
              (event.target as HTMLInputElement)
                .value as ExportActionsFormatting,
            );
          }}
        >
          {formats.map((ele) => (
            <SelectFormatRadio
              key={ele}
              icon={icons[ele]}
              title={ele}
              description={t(`${ele.toLocaleUpperCase()}_DESCRIPTION`)}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button
        onClick={onClick}
        variant="contained"
        disabled={isFormatExported[format]}
        id={EXPORT_ACTIONS_BUTTON_ID}
        sx={{ marginTop: 1 }}
      >
        {isFormatExported[format]
          ? t(ANALYTICS.EXPORTING_DONE, { format: format.toUpperCase() })
          : t(ANALYTICS.START_EXPORTING, { format: format.toUpperCase() })}
      </Button>
    </>
  );
};

export default ExportData;
