import React from 'react'
import NavBar from '../components/NavBar'

const Order = () => {
  return (
    <div className="bg-[#FFFFF0] ">
      <NavBar />
      <h1 className='text-2xl text-center'>Orders</h1>
      <div className='text-xl'>No orders placed yet</div>
    </div>
  )
}

export default Order