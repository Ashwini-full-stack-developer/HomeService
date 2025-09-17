import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; 

const  Hist_GET = "https://localhost:7281/api/History/getall";
const API_GET = "https://localhost:7281/api/Labour/getall";

const LabourHome = () => {
  const [labour, setLabour] = useState(null);
  const [labourIdFind, setlabourIdFind] = useState([]);
  const [register, setregister] = useState([]);
  const [GetBillForm, setgetbillform] = useState([]);


  const [historyData, setHistoryData] = useState([]);
  const [orderdata, setorderdata] = useState([]);
  const [showOrder, setshowOrder] = useState(false);
  const [showHistory, setshowHistory] = useState(false);
  const [email, setemail] = useState("");
  const [work, setwork] = useState("");

  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    email: "",
    pass: "",
    name: "",
    phoneNO: "",
    work: "",
    LabourId: "",
  });

  const navigate = useNavigate();

  // Fetch Labour details on component mount
  useEffect(() => {
    const loggedInEmail = localStorage.getItem("labouremail");
    setemail(loggedInEmail)
    if (!loggedInEmail) {
      alert("Please log in first!");
      navigate("/");
      return;
    }
    axios
    .get("https://localhost:7281/api/BillGeneration/GetBillForm", {
       headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("labourtoken")}`,
  }},)
    .then((response) => {
    setgetbillform(response.data);
    const user = response.data.find((u)=>u.serviceName===u.serviceName)
    setwork(user.serviceName)

    })


    

         
    axios
      .get(API_GET)
      .then((response) => {
 
        setlabourIdFind(response.data);
        const user = response.data.find((u) => u.email === loggedInEmail);
        if (user) {
          setLabour(user);
          const user1= localStorage.setItem("labourId", user.labourId);
          console.log(user1);
         
          setFormData({
            id: user.id,
            email: user.email,
            pass: user.pass,
            name: user.name,
            phoneNO: user.phoneNO,
            work: user.work,
            LabourId: user.labourId,
          });

          console.log(history.LabourId);
        } else {
          alert("User not found! Redirecting to login.");
          navigate("/");
        }
      })
   

      axios
      .get("https://localhost:7281/api/History/getall",{
        method:'GET',
        headers: {
        "Content-Type": "application/json", 
      }})
      .then((response) => {
        setregister(response.data);
      
      })



   
   
  }, [navigate]);

  // Fetch History Data
  const GetHistory = () => {
    axios
      .get("https://localhost:7281/api/History/getall",{
        headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${localStorage.getItem("labourtoken")}`,}})
      .then((response) => {
        if(response.data===null)
          {   alert("no history")
  
          }
          else{
            setHistoryData(response.data)
            setshowHistory(true)
            setshowOrder(false)
            setShowProfile(false)
          }
      

        
      })
     

      .catch((error) => {
        alert(" History is empty.");
        console.log(historyData);
        console.error("Error fetching history data:", error);
      });
   
  };
  const GetOrder = () => {
     axios
     .get("https://localhost:7281/api/LabourGetOrder/labourorder",{
      headers: {
      "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("labourtoken")}`,}})
     .then((response) => {
      setorderdata(response.data);
      setshowOrder(true)
      setshowHistory(false)
      setShowProfile(false)
     
    })

     .catch((error) => {
       alert("Error fetching history data.");

       console.error("Error fetching history data:", error);
     });

  }
  


  

  

const sendDataToHistory = async(name,id) => {
  
  console.log(orderdata);
  console.log("fcgvb")
  const user2 = orderdata.find((user) => name === user.userName);
  console.log(user2);
  const HistoryformData = {
    id:0,
    custName: user2.userName,
    phNo: user2.userPhoneNumber,
    address: user2.fullAddrress,
    labourId:localStorage.getItem("labourId"),
 
  }
  console.log(HistoryformData);
  setshowOrder(false)

   const response = await fetch("https://localhost:7281/api/History/insert",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization: `Bearer ${localStorage.getItem("labourtoken")}`,
    },
    body:JSON.stringify(HistoryformData),
   })
    .then(() => {alert("Data sent to history successfully!");})
   
      
    .catch((error) => {
      alert("Error sending data to history.");
      console.error("Error sending data to history:", error);
    });

    const response1 = await fetch(`https://localhost:7281/api/LabourGetOrder/delteLabourOrder?userid=${id}`,{
      method:"Delete",
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${localStorage.getItem("labourtoken")}`,
      },
     
      
     })
     
      
     
        
   
}

  


  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInEmail");
    navigate("/");
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // Handle Profile Update
  const handleUpdate = () => {
    if (!labour) return;
    console.log(labour.labourId)
    const API_UPDATE = `https://localhost:7281/api/Labour/update/${labour.labourId}`;

    axios
      .put(API_UPDATE, formData)
      .then(() => {
        alert("Profile updated successfully!");
        setLabour({ ...labour, ...formData });
        setIsEditing(false);
      })
      .catch((error) => {
        alert("Error updating profile.");
        console.error("Error updating profile:", error);
      });
  };

  if (!labour) return <div className="text-center mt-10">Loading...</div>;
return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-yellow-500 mt-3 p-4 flex justify-between">
        <h1 className="text-black text-lg font-bold">Labour Dashboard</h1>
       
        <button
          onClick={() => {setShowProfile(!showProfile),setshowOrder(false),setshowHistory(false)}}
          className="text-black text-2xl  "
        >
       < FontAwesomeIcon icon={faBars}  className="text-black" />
        </button>
      </nav>
      <div className="flex justify-evenly items-center mt-10">
      <button
          onClick={GetHistory}
          className="text-black text-lg font-bold bg-yellow-500 p-2 rounded transition duration-50 hover:bg-yellow-600 hover:text-white border-r-amber-200 shadow-emerald-950"
        >
         History
        </button>
        <button
          onClick={GetOrder}
          className="text-black text-lg font-bold bg-yellow-500 p-2 rounded transition duration-50 hover:bg-yellow-600 hover:text-white"
        >
          Get Order
        </button>
        </div>
      {/* History Table */}
      {showHistory && (
        <div className="p-4">

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">SlNo</th>
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">PhNO</th>
                <th className="border p-2">Address</th>
              </tr>
            </thead>
            <tbody>
            {console.log(historyData)}
              {historyData .map((value, index) => (
                
                  <tr
                    key={index}
                    className="hover:bg-gray-100">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{value.custName || "N/A"}</td>
                    <td className="border p-2">{value.phNo || "N/A"}</td>
                    <td className="border p-2">{value.address || "N/A"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
            {showOrder && (
            
        <div className="p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">SlNo</th>
                <th className="border p-2">Customer Name</th>
                <th className="border p-2">PhNO</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">button</th>
              </tr>
            </thead>
            <tbody>

              {orderdata.map((value, index) => (
                
                  <tr
                    key={index}
                    className="hover:bg-gray-100">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{value.userName || "N/A"}</td>
                    <td className="border p-2">{value.userPhoneNumber || "N/A"}</td>
                    <td className="border p-2">{value.fullAddrress || "N/A"}</td>
                    <td className="border p-2" onClick={()=>sendDataToHistory(value.userName,value.userid)}   >yes</td>
                 </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Profile Card */}
      {showProfile && (
        <div className="flex items-center justify-center mt-10">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-4">
              Labour Profile
            </h2>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="phoneNO"
                  value={formData.phoneNO}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <input
                  type="text"
                  name="work"
                  value={formData.work}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="w-full bg-green-500 text-white p-2 rounded mt-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-gray-500 text-white p-2 rounded mt-2"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {labour.name}
                </p>
                <p>
                  <strong>Email:</strong> {labour.email}
                </p>
                <p>
                  <strong>Phone No:</strong> {labour.phoneNO}
                </p>
                <p>
                  <strong>Work Role:</strong> {labour.work}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-yellow-500 text-black p-2 rounded mt-2"
                >
                  Edit Profile
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white p-2 rounded mt-4"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabourHome;
