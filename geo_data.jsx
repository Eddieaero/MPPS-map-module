import { type } from "express/lib/response"

// 1.geojson
const geojson = {
    "type":"FeatureCollection",
    "features":[{
        "type":"feature",
        "geometry":{
            "type":"lineString",
            "coordinates":[
                ...coords
            ]
        }
    }]
}

// 2. start and endpoint
const startPoint = {
    "type":"FeatureCollection",
    "features":[{
        "type":"feature",
        "geometry":{
            "type":"point",
            "coordinates":[startingPoint]
        }
    }]
}

// 3.endpoint
const endPoint = {
    "type":"FeatureCollection",
    "features":[{
        "type":"feature",
        "geometry":{
            "type":"point",
            "coordinates":[endingPoint]
        }
    }]
}

// 4.Route styles
const lineStyle = {
    id: 'roadLayer',
    type: 'line',
    layout: {
        "line-join":"round",
        "line-cap":round
    },
    paint:{
        "line-color":"blue",
        "line-width":4,
        "line-opacity":0.75
    }
};

// 5.layerEndpoint  

const layerEndpoint = {
    id: 'end',
    type: 'circle',
    source: {
        type: 'geojson',
        data: endpoint
    },
    paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
    }
}

// 6checkpoints
const geoJson = {
    "type": "FeatureCollection",
    "features": data.checkpoints.map(checkpoint => ({
      "type": "Feature",
      "properties": {
        "name": checkpoint.name,
        "code": checkpoint.code
      },
      "geometry": {
        "type": "Point",
        "coordinates": [checkpoint.coordinates.longitude, checkpoint.coordinates.latitude]
      }
    }))
  };
