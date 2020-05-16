import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  MAX_CLUSTER_ZOOM,
  CLUSTER_RADIUS,
} from '../../config/constants';
import spaceData from '../../data/sample.json';

const useStyles = makeStyles(() => ({
  clusterMarker: {
    color: '#fff',
    background: '#5050d2',
    borderRadius: '50%',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typography: {
    textAlign: 'center',
  },
  mapContainer: {
    width: '90%',
    height: '80%',
    marginTop: 30,
  },
}));

const Marker = ({ children }) => children;

function ActionsMap() {
  const classes = useStyles();
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(5);

  const points = spaceData.map((action) => ({
    type: 'Feature',
    properties: { cluster: false, actionId: action._id },
    geometry: {
      type: 'Point',
      coordinates: [action.geolocation.ll[1], action.geolocation.ll[0]],
    },
  }));

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: CLUSTER_RADIUS, maxZoom: MAX_CLUSTER_ZOOM },
  });

  const calculateClusterRadius = (
    clusterCount,
    totalCount,
    baseRadius,
    scalar,
  ) => {
    return baseRadius + (clusterCount / totalCount) * scalar;
  };

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        Actions by location
      </Typography>
      <Container className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={{ lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE }}
          defaultZoom={5}
          distanceToMouse={() => {}}
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
            const {
              cluster: isCluster,
              point_count: pointCount,
            } = cluster.properties;
            if (isCluster) {
              return (
                <Marker key={cluster.id} lat={latitude} lng={longitude}>
                  <div
                    className={classes.clusterMarker}
                    style={{
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
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }
            return null;
          })}
        </GoogleMapReact>
      </Container>
    </>
  );
}

export default ActionsMap;
