// Default latitude and longitude for centering map. Zurich coordinates used below.
export const DEFAULT_LATITUDE = 47.3769;
export const DEFAULT_LONGITUDE = 8.5417;

// Default Zoom for map
export const DEFAULT_ZOOM = 3;

// If user zooms in beyond MAX_CLUSTER_ZOOM, map no longer displays data points.
// Maximum possible value is 16 (zoomed all the way in). See npm supercluster docs for further info.
export const MAX_CLUSTER_ZOOM = 10;

// Size (in pixels) of cluster zones used by supercluster.
// The higher CLUSTER_RADIUS, the more map area absorbed into a single cluster.
export const CLUSTER_RADIUS = 75;

// Key code for the Enter/Return key (Used in a placeholder keyboard event listener in ActionsMap)
export const ENTER_KEY_CODE = 13;

// Height of container in ActionsByDayChart
export const CONTAINER_HEIGHT = 450;

// Milliseconds after which additional text appears under loading spinner
export const LOADER_TEXT_DELAY = 5000;

// Used in api.js, to filter out the auto-generated 'user' with name 'Learning Analytics'
export const LEARNING_ANALYTICS_USER_ID = '5405e202da3a95cf9050e8f9';

// Used in api.js and then the ActionsByVerb piechart
// for visual purposes, all verbs with < 3 percent of total actions are consolidated into an entry 'other'
export const MIN_PERCENTAGE_TO_SHOW_VERB = 3;

// 'other' verb used in api.js
export const OTHER_VERB = 'Other';

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

// strings used in components/custom/CustomTooltip to generate added tooltip text in ActionsByTimeOfDay
export const LATE_NIGHT = 'Late night';
export const EARLY_MORNING = 'Early morning';
export const MORNING = 'Morning';
export const AFTERNOON = 'Afternoon';
export const EVENING = 'Evening';
export const NIGHT = 'Night';

// constants for most viewed items chart
export const ACCESSED_STRING = 'accessed';
export const TOP_NUMBER_OF_ITEMS_TO_DISPLAY = 10;

export const DEFAULT_REQUEST_SAMPLE_SIZE = 5000;

export const Context = {
  BUILDER: 'builder',
  PLAYER: 'player',
  EXPLORER: 'explorer',
  ANALYZER: 'analyzer',
};
