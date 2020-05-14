import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
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
    options: { radius: 75, maxZoom: 10 },
  });

  return (
    <Container style={{ width: '100%', height: '100%' }}>
      <Typography variant="h6" style={{ textAlign: 'center' }}>
        Actions by location
      </Typography>
      <Container style={{ width: '90%', height: '80%', marginTop: 30 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
          defaultCenter={{ lat: 47.1269, lng: 6.9283 }}
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
                      width: `${10 + (pointCount / points.length) * 20}px`,
                      height: `${10 + (pointCount / points.length) * 20}px`,
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
    </Container>
  );
}

export default ActionsMap;
