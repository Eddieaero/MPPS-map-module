// import React, { useState, useEffect } from 'react';
// import ReactMapGL, { Marker, NavigationControl, FlyToInterpolator } from 'react-map-gl';
// import MapboxDirections from '@mapbox/directions';
// import Directions from './Directions'; // Import Directions component
// import Route from './Route'; // Import Route component
// import Checkpoints from './Checkpoints'; // Import Checkpoints component

// const Map = () => {
//   const [viewport, setViewport] = useState({
//     width: '100vw',
//     height: '100vh',
//     latitude: 37.7749,
//     longitude: -122.4194,
//     zoom: 10,
//   });
//   const [directions, setDirections] = useState(null);
//   const [route, setRoute] = useState(null);

//   const startingPoint = { lat: 37.7833, lng: -122.4166 }; // San Francisco
//   const destination = { lat: 34.0522, lng: -118.2437 }; // Los Angeles
//   const checkpoints = [
//     { lat: 37.3686, lng: -121.9780 }, // San Jose
//     { lat: 35.5686, lng: -120.6675 }, // Bakersfield
//   ];

//   useEffect(() => {
//     // Create dummy route data for testing
//     const dummyRoute = {
//       geometry: {
//         coordinates: [
//           [startingPoint.lng, startingPoint.lat],
//           [destination.lng, destination.lat],
//         ],
//       },
//     };
//     setRoute(dummyRoute);
//     setDirections(new MapboxDirections({
//       container: 'directions-container',
//       accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN, // Replace with your access token
//       routes: [dummyRoute],
//     }));
//   }, []);

//   const handleViewportChange = (newViewport) => {
//     setViewport(newViewport);
//   };

//   const flyToDestination = (options) => {
//     setViewport(options);
//   };

//   return (
//     <div>
//       <ReactMapGL
//         {...viewport}
//         mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
//         onViewportChange={handleViewportChange}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         {startingPoint && <Marker latitude={startingPoint.lat} longitude={startingPoint.lng} color="blue" />}
//         {destination && <Marker latitude={destination.lat} longitude={destination.lng} color="red" />}
//         {route && <Route coordinates={route.geometry.coordinates} />}
//         {checkpoints && <Checkpoints checkpoints={checkpoints} />}
//         <NavigationControl position="top-left" />
//         {directions && (
//           <div id="directions-container" style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
//             <Directions directions={directions} onFlyTo={flyToDestination} />
//           </div>
//         )}
//       </ReactMapGL>
//     </div>
//   );
// };

// export default Map;
