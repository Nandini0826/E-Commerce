import React from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/admin/logout', {}, { withCredentials: true });
      // Optionally clear local storage or auth state here
      navigate('/'); // Redirect to login page after logout
    } catch (err) {
      alert('Logout failed!');
    }
  };
    return (
      <nav className="flex justify-between p-[1.5rem] border-b-2 bg-[#FFC107] text-[49px] text-[#FFFFF0] nav-logo text-center  ">
        <div className='text-[49px] text-[#FFFFF0] nav-logo py-3'>
          <Link to='/'>
          EthniCart
          </Link>
        </div>
        <div className='flex gap-6 bg-[]'>
          <Link to='/Products'><p className='hover:border-b-2 text-[#FFFFF0] hover:border-b-[#C28840] text-xl'>Products</p></Link>
          <Link to='/orders'><p className='hover:border-b-2 text-[#FFFFF0] hover:border-b-[#C28840] text-xl'>Orders</p></Link>
          <Link to='/logout'><p className='hover:border-b-2 text-[#FFFFF0] hover:border-b-[#C28840] text-xl'onClick={handleLogout}>Logout</p></Link>
        </div>
      </nav>
  )
}

export default NavBar