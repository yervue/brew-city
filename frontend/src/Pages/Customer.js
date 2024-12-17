// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../components/css/customer.css';

// const Customer = () => {
//   const [customers, setCustomers] = useState([]);
//   const [customer, setCustomer] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [editId, setEditId] = useState(null);

//   // Fetch customers on component mount
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/customers')
//       .then((response) => setCustomers(response.data))
//       .catch((error) => console.error('Error fetching customers!', error));
//   }, []);

//   // Open modal for editing customer
//   const handleEdit = (customer) => {
//     setShowModal(true);
//     setCustomer(customer);
//     setEditId(customer._id);
//   };

//   // Close modal
//   const closeModal = () => {
//     setShowModal(false);
//     setCustomer({ name: '', email: '', phone: '', address: '' });
//     setEditId(null);
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save edited customer
//   const handleSave = () => {
//     axios
//       .put(`http://localhost:5000/api/customers/${editId}`, customer)
//       .then((response) => {
//         setCustomers((prev) =>
//           prev.map((c) => (c._id === editId ? response.data : c))
//         );
//         closeModal();
//       })
//       .catch((error) => console.error('Error updating customer!', error));
//   };

//   // Delete a customer
//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5000/api/customers/${id}`)
//       .then(() => {
//         setCustomers((prev) => prev.filter((c) => c._id !== id));
//       })
//       .catch((error) => console.error('Error deleting customer!', error));
//   };

//   return (
//     <div>
//       <h1>Customer Management</h1>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((c) => (
//             <tr key={c._id}>
//               <td>{c.name}</td>
//               <td>{c.email}</td>
//               <td>{c.phone}</td>
//               <td>{c.address}</td>
//               <td>
//                 <button onClick={() => handleEdit(c)}>Edit</button>
//                 <button onClick={() => handleDelete(c._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h2>Edit Customer</h2>
//             <form>
//               <div>
//                 <label style={{color:"gray"}}>Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={customer.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label style={{color:"gray"}}>Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={customer.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label style={{color:"gray"}}>Phone:</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={customer.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label style={{color:"gray"}}>Address:</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={customer.address}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </form>
//             <div className="modal-buttons">
//               <button onClick={handleSave}>Update</button>
//               <button onClick={closeModal}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/customer.css'; // Custom CSS file
import Navbar from '../components/Navbar';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers');
      setCustomers(response.data);
    } catch (error) {
      toast.error('Error fetching customers!');
    }
  };

  const handleEdit = (customer) => {
    setShowModal(true);
    setCustomer(customer);
    setEditId(customer._id);
  };

  const closeModal = () => {
    setShowModal(false);
    setCustomer({
      name: '',
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setCustomer((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setCustomer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/customers/${editId}`,
        customer
      );
      setCustomers((prev) =>
        prev.map((c) => (c._id === editId ? response.data : c))
      );
      toast.success('Customer updated successfully!');
      closeModal();
    } catch (error) {
      toast.error('Error updating customer!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      toast.success('Customer deleted successfully!');
    } catch (error) {
      toast.error('Error deleting customer!');
    }
  };

  return (
    <div>
      <Navbar/>
      <h1 style={{color:"white", textAlign:"center"}}>Customer Management</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                {c.address.street}, {c.address.city}, {c.address.state},{' '}
                {c.address.zipCode}, {c.address.country}
              </td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Customer</h2>
            <form style={{overflow:"auto", padding:"10px"}}>
              <div>
                <label style={{color:"gray"}}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={{color:"gray"}}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={{color:"gray"}}>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={customer.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <h3 style={{color:"gray"}}>Address</h3>
              <div>
                <label style={{color:"gray"}}>Street:</label>
                <input
                  type="text"
                  name="address.street"
                  value={customer.address.street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={{color:"gray"}}>City:</label>
                <input
                  type="text"
                  name="address.city"
                  value={customer.address.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={{color:"gray"}}>State:</label>
                <input
                  type="text"
                  name="address.state"
                  value={customer.address.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={{color:"gray"}}>Zip Code:</label>
                <input
                  type="text"
                  name="address.zipCode"
                  value={customer.address.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label style={{color:"gray"}}>Country:</label>
                <input
                  type="text"
                  name="address.country"
                  value={customer.address.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
            <div className="modal-buttons">
              <button onClick={handleSave}>Update</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Customer;
