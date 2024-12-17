// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // const Logout = ({ setToken }) => {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     setToken(null); // Clears the token
// //     toast.success('Logged out successfully!', {
// //       position: 'top-center',
// //       autoClose: 3000,
// //       hideProgressBar: true,
// //     });
// //     navigate('/'); // Redirect to home
// //   };

// //   return (
// //     <button className="logout-button" onClick={handleLogout}>
// //       Logout
// //     </button>
// //   );
// // };

// // export default Logout;


// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleLogout = async () => {
//       try {
//         // Fetch token from local storage
//         const token = localStorage.getItem('authToken');

//         if (!token) {
//           toast.error('No active session found');
//           navigate('/login');
//           return;
//         }

//         // Call backend to handle logout (if applicable)
//         await axios.post('http://localhost:5000/api/users/logout', null, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Remove token from local storage
//         localStorage.removeItem('authToken');

//         toast.success('Logged out successfully');
//         navigate('/login');
//       } catch (error) {
//         console.error('Logout failed:', error);
//         toast.error('Error during logout');
//       }
//     };

//     handleLogout();
//   }, [navigate]);

//   return (
//     <div>
//       <h1>Logging Out...</h1>
//     </div>
//   );
// };

// export default Logout;
