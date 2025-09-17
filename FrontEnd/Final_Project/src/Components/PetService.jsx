import React from "react";

const PetService = () => {
  return (
    <div className="p-4 bg-yellow-100  relative">
      <h1 className="text-4xl font-bold text-black ">Pet Services</h1>
      <p className="mt-4 flex justify-center text-black text-lg">"Pets leave paw prints on our hearts."</p>
      <div className=" md:grid-cols-3 gap-6 mt-10">
       
        <div className="text-center  flex justify-evenly p-10 rounded-lg shadow-lg">
          <img
            src="/images/pet.jpg"
            alt="Dog & Cat"
            className="w-96 h-96 rounded-lg mx-auto transition-transform duration-300 object-cover hover:scale-105"
          />
           <img
            src="/images/d5dcab36b9fe5a2ce18f4ba2fd6ecaf9.jpg"
            alt="Dog & Cat"
            className="w-96 h-96 rounded-lg mx-auto transition-transform duration-300 object-cover hover:scale-105"
          />
          
       
          
        </div>
       
      
        
      </div>
   
      
    </div>
    
  );
};

export default PetService;
