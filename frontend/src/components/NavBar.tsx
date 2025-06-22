import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
     const response = await axios.post('http://localhost:3000/users/logoutuser', {}, { withCredentials: true });
      // Optionally clear local storage or auth state here
      console.log("Logout response:", response.data); // Add this

      navigate('/'); // Redirect to login page after logout
    } catch (err) {
      alert('Logout failed!');
    }
  };
    return (
      <nav className="flex justify-between p-[1.5rem] border-b-2 bg-[#FFC107] text-center  ">
        <div className=' text-[49px] text-[#FFFFF0] nav-logo py-3'>
          <Link to='/'>
          EthniCart
          </Link>
        </div>
        <div className='flex gap-6'>
          <Link to='/wishlist'><p className='hover:border-b-2 text-[#FFFFF0] hover:border-b-[#C28840] text-xl'>whishlist</p></Link>
          <Link to='/order'><p className='hover:border-b-2 text-[#FFFFF0] hover:border-b-[#C28840] text-xl'>Orders</p></Link>
          <Link to='/cart'><p className='hover:border-b-2 text-[#FFFFF0] hover:border-b-[#C28840] text-xl'>Cart</p></Link>
          <Link to='/logout'><p className='hover:border-b-2 text-[#FFFFF0] hover:border-b-[#C28840] text-xl' onClick={handleLogout}>Logout</p></Link>
        </div>
      </nav>
  )
}

export default NavBar