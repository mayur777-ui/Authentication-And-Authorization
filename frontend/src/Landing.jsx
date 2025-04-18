import React from 'react'
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
     <center>
     <Link to={'/login'}>Login</Link>
     <br /><br /><br />
     <Link to={'/register'}>Register</Link>
     </center>
    </div>
  )
}
