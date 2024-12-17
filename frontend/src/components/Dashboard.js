import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/dashboard.css'
import Navbar from './Navbar';
const Dashboard = () => {
  const navigate = useNavigate();

  return(<div className='dashboard'>
  <Navbar/>
  <h1 style={{textAlign:"center", color:"white"}}>Welcome to Admin dashboard!</h1>
  <div className='main'>
        <div className="left">

          <h2 style={{color:"white", textAlign:"center"}}>Metrics and Analytics</h2>
          <button style={{margin:"10px"}} onClick={() => navigate('/customers')}>Customers</button>
          <br></br>
          <button style={{margin:"10px", backgroundColor:"brown"}} onClick={() => navigate('/customers/create')}>Creat Customers</button>

          <button style={{margin:"10px", backgroundColor:"gray"}} onClick={() => navigate('/videos')}>Videos</button>
          <br></br>

          <button style={{margin:"10px", backgroundColor:"black"}} onClick={() => navigate('/videos/create')}>Creat Videos</button>
          <br></br>
          <button style={{margin:"10px", backgroundColor:"purple"}} onClick={() => navigate('/bookings/create')}>Create Booking</button>
          <button style={{margin:"10px", backgroundColor:"brown"}} onClick={() => navigate('/bookings')}>Booking History And Generate report</button>

          <button style={{margin:"10px", backgroundColor:"green"}} onClick={() => navigate('/users')}>Users</button>

        <br></br>
        </div>


        <div className='right'>
        <div className='box box_1'>
            <h3>20</h3>
            <p>Total Videos</p>

        </div>
        <div className='box box_2'>
        <h3>Most rated</h3>
            <p>The Matrix</p>

            </div>

            <div className='box box_3'>
            <h3>191</h3>
        <p>Total number of copies</p>
            
            
            </div>
      </div>
    </div>

  </div> )
};

export default Dashboard;
