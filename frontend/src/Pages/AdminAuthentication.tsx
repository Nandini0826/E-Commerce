import React from 'react'
import AdminLogin from '../components/AdminLogin'
import { useNavigate } from 'react-router-dom';
import Authentication from './Authentication'

const AdminAuthentication = () => {
  const navigate = useNavigate();
  
  return (
    <div className='bg-[#FFFFF0]'><nav className="p-[1.5rem] border-b-2 bg-[#FFC107] text-[49px] text-[#FFFFF0] nav-logo py-3 text-center  ">
        EthniCart
      </nav>
    <div className="align-left" onClick={() => navigate("/")}>
      Home
    </div>
      <div>
        <p></p>
        <AdminLogin /></div>
    </div>
  )
}

export default AdminAuthentication