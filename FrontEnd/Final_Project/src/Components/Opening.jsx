import React from "react";
import { Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('https://source.unsplash.com/featured/?home,service')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Reliable Home Services, Anytime</h1>
          <p className="mt-2 text-lg">From plumbing to cleaning, we've got you covered.</p>
         <Link to ="/userlogin"> <button className="mt-4 bg-yellow-500 px-6 py-2 rounded-full text-black font-semibold hover:bg-yellow-600">
            Book a Service
          </button>
          </Link>
        </div>
      </div>

      {/* Services Section */}
     
<div> </div>
      {/* CTA Section */}
      <div className="bg-yellow-500 py-6 text-center text-black font-semibold">
        <h3 className="text-2xl">Need help? Book a service now!</h3>
        <button className="mt-3 bg-black text-white px-5 py-2 rounded hover:bg-gray-800">
          Get Started
        </button>
      </div>
    </div>
  );
}
