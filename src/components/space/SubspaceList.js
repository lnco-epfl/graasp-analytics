import React, { useContext, useState /* useEffect */ } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import { SpaceDataContext } from '../../contexts/SpaceDataProvider';

const useStyles = makeStyles((theme) => ({
  gridText: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    marginLeft: theme.spacing(1),
    maxHeight: 20,
    maxWidth: 300,
    minWidth: 120,
  },
}));

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

function SubspaceList() {
  const { spaceImmediateChildren } = useContext(SpaceDataContext);
  const classes = useStyles();

  const [selectedSubspaces, setSelectedSubspaces] = useState([]);

  // const mapSpaceNameToSpaceId = (spaceName, spacesArray) => {
  //   return spacesArray.find((space) => space.name === spaceName).id;
  // };

  const handleChange = (event) => {
    setSelectedSubspaces(event.target.value);
  };

  // if (!isLoading && spaceSubspaces.length === 0) {
  //   return (
  //     <Typography variant="subtitle1">
  //       This space has no additional sub-spaces.
  //     </Typography>
  //   );
  // }

  return (
    <Grid container>
      <Grid item className={classes.gridText}>
        <Typography variant="subtitle1">
          Show data for the following sub-spaces:
        </Typography>
      </Grid>
      <Grid item>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={selectedSubspaces}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => selected.join(', ')}
            // MenuProps={MenuProps}
          >
            {spaceImmediateChildren
              .sort((spaceOne, spaceTwo) => spaceOne.name > spaceTwo.name)
              .map((space) => (
                <MenuItem key={space.id} value={space.name}>
                  <Checkbox
                    checked={selectedSubspaces.indexOf(space.name) > -1}
                  />
                  <Typography variant="subtitle2">{space.name}</Typography>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default SubspaceList;
