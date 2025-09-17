import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCircleUser,faBriefcase } from "@fortawesome/free-solid-svg-icons"; 
import { useState } from "react";
import React from "react";
import {  Link } from "react-router-dom";

function Navbar() {
  const [extraicons,setextraicons]=useState(false);
   localStorage.setItem("extraicons", extraicons);
  return (  
  
    <nav className="bg-yellow-500 p-4  text-white shadow-md" >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side */}
       
        <div className="flex items-center justify-between space-x-2">
        <img src="public\images\logo.jpg" className="w-10 h-10  rounded-4xl object-center " alt="" />
        <div className="text-3xl font-bold text-black">HomeService</div>
        </div>

        {/* Right Side */}
        <div className="space-x-6  justify-between  flex list-none text-black">
        <Link to ="/"><li className="hover:text-yellow-700 font-bold cursor-pointer">Home</li></Link> 
        <Link to ="/contactpage"><li className="hover:text-yellow-700  font-bold cursor-pointer">Contact</li></Link>
        <Link to ="/userlogin"><li className="hover:text-yellow-700 font-bold cursor-pointer">Login</li></Link>      


          <FontAwesomeIcon icon={faCircleUser}  className=" text-2xl text-black  m-1.5 "  onClick={() => setextraicons(!extraicons)}/>

        </div>
        {extraicons && ( <div className="absolute top-10 right-0 z-99 bg-yellow-500 p-4  rounded-lg">
          <Link to="/labourlogin" className="block py-2  text-black color: bg-yellow-500"> <FontAwesomeIcon icon={faBriefcase}  /></Link>
          <Link to="/adminloginpage" className="block py-2 bg-yellow-500 text-black"><FontAwesomeIcon icon={faUser}  /></Link>
          </div>
          )}
      </div>
    </nav>
  )
}

export default Navbar;
