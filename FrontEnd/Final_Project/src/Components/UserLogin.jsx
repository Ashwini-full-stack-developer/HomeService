import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



function UserLogin() {
  const [response, setResponse] = useState([]);
  const [userID, setuserid] = useState(null); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch("https://localhost:7281/api/Registraction/GetRegistractionInformation", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           
          },
        });

        if (!resp.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await resp.json();
        setResponse(data);
        console.log("Fetched Users:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respons = await fetch("https://localhost:7281/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email, password: password }),
      });

      if (!respons.ok) {
        alert("No user details found, please register");
        return;
      }

      const data = await respons.json();
      localStorage.setItem("token", data.token);

      alert("Login successful!");
      console.log(response)

      if (Array.isArray(response)) {
        const user = response.find((user) => user.userEmail === email);
         console.log("User found:", user); // Log the found user
        if (user) {
          setuserid(user.userID); // Set user ID state

          localStorage.setItem("userID", user.userID);
          localStorage.setItem("jobRole", user.jobRole);

          console.log(user.jobRole) // Store in localStorage

          switch (user.jobRole) {
            case 1:
              navigate("/userpage");
              break;
            case 2:
              navigate("/adminpage");
              break;
            case 3:
              navigate("/labourpage");
              break;
            default:
              alert("Unknown job role");
          }
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
  
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold text-center mb-4 ">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full  bg-yellow-500 text-gray-800 py-2 rounded-lg transition"
          >
            Login
          </button>
          <Link to="/registration">
            <label htmlFor="register" className="block text-center p-2 bg-yellow-500 text-black mt-2 cursor-pointer rounded-md">
              Signup?
            </label>
          </Link>
        </form>
      </div>

  );
}

export default UserLogin;
