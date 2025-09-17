import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
const UserPage = () => {
 useEffect(()=>{
      async function fetchdata()
       {

        const respon = await fetch("https://localhost:7281/api/survice/GetSurvices",
          {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
             Authorization :`Bearer ${localStorage.getItem("token")}`,
        
 
          },})
          const respo = await respon.json();

       setHomeServicesData(respo)
        
         
        }
  fetchdata()
},[])




  const [homeServicesData, setHomeServicesData] = useState([]);
  const [category, setCategory] = useState("all");
  const categories = ["all", "cleaning", "repair", "installation", "maintenance"];

  const filteredServices = homeServicesData.filter(service => {
    if (category === "all") return true;
   
    const lowercaseTitle = service.title.toLowerCase();
   
    switch(category) {
      case "cleaning":
        return lowercaseTitle.includes("clean") ||
               service.id === 1 ||
               service.id === 10 ||
               service.id === 14 ||
               service.id === 15;
      case "repair":
        return lowercaseTitle.includes("repair") ||
               service.id === 3 ||
               service.id === 4 ||
               service.id === 6 ||
               service.id === 8;
      case "installation":
        return lowercaseTitle.includes("installation") ||
               service.id === 4 ||
               service.id === 11 ||
               service.id === 12;
      case "maintenance":
        return lowercaseTitle.includes("maintenance") ||
               service.id === 5 ||
               service.id === 7 ||
               service.id === 13;
      default:
        return true;
    }
  });
  return (
    <section className="bg-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium">
            Professional Services
          </span>
          <h2 className="text-5xl font-bold text-gray-800 mt-4 mb-3">
            Home Services We Provide
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Choose from our wide range of trusted and professional services to
            make your home comfortable and well-maintained.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                category === cat
                  ? "bg-yellow-600 text-white"
                  : "bg-white text-gray-700 hover:bg-yellow-100"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            console.log(localStorage.getItem(service.serviceID)),


            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 text-lg">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
