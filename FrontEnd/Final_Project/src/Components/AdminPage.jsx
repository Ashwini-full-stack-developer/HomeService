import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"; 

import React, { useState } from 'react';
import './Adminpage.css';
import axios from 'axios';

export default function AdminPage()
{
  const [newService, setNewService] = useState({
    serviceID: '',
    serviceName: '',
    serviceImage: '',
    serviceCost: '',
    serviceDiscount: ''
  });
  const [editing, setEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [services, setServices] = useState([]);




  const [users, setUsers] = useState([]);
  const [labours, setLabours] = useState([]);
  const [orders, setOrders] = useState([]);

  const [showServices, setShowServices] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showLabours, setShowLabours] = useState(false);
  const [showOrders, setShowOrders] = useState(false);


  const fetchServices = () => {
    axios.get('https://localhost:7281/api/survice/GetSurvices',{
      method:'GET',
      headers: { 'Content-Type': 'application/json' ,
        'Authorization' :`Bearer ${localStorage.getItem("token")}`,}
      }
      
      
    )
      .then(response => {

        setServices(response.data);
        setError('');
        setShowServices(true);
        setShowUsers(false);
        setShowLabours(false);
        setShowOrders(false);

      })
      .catch(error => {
        setError('Error fetching services');
        console.error(error);
      });
  };

  const fetchUsers = () => {
    axios.get('https://localhost:7281/api/Registraction/GetRegistractionInformation')
      .then(response => {
        setUsers(response.data);
        setError('');
        setShowUsers(true);
        setShowServices(false);
        setShowLabours(false);
        setShowOrders(false);
      })
      .catch(error => {
        setError('Error fetching users');
        console.error(error);
      });
  };

  const fetchLabours = () => {
    axios.get('https://localhost:7281/api/Labour/getall',{method:'GET',
      headers: { 'Content-Type': 'application/json' ,
        'Authorization' :`Bearer ${localStorage.getItem("admintoken")}`,
      }
      
    })
      .then(response => {

        setLabours(response.data);
        setError('');
        setShowLabours(true);
        setShowUsers(false);
        setShowServices(false);
        setShowOrders(false);

      })
      .catch(error => {
        setError('Error fetching labours');
        console.error(error);
      });
  };

  const fetchOrders = () => {
    axios.get('https://localhost:7281/api/Order/GetOrders',{method:'GET',
      headers: { 'Content-Type': 'application/json' ,
        'Authorization' :`Bearer ${localStorage.getItem("admintoken")}`,
      }
      
    })
      .then(response => {
        setOrders(response.data);
        setError('');
        setShowOrders(true);
        setShowLabours(false);
        setShowUsers(false);
        setShowServices(false);
      })
      .catch(error => {
        setError('Error fetching orders');
        console.error(error);
      });
  };



  const handleDelete = async (serviceID) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const response = await axios.delete(`     https://localhost:7281/api/survice/DeleteServices?id=${serviceID}`,{method:'DELETE',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization' :`Bearer ${localStorage.getItem("admintoken")}`,}
        }, {
      }); 

      if (response.status === 200) {
        fetchServices();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleEdit = (service) => {
    setNewService(service);
    setEditing(true);
  };

  const handleChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {

        await axios.put(`https://localhost:7281/api/survice/UpdateSurvice?ServiceID=${newService.serviceID}`, newService, {
     
          headers: { 'Content-Type': 'application/json' ,
            'Authorization' :`Bearer ${localStorage.getItem("admintoken")}`,}
        });
        setSuccessMessage('Service updated successfully!');
      } else {
        await axios.post('https://localhost:7281/api/survice/InsertServices', newService, {
          headers: { 'Content-Type': 'application/json' ,
            'Authorization' :`Bearer ${localStorage.getItem("admintoken")}`,}
        });
        setSuccessMessage('Service added successfully!');
      }
      setError('');
      setNewService({ serviceID: '', serviceName: '', serviceImage: '', serviceCost: '', serviceDiscount: '' });
      setEditing(false);
      fetchServices();
    } catch (error) {
      setError('Failed to process service. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='AdminPage'>
      {console.log(labours)}
      <div className='AdminBar '>
      <button className ="bg-yellow-500 hover:bg-yellow-700 text-black "onClick={fetchUsers}>Get Users</button>
      <button className ="bg-yellow-500 hover:bg-yellow-700 text-black  "onClick={fetchServices}>Get Services</button>
      <button className ="bg-yellow-500 hover:bg-yellow-700 text-black "onClick={fetchLabours}>Get Labours</button>
      <button className ="bg-yellow-500 hover:bg-yellow-700 text-black  "onClick={fetchOrders}>Get Orders</button>  
     
      </div>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {showServices && (
        <div className='survicedatalist'>
           {editing ? <h2>Edit here <FontAwesomeIcon icon={faArrowDown}  /></h2>  : <h2>Add Service<FontAwesomeIcon icon={faArrowDown}  /></h2>}
        <form onSubmit={handleSubmit} className='service-form'>
      
        <input type='text' name='serviceName' placeholder='Service Name' value={newService.serviceName} onChange={handleChange} required />
        <input type='text' name='serviceImage' placeholder='Service Image URL' value={newService.serviceImage} onChange={handleChange} required />
       
        <input type='number' name='serviceCost' placeholder='Service Cost' value={newService.serviceCost} onChange={handleChange} required />
        <input type='number' name='serviceDiscount' placeholder='Service Discount' value={newService.serviceDiscount} onChange={handleChange} required />
        <button type='submit'>Add Service</button>
      </form>
        <table>
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Service Name</th>
              <th>Service Cost</th>
              <th>Service Discount</th>
              <th>Customize </th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.serviceID}>
              <td data-label="Service ID">{service.serviceID}</td>
<td data-label="Service Name">{service.serviceName}</td>
<td data-label="Service Cost">₹{service.serviceCost}</td>
<td data-label="Service Discount">{service.serviceDiscount}%</td>

                <td>
                  <div className="flex justify-center">
                <button className="block text-center p-2 text-white mt-2 cursor-pointer bg-blue-400 rounded-md" onClick={() => handleEdit(service)}>Edit</button>
      
                
                </div>
                </td>
                <td>
                <div className="flex justify-center ">
                <button className="block text-center p-2 text-white mt-2 cursor-pointer bg-blue-400 rounded-md" onClick={() => handleDelete(service.serviceID)}>Remove</button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}

      {showUsers && (
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userID}>
              <td data-label="User ID">{user.userID}</td>
<td data-label="Email">{user.userEmail}</td>
<td data-label="Name">{user.userName}</td>
<td data-label="Phone Number">{user.userPhoneNumber}</td>
<td data-label="Address">{user.userAddress}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showLabours && (
        <table>
          <thead>
            <tr>
              <th>Labour ID</th>
              <th>Name</th>
            
              <th>Phone Number</th>
              <th>Email</th>
              {/* <th>Account Number</th>
              <th>Aadhar Number</th> */}
              <th>Work</th>
            </tr>
          </thead>
          <tbody>
            {labours.map((labour) => (
              <tr key={labour.labourId}>
             <td data-label="Labour ID">{labour.labourId}</td>
<td data-label="Name">{labour.name}</td>
<td data-label="Phone Number">{labour.phoneNO}</td>
<td data-label="Email">{labour.email}</td>
<td data-label="Work">{labour.work}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showOrders && (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Labour ID</th>
              <th>Service ID</th>
              <th>Address ID</th>
              <th>Discount</th>
              <th>Service Cost</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderID}>
               <td data-label="Order ID">{order.orderID}</td>
<td data-label="User ID">{order.userID}</td>
<td data-label="Labour ID">{order.labourID}</td>
<td data-label="Service ID">{order.serviceID}</td>
<td data-label="Address ID">{order.addressId}</td>
<td data-label="Discount">{order.discount}</td>
<td data-label="Service Cost">₹{order.surviceCost}</td>
<td data-label="Total Cost">₹{order.totalCost}</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
