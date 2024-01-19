import { Context } from '@graasp/sdk';

import {
  GRAASP_BUILDER_HOST,
  GRAASP_LIBRARY_HOST,
  GRAASP_PLAYER_HOST,
} from './env';

// Default latitude and longitude for centering map. Zurich coordinates used below.
export const DEFAULT_LATITUDE = 47.3769;
export const DEFAULT_LONGITUDE = 8.5417;

// Default Zoom for map
export const DEFAULT_ZOOM = 3;
export const ACTIONS_BY_USER_MAX_DISPLAYED_USERS = 10;

// If user zooms in beyond MAX_CLUSTER_ZOOM, map no longer displays data points.
// Maximum possible value is 16 (zoomed all the way in). See npm supercluster docs for further info.
export const MAX_CLUSTER_ZOOM = 10;

// Size (in pixels) of cluster zones used by supercluster.
// The higher CLUSTER_RADIUS, the more map area absorbed into a single cluster.
export const CLUSTER_RADIUS = 75;

// Key code for the Enter/Return key (Used in a placeholder keyboard event listener in ActionsMap)
export const ENTER_KEY = 'Enter';

// Height of container in ActionsByDayChart
export const CONTAINER_HEIGHT = 450;

// Milliseconds after which additional text appears under loading spinner
export const LOADER_TEXT_DELAY = 5000;

// Used in api.js and then the ActionsByVerb piechart
// for visual purposes, all verbs with < 3 percent of total actions are consolidated into an entry 'other'
export const MIN_PERCENTAGE_TO_SHOW_VERB = 3;

// 'other' verb used in api.js
export const OTHER_VERB = 'Other';

export const MEMBER_AVATAR_MAX_DIMENSIONS = 40;
// colors used to fill the segments of the ActionsByVerb piechart
export const COLORS = [
  '#3066BE',
  '#96CCE6',
  '#20A39E',
  '#61D095',
  '#FFBA49',
  '#EF5B5B',
  '#FFA8A8',
  '#A4036F',
  '#B54A3F',
  '#FFFFAF',
];

export const AVERAGE_COLOR = '#F99417';
export const GENERAL_COLOR = '#8884d8';

// strings used in components/custom/CustomTooltip to generate added tooltip text in ActionsByTimeOfDay
export const LATE_NIGHT = 'Late night';
export const EARLY_MORNING = 'Early morning';
export const MORNING = 'Morning';
export const AFTERNOON = 'Afternoon';
export const EVENING = 'Evening';
export const NIGHT = 'Night';

// constants for most viewed items chart
export const TOP_NUMBER_OF_ITEMS_TO_DISPLAY = 10;

export const DEFAULT_REQUEST_SAMPLE_SIZE = 5000;

export const HOST_MAP = {
  [Context.Builder]: GRAASP_BUILDER_HOST,
  [Context.Player]: GRAASP_PLAYER_HOST,
  [Context.Library]: GRAASP_LIBRARY_HOST,
  [Context.Analytics]: '/',
};

export const ITEM_NAME_MAX_LENGTH = 15;

export const NAVIGATOR_BACKGROUND_COLOR = '#f6f6f6';
