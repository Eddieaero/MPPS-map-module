import "mapbox-gl/dist/mapbox-gl.css";
import {useState, useEffect } from "react";
// import {useRef } from "react";
// import checkpoints from "./checkpoint.json";
// import Checkpoints from "Checkpoints.jsx";
// import { Route } from "express";
// import Map from "react-map-gl";
// import RoutePlanning from "RoutePlanning.jsx";




import React from "react";
import {  useRef } from "react";
import Map, { Source, Layer, NavigationControl, FullscreenControl } from "react-map-gl";











const App = () => {
    const [startingPoint, setStartingPoint] = useState([]);
    const [endingPoint, setEndingPoint] = useState([]);
    // const [coords, setCoords] = useState([]);
   
    // const handlePlanRoute = async () => {
    //   // Call the prop function (planRoute)
    //   await props.planRoute();
    //   // Perform any additional actions after route planning is complete
    // };

    const [viewport, setViewport] = useState({
      width: '1200',
      height: '800',
    //   latitude:  -73,
    //   longitude: 42,
      center:[ -6.7929, 39.2854],   
      zoom:10
    });

    // const GeolocateControlRef = useRef();
    //   const handleSubmit = () =>{
    //     planRoute();
    //   }











    // const RoutePlanning = ( startingPoint, endingPoint, setStartingPoint, setEndingPoint, planRoute ) => { 
      // const [startingPoint, setStartingPoint] = useState([]);
      // const [endingPoint, setEndingPoint] = useState([]);
      const [coords, setCoords] = useState([]);
  
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



        

      const getRoute = async () => {
        if (startingPoint.length > 0 && endingPoint.length > 0) {
          const response = await fetch (`https://api.mapbox.com/directions/v5/mapbox/driving/${startingPoint[0]},${startingPoint[1]};${endingPoint[0]},${endingPoint[1]}?steps=false&geometries=geojson&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`);
          const data = await response.json();
          const coords = data.routes[0].geometry.coordinates;
          console.log(coords)
          setCoords(coords);
        }
      };

      useEffect(() =>{
        if (startingPoint && endingPoint) {
            getRoute();
          }
        }, [startingPoint, endingPoint]
      );




      

      const getLocationCoordinates = async (location1, location2) => {
        const encodedLocation1 = encodeURIComponent(location1);
        console.log(encodedLocation1);
        const encodedLocation2 = encodeURIComponent(location2);
        console.log(encodedLocation2);
      
        const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation1}.json?/country=tz&proximity=ip&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`;
        const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedLocation2}.json?/country=tz&proximity=ip&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`;
      
        const response1 = await fetch(url1);
        console.log(response1)
        const data1 = await response1.json();
      
        const response2 = await fetch(url2);
        console.log(response2)
        const data2 = await response2.json();
      
        if (data1.features.length === 0 || data2.features.length === 0) {
          return null; // Handle location not found
        }
      
        const coordinates1 = data1.features[0].geometry.coordinates;
        console.log(coordinates1)
        setStartingPoint(coordinates1);
        const coordinates2 = data2.features[0].geometry.coordinates;
        console.log(coordinates2)
        setEndingPoint(coordinates2);

        // getRoute();
        // console.log(checkpoints)
      
        return [
          { longitude: coordinates1[0], latitude: coordinates1[1] },
          { longitude: coordinates2[0], latitude: coordinates2[1] },
        ];
      };



      

      const planRoute = async () => {
        const coordinates = await getLocationCoordinates(startingPoint, endingPoint);
        
        if (coordinates === null) {
          console.error('One or both locations not found');
          return;
        }
        // Use the coordinates here...
        console.log(coordinates);
        
      };
























































      return (
        <div>
            <Map 
                // {...viewport}
                // onClick={planRoute}
                onMove={evt => setViewport(evt.viewport)}
                mapboxAccessToken = {import.meta.env.VITE_MAPBOX_API_KEY}
                mapStyle="mapbox://styles/edsonaero/clt4ou1kg000301qwbn968vq8"
                onViewportChange={(viewport) => setViewport(viewport)}
                style={{
                    width: 1200,
                    height: 650
                  }}  
             >





                <Source id="routeSource" type="geojson" data={geojson}>
                    {startingPoint.length > 0 && endingPoint.length > 0 && <Layer {...lineStyle} />}
                </Source>

                <Source id="endSource" type="geojson" data={endPoint}>
                    {endingPoint.length > 0 && <Layer {...layerEndpointStyle} />}
                </Source>

                <NavigationControl/>
                <FullscreenControl/>






















                {/* <RoutePlanning
                    startingPoint={startingPoint}
                    endingPoint={endingPoint}
                    setStartingPoint={setStartingPoint}
                    setEndingPoint={setEndingPoint}
                    planRoute={planRoute}
                /> */}
                {/* <Checkpoints/> */}
            </Map>
            <div>
                <label htmlFor="startingPoint">Starting Point:</label>
                <input
                type="text"
                name="startingPoint"
                value={startingPoint}
                onChange={(e) => setStartingPoint(e.target.value)}
                />
                <br />
                <label htmlFor="endingPoint">Ending Point:</label>
                <input
                type="text"
                name="endingPoint"
                value={endingPoint}
                onChange={(e) => setEndingPoint(e.target.value)}
                />
                <br />
                <button onClick={planRoute}>
                Plan Route
                </button>
            </div>
        </div>
            
      );

      



}

export default App