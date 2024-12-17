import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import './App.css';
import Register from './components/Register';
import Videos from './components/Videos';
import VideoPage from './Pages/VideoPage';
import Customer from './Pages/Customer';
import CustomerForm from './components/CustomerForm ';
import Logout from './components/Logout';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer'
import Booking from './components/Booking';
import BookingList from './components/BookingList';
import User from './components/User';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };
  return (
    <Router>
              <ToastContainer /> {/* Add this once */}
<hr></hr>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/logout" element={<Logout setToken={handleSetToken} />} /> */}

        <Route path="/register" element={<Register />} />
        <Route path="/videos/create" element={<Videos />} />
        <Route path="/videos" element={<VideoPage />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/bookings/create" element={<Booking />} />
        <Route path="/users" element={<User />} />

        <Route path="/customers" element={<Customer />} />
        <Route path="/customers/create" element={<CustomerForm />} />


        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
      </Routes>
      {/* <hr></hr> */}
      <br></br>
      <br></br>
      <br></br>

      <Footer/>
    </Router>
  );
}

export default App;
