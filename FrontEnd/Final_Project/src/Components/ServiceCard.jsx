

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
 


function ServiceCard({ service }) {
  

  const [isHovered,setIsHovered] = useState(false);
  return (
    <div
    className={`bg-yellow-100 rounded-2xl  flex justify-center  overflow-hidden transition-all duration-300 ${
      isHovered ? "shadow-xl transform -translate-y-2" : "shadow-md"}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div className="p-4">

      <div className="w-60 h-60 object-fit overflow-hidden rounded-lg shadow-lg">
        <img
          src={service.serviceImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center px-2">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.serviceName}</h3>
        <p className="text-lg text-gray-700 mb-6">{service.description}</p>

       <Link to ="/userbillform"><button
                    
          className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            isHovered
              ? "bg-yellow-600 text-white"
              : "bg-white text-yellow-600 border border-yellow-600"
          }`}
          onClick={() => {
            console.log("GFERGER");
            localStorage.setItem("servicename", service.serviceName)
            localStorage.setItem("serviceDiscount", service.serviceDiscount)
            localStorage.setItem("serviceID", service.serviceID)
            localStorage.setItem("serviceCost", service.serviceCost)
          } }

        >
          Book Now
        </button>
        </Link> 
      </div>
    </div>
  </div>
  )
}

export default ServiceCard
