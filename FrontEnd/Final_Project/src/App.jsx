import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'

import Registration from './Components/Registration'
import UserPage from './Components/UserPage';
import AdminPage from './Components/AdminPage';
import LabourHome from './Components/LabourHome';
import UserLogin from './Components/UserLogin';
import LabourLogin from './Components/LabourLogin';
import Navbar from './Components/Navbar';
import AboutUs from './Components/AboutUs';
import UserBillForm from './Components/UserBillForm';
import ContactPage from './Components/ContactPage';

import AdminLoginPage from './Components/AdminLoginPage';

import ProtectedRoute from './Components/ProtectedRoute'; 
import BillGeneration from './Components/BillGenaration';
import HomePage from './Components/HomePage';
import { all } from 'axios';



function App() {

  return (
    <div >
      
      <BrowserRouter>
        <Navbar />
    
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/registration" element={<Registration/>} />





        <Route path="/userpage" element={
            <ProtectedRoute allowedRoles={[1]}>
              <UserPage />
            </ProtectedRoute>
          } />
   
       
          <Route path="/labourhome" element={
            <ProtectedRoute allowedRoles={["Labour"]}>

             <LabourHome />
            </ProtectedRoute>
          } />
          

 
          <Route path="/adminpage" element={
            <ProtectedRoute allowedRoles={[2]}>
              <AdminPage />
            </ProtectedRoute>
          } />
<Route
  path="/userbillform"
  element={
    <ProtectedRoute allowedRoles={[1]}>
      <UserBillForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/billgeneration"
  element={
    <ProtectedRoute allowedRoles={[1]}>
      <BillGeneration />
    </ProtectedRoute>
  }
/>
          <Route path="/contactpage" element={<ContactPage/>} />

          <Route path="/adminloginpage" element={<AdminLoginPage/>} />

          <Route path="/labourlogin" element={<LabourLogin/>} />



          





        </Routes>
        <AboutUs />

      </BrowserRouter>
    
      
    </div>
  )
}

export default App
