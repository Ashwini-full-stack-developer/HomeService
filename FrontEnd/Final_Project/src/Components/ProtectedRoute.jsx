import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const admintoken = localStorage.getItem("admintoken");
  const adminjobRole = parseInt(localStorage.getItem("adminjobRole")); 
  const jobRole = parseInt(localStorage.getItem("jobRole")); 
  const labourtoken = localStorage.getItem("labourtoken");
  const labourjobRole = localStorage.getItem("labourrole"); 
  console.log(labourjobRole);
  console.log(labourtoken);
  const hasUserAccess = token && allowedRoles.includes(jobRole);
  const hasAdminAccess = admintoken && allowedRoles.includes(adminjobRole);
  const hasLabourAccess = labourtoken && allowedRoles.includes(labourjobRole);

  console.log(labourjobRole ); 
   console.log(labourtoken );


  if (!hasUserAccess && !hasAdminAccess && !hasLabourAccess) {
    console.log("labourjobRole", labourjobRole);
  if (allowedRoles.includes(jobRole) ){
    return <Navigate to="/userlogin" replace />;
  }
  else if (allowedRoles.includes(adminjobRole)){
    return <Navigate to="/adminlogin" replace />;
  }

  else if (allowedRoles.includes(labourjobRole)){
    return <Navigate to="/labourhome" replace />;}
  else{
    return <Navigate to="/" replace />;
  }
}
return children;



};

export default ProtectedRoute;
