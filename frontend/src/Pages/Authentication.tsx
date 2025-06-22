import React from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFFFF0]">
      <nav className="p-[1.5rem] border-b-2 bg-[#FFC107] text-[49px] text-[#FFFFF0] nav-logo py-3 text-center  ">
        EthniCart
      </nav>
      
      
      <p className="text-center py-4 text-[#2E8B57] text-[40px] pr-ad">Your one Stop destination for Sarees</p>
      <div>
        <Login></Login>
      </div>
      <div className="align-left" onClick={() => navigate("/admin")}>admin
    </div>
    </div>
  );
};

export default Authentication;
