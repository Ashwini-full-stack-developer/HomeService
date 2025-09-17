import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const resp = await fetch("https://localhost:7281/api/Registraction/GetRegistractionInformation");
        if (!resp.ok) throw new Error("Failed to fetch users");

        const data = await resp.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("https://localhost:7281/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email, password }),
      });

      if (!resp.ok) {
        alert("Login failed. Please check credentials.");
        return;
      }

      const loginData = await resp.json();
      const matchedUser = users.find((user) => user.userEmail === email);

      if (!matchedUser) {
        alert("User not found in registration data.");
        return;
      }

      localStorage.setItem("userID", matchedUser.userID);
      localStorage.setItem("admintoken", loginData.token);
      localStorage.setItem("adminjobRole", matchedUser.jobRole);

      if (matchedUser.jobRole === 2) {
        alert("Login successful!");
        navigate("/adminpage");
      } else {
        alert("Access denied. Not an admin.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            value={email}
            placeholder="Enter Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1 text-sm sm:text-base">
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="Enter Admin Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition text-base sm:text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
