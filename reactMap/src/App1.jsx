// import { FullscreenControl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useRef } from 'react';
// import RoutePlanning from "./RoutePlanning";
// import Modal from "./Modal";
import Map, { Marker, GeolocateControl, Source, Layer, NavigationControl, FullscreenControl } from 'react-map-gl';


const App = () => {
  const [viewport, setViewport] = useState({
    width: '1200',
    height: '800',
    latitude:  -73,
    longitude: 42,    
    zoom:10
  });
  // const[marker, setMarker] = useState([]);
  // const [userLocation, setUserLocation] = useState([]);
  const [startingPoint, setStartingPoint] = useState([]);
  const [endingPoint, setEndingPoint] = useState([]);
  const [coords, setCoords] = useState([]);
  const GeolocateControlRef = useRef();

 

  // const routePlanning = () => {
      // const [startingPoint, setStartingPoint] = useState('');
      // const [endingPoint, setEndingPoint] = useState('');

      // const handleInputChange = (event) => {
      //   const { name, value } = event.target;
      //   if (name === 'startingPoint') {
      //     setStartingPoint(value);
      //   } else if (name === 'endingPoint') {
      //     setEndingPoint(value);
      //   }
      // };

      // const submitRoute = () =>{
      //   handleInputChange()
      // }
    



  // // this function will listen to the event of the double click function using event listener
  // function handleClick(e){
  //   // const[longitude, latitude] = e.lngLat;
  //   const[longitude, latitude] = e.lngLat;
  //   setMarkers(marker => [...marker, {
  //     lat: latitude,
  //     long: longitude,
  //   }]);
  //   // console.log(longitude, latitude);
  //   console.log(e);
  // }

  
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       const{latitude, longitude} = position.coords;
  //       setViewport((prevViewport) => ({
  //         ...prevViewport,
  //         latitude,
  //         longitude
  //       }));
  //       // setUserLocation({latitude, longitude})  
  //     }
  //   )
  // },[] )

    
  // useEffect(()=>{
  //   getRoute()
  //   GeolocateControl.current?.trigger()
  // }, [endingPoint, startingPoint, GeolocateControlRef])


  // const getRoute = async () => {
  //   const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${startingPoint[0]},${startingPoint[1]};${endingPoint[0]},${endingPoint[1]}?steps=false&geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`);
  //   const data = await response.json();
  //   const coords = data.routes[0].geometry.coordinates
  //   console.log(coords)
  //   // console.log(data)
  //   setCoords(coords)
  // }

  useEffect(() => {
    if (startingPoint.length > 0 && endingPoint.length > 0) {
      getRoute();
      GeolocateControlRef.current?.trigger();
    }
  }, [endingPoint, startingPoint, GeolocateControlRef]);
  

  const getLocationCoordinates = async (location) => {
    const encodedLocation = encodeURIComponent(location);
    const url = `https://api.mapbox.com/geocoding/v5/${import.meta.env.VITE_MAPBOX_API_KEY}/${encodedLocation}.json`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.features.length === 0) {
      return null; // Handle location not found
    }

    const coordinates = data.features[0].geometry.coordinates;
    return { longitude: coordinates[0], latitude: coordinates[1] };

  };

  const UserInput = () => {
    const [startingPoint, setStartingPoint] = useState('');
    const [endingPoint, setEndingPoint] = useState('');
    const [startingCoordinates, setStartingCoordinates] = useState(null);
    const [endingCoordinates, setEndingCoordinates] = useState(null);
    const [error, setError] = useState(null);
  
    const handleStartingPointChange = (event) => {
      setStartingPoint(event.target.value);
      setStartingCoordinates(null); // Reset starting coordinates on input change
    };

    const handleEndingPointChange = (event) => {
      setEndingPoint(event.target.value);
      setEndingCoordinates(null); // Reset ending coordinates on input change
    };

    const handleSubmit = async () => {
      setError(null); // Clear previous errors
  
      try {
        if (!startingPoint) throw new Error('Please enter a starting point.');
        setStartingCoordinates(await getLocationCoordinates(startingPoint));
  
        if (!endingPoint) throw new Error('Please enter an ending point.');
        setEndingCoordinates(await getLocationCoordinates(endingPoint));
  
        // Once both coordinates are fetched, proceed with route planning or other actions
        console.log('Starting coordinates:', startingCoordinates);
        console.log('Ending coordinates:', endingCoordinates);
      } catch (error) {
        setError(error.message);
      }
    };
  }



  const getRoute = async () => {
    if (startingPoint.length > 0 && endingPoint.length > 0) {
      const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${startingPoint[0]},${startingPoint[1]};${endingPoint[0]},${endingPoint[1]}?steps=false&geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`);
      const data = await response.json();
      const coords = data.routes[0].geometry.coordinates;
      setCoords(coords);
    }
  };

  // this specifies the properties of a route, having a line from the starting point to the destination  
        const geojson = {
          "type":"FeatureCollection",
          "features":[{
              "type":"Feature",
              "geometry":{
                  "type":"LineString",
                  "coordinates":[...coords]
              }
          }]
        }

//   const startPoint = {
//     "type":"FeatureCollection",
//     "features":[{
//         "type":"feature",
//         "geometry":{
//             "type":"point",
//             "coordinates":startingPoint
//         }
//     }]
// }

      const endPoint = {
          "type":"FeatureCollection",
          "features":[{
              "type":"Feature",
              "geometry":{
                  "type":"Point",
                  "coordinates":[...endingPoint]
              }
          }]
        }

      const lineStyle = {
        id: 'roadLayer',
        type: 'line',
        layout: {
            "line-join":"round",
            "line-cap":"round"
        },
        paint:{
            "line-color":"blue",
            "line-width":4,
            "line-opacity":0.75
        }
      };

    const layerEndpointStyle = {
      id: 'end',
      type: 'circle',
      source: {
          type: 'geojson',
          data: endingPoint
      },
      paint: {
          'circle-radius': 10,
          'circle-color': '#f30'
      }
    };
  


  // return (
  //   <div style={{ width: "100vw" , height: "100vh"}}>
  //     <Map
  //       mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
  //       initialViewState={{ 
  //               latitude: viewport.latitude, 
  //               longitude: viewport.longitude, 
  //               zoom: viewport.zoom 
  //         }}
  //       style={{ 
  //             width: viewport.width, 
  //             height: viewport.height}}
  //       mapStyle='mapbox://styles/edsonaero/clt4ou1kg000301qwbn968vq8'
  //       onViewportChange={(viewport) => setViewport(viewport)}
  //       onDblClick={handleClick}
  //       >
  //       {markers.map((marker, index) => (
  //               <Marker
  //                   key={index}
  //                   latitude={marker.lat}
  //                   longitude={marker.long}
  //                   offsetLeft={-3.5 * viewport.zoom}
  //                   offsetTop={-7 * viewport.zoom}
  //               >
  //               <div>📍</div>
  //               </Marker>
  //         ))}
  //       </Map>
  //   </div>
  // );

  // const handleClick = (e) => {
  //   const newEndPoint = e.lngLat
  //   const endPoint = Object.keys(newEndPoint).map((item ) => newEndPoint[item])
  //   // console.log(endPoint)
  //   setEndingPoint(endPoint)
  // }

  

  return(
    <div>

    
    <div>
      <Map
          // {...viewport}
          // onClick={handleClick}
          onClick={handleSubmit}
          onMove={evt => setViewport(evt.viewport)}
          mapboxAccessToken = {import.meta.env.VITE_MAPBOX_API_KEY}
          mapStyle="mapbox://styles/edsonaero/clt4ou1kg000301qwbn968vq8"
          onViewportChange={(viewport) => setViewport(viewport)}
          // initialViewPort={{
          //   latitude: viewport.latitude,
          //   longitude: viewport.longitude,
          //   zoom: 15
          // }}
          style={{
            width: 1200,
            height: 650
          }}         
          >
            {/* {userLocation && (
              <Marker
                  latitude={userLocation.latitude}
                  longitude={userLocation.longitude}
                  offsetLeft={-20}
                  offsetTop={-10}
                  >
                    <div>📍</div>
              </Marker>
            )} */}

          {/* <Source id="routeSource" type="geojson" data={geojson}>
            <Layer{...lineStyle}/>
          </Source>

          <Source id="endSource" type="geojson" data={endPoint}>
            <Layer{...layerEndpointStyle}/>
          </Source> */}

          <Source id="routeSource" type="geojson" data={geojson}>
            {startingPoint.length > 0 && endingPoint.length > 0 && <Layer {...lineStyle} />}
          </Source>

          <Source id="endSource" type="geojson" data={endPoint}>
            {endingPoint.length > 0 && <Layer {...layerEndpointStyle} />}
          </Source>

          <GeolocateControl 
                showAccuracyCircle={false} 
                onGeolocate={ 
                          (e) => setStartingPoint(
                            [e.coords.longitude, e.coords.latitude])} 
                ref={GeolocateControlRef}
          />
          <NavigationControl/>
          <FullscreenControl/>
          {/* <Marker longitude={startingPoint[0]} latitude={startingPoint[1]}/> */}

          {startingPoint.latitude && startingPoint.longitude && (
            <Marker
              latitude={startingPoint.latitude}
              longitude={startingPoint.longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div>📍</div>
            </Marker>
          )}
      </Map>    
    </div>
      <div>
        <label htmlFor="startingPoint">Starting Point:</label>
        <input
          type="text"
          name="startingPoint"
          value={startingPoint}
          onChange={setStartingPoint}
        />
        <br />
        <label htmlFor="endingPoint">Ending Point:</label>
        <input
          type="text"
          name="endingPoint"
          value={endingPoint}
          onChange={setEndingPoint}
        />
        <br />
        {/* Button or additional functionality to use the entered points */}
        <button onClick={() => { /* Implement logic to utilize starting and ending point data */ }}>
          Plan Route
        </button>
      </div>
  </div>
  );
}


export default App;



















// navigator.geolocation.getCurrentPosition( function(position) {console.log("Latitude: " + position.coords.latitude); console.log("Longitude: " + position.coords.longitude);
//   },
//   function(error) {
//     // Handle error here
//     console.error("Error getting user's location:", error);
//   }
// );

// navigator.geolocation.getCurrentPosition( (position) => {console.log("Latitude: " + position.coords.latitude); console.log("Longitude:" + position.coords.longitude);});

