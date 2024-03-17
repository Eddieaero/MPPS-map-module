// import { useState } from 'react';
// import { Modal, Button } from 'react-modal';

// const InputModal = ({ isOpen, onClose, onConfirm }) => {
//   const [startingPoint, setStartingPoint] = useState('');
//   const [endingPoint, setEndingPoint] = useState('');

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     if (name === 'startingPoint') {
//       setStartingPoint(value);
//     } else if (name === 'endingPoint') {
//       setEndingPoint(value);
//     }
//   };

//   const handleConfirm = () => {
//     onConfirm({ startingPoint, endingPoint });
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       style={{
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         },
//         content: {
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '300px',
//           padding: '20px',
//           border: '1px solid #ccc',
//           borderRadius: '5px',
//         },
//       }}
//     >
//       <h2>Enter Route Points</h2>
//       <label htmlFor="startingPoint">Starting Point:</label>
//       <input
//         type="text"
//         name="startingPoint"
//         value={startingPoint}
//         onChange={handleInputChange}
//       />
//       <br />
//       <label htmlFor="endingPoint">Ending Point:</label>
//       <input
//         type="text"
//         name="endingPoint"
//         value={endingPoint}
//         onChange={handleInputChange}
//       />
//       <br />
//       <Button onClick={handleConfirm}>Confirm</Button>
//     </Modal>
//   );
// };

// export default InputModal;
