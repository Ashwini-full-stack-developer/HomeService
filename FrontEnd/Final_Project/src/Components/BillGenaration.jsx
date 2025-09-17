import React, { useEffect, useState } from "react";

function BillGeneration() {
  const [data, setData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [labour, setlabour]=useState([]);
  const [address, setaddress]=useState([]);

  const [selectedService, setSelectedService] = useState(""); // Stores the selected service
  const [formData, setFormData] = useState({
    orderID: 0,
    userID: localStorage.getItem("userID"),
    labourID: "",
    serviceID: "",
    addressId: "",
    discount: 0,
    surviceCost: 0,
    totalCost: 0,
  });

  // Updated service list
  

  useEffect(() => {
    async function fetchLabour() {
      const response1 = await fetch("https://localhost:7281/api/Labour/getall", {
        method: "GET",
        headers: {
    
          "Content-Type": "application/json",
          Authorization :`Bearer ${localStorage.getItem("token")}`,
        },
      });
    
      if (!response1.ok) {
        throw new Error("Failed to fetch data");
      }

       const data1 = await response1.json();
       setlabour(data1);

         const response2 = await fetch("https://localhost:7281/api/Address/GetAllLocations", {
        method: "GET",
        headers: {
    
          "Content-Type": "application/json",
          Authorization :`Bearer ${localStorage.getItem("token")}`,

        },
      });
    
      if (!response2.ok) {
        throw new Error("Failed to fetch data");
      }
       const data2 = await response2.json();
 
       setaddress(data2);
    

    }
    fetchLabour();

      }, []);
  async function generateBill() {
    try {
      

      // Find matching service details
   

      const labourid1 = labour.find((u)=>u.work===localStorage.getItem("servicename"));
        console.log(selectedService)
        const addres = address.find((value)=>value.userId===localStorage.getItem("userID")) 
      // Update formData with found values
  
      const updatedFormData = {
        ...formData,
        addressId: addres.addressId,
        labourID: labourid1.labourId,
        serviceID: localStorage.getItem("serviceID"),
        discount: localStorage.getItem("serviceDiscount"),
        surviceCost: localStorage.getItem("serviceCost"),
      };

      setFormData(updatedFormData);

      // Send data to the backend
      const response = await fetch("https://localhost:7281/api/Order/InsertNewOrder", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
              

        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) throw new Error("Failed to generate bill");

      setIsSubmitted(true);
      alert("Order Placed Successfully");

    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  async function fetchdata() {
    try {
      const response = await fetch("https://localhost:7281/api/BillGeneration/GetBillForm",{
        method: "GET",
        headers: {  contentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }, } 
      )
  
      if (!response.ok) throw new Error("Failed to fetch bill data");
  
      const billData = await response.json();
      
      console.log("Fetched Bill Data:", billData); // Debugging
  
      if (!billData || Object.keys(billData).length === 0) {
        alert("No Bill Data Found");
        return;
      }
  
      setData(billData);
      setSubmit(true);
    } catch (error) {
      console.error("Error fetching bill data:", error);
      alert("Error fetching bill. Check console for details.");
    }
  }
  const order = data.find((value)=>value.serviceName===localStorage.getItem("servicename"));

  

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      
{console.log(address)}
      <h1 className="text-2xl font-bold text-center mb-4">Bill Generation</h1>

      {/* Service Selection Dropdown */}
      <div className="mb-4">


</div>



      {submit ? (
        <div className="grid grid-cols-2 gap-4 text-lg">

          <p className="font-semibold">Order ID:</p> <p>{order.orderId}</p>
          <p className="font-semibold">Service Name:</p> <p>{order.serviceName}</p>
          <p className="font-semibold">User Name:</p> <p>{order.userName}</p>
          <p className="font-semibold">Phone Number:</p> <p>{order.userPhoneNumber}</p>
          <p className="font-semibold">Full Address:</p> <p>{order.label}</p>
          <p className="font-semibold">Service Discount:</p> <p>{order.discount}</p>
          <p className="font-semibold">Service Cost:</p> <p>{order.serviceCost}</p>
          <p className="font-semibold">Total Cost:</p> <p>{order.toatalcost}</p>
        </div>
      ) : (
        <div className="text-center"></div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={generateBill}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg"
        >
          Place Order
        </button>
        <button
          onClick={fetchdata}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg ml-4"
        >
          Get Bill
        </button>
      </div>
    </div>
  );
}

export default BillGeneration;
