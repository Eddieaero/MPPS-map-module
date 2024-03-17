// import react from 'react';
// import { useState } from "react";
// import { Marker, Popup} from "react-map-gl";
// import checkpoints from "./checkpoint.json";


// const [selectedCheckpoint, setSelectedCheckpoint] = useState();

// const Checkpoints = () => {


//     {checkpoints.locations.map((checkpoint) => (
//         <Marker
//             name={checkpoint.name}
//             key={checkpoint.code}
//             longitude={checkpoint.coordinates.longitude}
//             latitude={checkpoint.coordinates.latitude}
//             code= {checkpoint.code}
//         >
//             <button
//             className="marker-btn"
//             onClick={(e) => {
//                 e.preventDefault();
//                 setSelectedCheckpoint(checkpoint);
//             }}
//             >
//                <div>📍</div>
//             </button>
//         </Marker>
//         ))}

//         {selectedCheckpoint ? (
//             <Popup
//                 latitude={selectedCheckpoint.coordinates.latitude}
//                 longitude={selectedCheckpoint.coordinates.longitude}
//                 onClose={() => {
//                 setSelectedCheckpoint(null);
//                 }}
//             >
//                 <div>
//                   <h2>{selectedCheckpoint.name}</h2>
//                   <p>{selectedCheckpoint.code}</p>
//                 </div>
//             </Popup>
//             ) : null}


// }

// export default Checkpoints;