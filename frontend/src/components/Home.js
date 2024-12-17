import React from 'react'
import { Link } from 'react-router-dom'
import './css/Home.css'

function Home() {

  return (
  <div className='home' style={{marginTop:"20%", backgroundColor:"blue"}}>
          <h1 style={{textAlign:"center", display:"flex", alignItems:"center",justifyContent:"center" }}> Welcome please  <Link className='btn' to='/login'>    login   </Link>  or   <Link className='btn' to='/register'>    register </Link></h1>

  </div>
      )
}

export default Home