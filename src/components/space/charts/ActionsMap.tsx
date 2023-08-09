import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/material/styles';

import {
  CLUSTER_RADIUS,
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ZOOM,
  ENTER_KEY,
  MAX_CLUSTER_ZOOM,
  REACT_APP_GOOGLE_KEY,
} from '../../../config/constants';
import {
  filterActionsByUsers,
  mapActionsToGeoJsonFeatureObjects,
} from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';

const Marker = ({ children }: { children: JSX.Element }) => children;

const ActionsMap = (): JSX.Element | null => {
  const theme = useTheme();
  const { t } = useTranslation();
  const mapRef = useRef<any>();
  const [bounds, setBounds] = useState<number[]>();
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const { actions, selectedUsers } = useContext(DataContext);

  if (!REACT_APP_GOOGLE_KEY) {
    return null;
  }

  // actionsToChart is the array converted to GeoJSON Feature objects below
  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.size === 0), show all actions
  // if all users are selected (i.e. selectedUsers.size === allMembers.size), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  let actionsToChart;
  if (!selectedUsers) {
    actionsToChart = actions;
  } else {
    actionsToChart = filterActionsByUsers(actions, selectedUsers);
  }

  // GeoJSON Feature objects
  const points = mapActionsToGeoJsonFeatureObjects(
    actionsToChart.toJS() as any,
  );

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: CLUSTER_RADIUS, maxZoom: MAX_CLUSTER_ZOOM },
  });

  const calculateClusterRadius = (
    clusterCount: number,
    totalCount: number,
    baseRadius: number,
    scalar: number,
  ) => baseRadius + (clusterCount / totalCount) * scalar;

  const handleClusterZoom = (longitude: number, latitude: number) => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.setZoom(mapRef.current.zoom + 1);
    mapRef.current.panTo({ lng: longitude, lat: latitude });
  };

  return (
    <>
      <ChartTitle title={t('Actions by Location')} />
      <ChartContainer>
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_GOOGLE_KEY }}
          defaultCenter={{ lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE }}
          defaultZoom={DEFAULT_ZOOM}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={(map) => {
            setZoom(map.zoom);
            setBounds([
              map.bounds.nw.lng,
              map.bounds.se.lat,
              map.bounds.se.lng,
              map.bounds.nw.lat,
            ]);
          }}
        >
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;
            if (isCluster) {
              return (
                <Marker key={cluster.id}>
                  <div
                    style={{
                      color: '#fff',
                      background: theme.palette.primary.main,
                      borderRadius: '50%',
                      padding: 10,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      width: `${calculateClusterRadius(
                        pointCount,
                        points.length,
                        10,
                        20,
                      )}px`,
                      height: `${calculateClusterRadius(
                        pointCount,
                        points.length,
                        10,
                        20,
                      )}px`,
                    }}
                    onClick={() => handleClusterZoom(longitude, latitude)}
                    onKeyDown={(event) => {
                      if (event.key === ENTER_KEY) {
                        handleClusterZoom(longitude, latitude);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }
            return null;
          })}
        </GoogleMapReact>
      </ChartContainer>
    </>
  );
};

export default ActionsMap;
