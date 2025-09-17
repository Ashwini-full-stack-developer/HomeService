import {  useState,useContext,createContext } from "react";
import {  Link, Navigate } from "react-router-dom";



export default function Registration() {
  
  const [formData, setFormData] = useState({
UserID:"",
    UserEmail: "",
    Password: "",
    UserName: "",
    JobRole:1,
    UserPhoneNumber: "",
    UserAddress: ""
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };




  async function handleSubmit(e) {

    e.preventDefault();
 
        console.log("Form Data:", formData);
        const resp = await fetch("https://localhost:7281/api/Registraction/InsertNewUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            });
            console.log("Response:", resp);
            alert(" Registered Successfully");
            setFormData({
              UserID:"",
              UserEmail: "",
              Password: "",
              UserName: "",
              JobRole:1,
              UserPhoneNumber: "",
              UserAddress: ""
            });
            


    
  };


  return (
   
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white  p-6 rounded-lg shadow-md w-100"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Registration</h2>
        
        <input 
          type="text" name="UserName" placeholder="User Name" value={formData.UserName} onChange={handleChange} required
          className="w-full  m-2  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        
        <input 
          type="email" name="UserEmail" placeholder="Email" value={formData.UserEmail} onChange={handleChange} required
          className="w-full   m-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        
        <input 
          type="Password" name="Password" placeholder="Create New Password" value={formData.Password} onChange={handleChange} required
          className="w-full  m-2  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

         <input 
          type="text" name="UserPhoneNumber" placeholder="Phone Number" value={formData.UserPhoneNumber} onChange={handleChange} required
          className="w-full m-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        
        <textarea 
          name="UserAddress" placeholder="Address" value={formData.UserAddress} onChange={handleChange} required
          className="w-full  m-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>
        
        <button 
          type="submit" 
          className="w-full m-2 bg-yellow-500  text-black py-2 rounded-lg hover:bg-yellow-600 transition"
        >
          Register
        </button>
<Link to ="/userlogin" ><button className="w-full m-2 bg-yellow-500  text-black py-2 rounded-lg hover:bg-yellow-600 transition" >Back to login</button></Link>
      </form>
    </div>
    
     
       
  
    
  );
}



