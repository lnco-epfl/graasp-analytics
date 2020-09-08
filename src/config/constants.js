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

// Height of container in ActionsChart
export const CONTAINER_HEIGHT = 450;

// Milliseconds after which additional text appears under loading spinner
export const LOADER_TEXT_DELAY = 5000;
