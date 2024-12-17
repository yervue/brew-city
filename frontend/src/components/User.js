import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/admin.css'; // Add custom styling here
import Navbar from './Navbar';

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [editUser, setEditUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/register', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User registered successfully');
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      toast.error('Error registering user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editUser._id}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User updated successfully');
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      toast.error('Error updating user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    toast.success('Logged out successfully');
  };

  return (
    <>
    <Navbar/>
  
    <div className="admin-container">
      
      <h1 style={{color:"white", textAlign:"center"}}>User Management</h1>

      {token ? (
        <>
          <div className="add-user">
            <h2 style={{color:"white", textAlign:"center"}}>Add New User</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <button onClick={handleRegister}>Add User</button>
          </div>

          <div className="user-list">
            <h2 style={{color:"white", textAlign:"center"}}>All Users</h2>
            <table style={{color:"white", textAlign:"center"}}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>
                      <button onClick={() => setEditUser(user)}>Edit</button>
                      <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editUser && (
            <div className="edit-user">
              <h2>Edit User</h2>
              <input
                type="text"
                value={editUser.username}
                onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
              />
              <button onClick={handleEdit}>Update User</button>
              <button onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          )}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div className="login-section">
          <h2>Login Required</h2>
        </div>
      )}
      <ToastContainer />
    </div>
    </>
  );
};

export default User;
