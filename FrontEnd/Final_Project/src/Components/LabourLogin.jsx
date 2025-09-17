    import React, { useState, useEffect } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";

    const API_GET = "https://localhost:7281/api/Labour/getall";
    const API_POST = "https://localhost:7281/api/Labour/insert";

    // const workRoles = ["Home Maintanence", "Cleaning", "Home applaience Repair","Health Beauty Fitness", "Event Managment"];
    const workRoles = ["Plumbing", "Electrical", "Painting","House Cleaning", "Home Maintanence","Pest Control","Smart Home Installation","Landscaping","Roofing","Flooring","Home Salon","Senior Care","Pet Care","Londry","Home Fitness Training","Cooking Services","Event Decoraters","Home Shifting","Carpenter","Smart security Providers"];


    const LoginRegister = () => {

        const [userid, setuserid] = useState(null);
        const [users, setUsers] = useState([]);
        const [labour, setlabour] = useState([]);
        const [isRegister, setIsRegister] = useState(false);
        const[isloggedin,setisloggedin]=useState(false);
        const [formData, setFormData] = useState({
            email: "",
            pass: "",
            name: "",
            phoneNO: "",
            work: "",
            jobrole:"Labour",
            LabourID:""
        });
        const navigate = useNavigate();

        useEffect(() => {
            axios.get(API_GET)
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
        }, []);

        useEffect(() => {
            const user1 = users.find((user) => user.jobrole === "Labour");
            setlabour(user1);
        }, [users]);

                

        

        const  handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        async function handleLogin(e) {

            e.preventDefault();
        

    try{
        const response = await fetch("https://localhost:7281/api/auth/labourlogin", {
            method:'POST',
            headers:{"Content-Type":"application/json"},body:JSON.stringify({
                userEmail: formData.email,
                password: formData.pass
            })  
        }
        )
        const data = await response.json();

        localStorage.setItem("labourtoken", data.token);
      
        console.log(data)
    
    }
    catch(error){
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
        return;
    }
            

    


        if (Array.isArray(users)) {
            const user = users.find((user) => user.email === formData.email);
            
            if (user) {
            setuserid(user.LabourID); // Set user ID state
            
            localStorage.setItem("labourid", user.LabourID);
            localStorage.setItem("labouremail", user.email);
            // Store in localStorage

                
            localStorage.setItem("labourrole", labour.jobrole);
            console.log(labour.jobrole)
            switch (labour.jobrole) {
                case 1:alert("No labour details found");
                break;
                case 2:
                    alert("No labour details found");
                break;
                case "Labour":    setisloggedin(true);
                alert("Login successfull!");
                navigate("/labourhome");
                break;
            
                default:
                alert("No labour details found");
                break;
            }
            }
        }
        } 
        
    async function handleRegister(e) {
        e.preventDefault();
        console.log(formData)

        const response = await fetch(API_POST,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            
        },
        body: JSON.stringify(formData),})
    const resp = await response.text();
    alert(resp)
    setIsRegister(false)

        

            
    }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
            
                <div className="bg-white p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center mb-4">
                        {isRegister ? "Register" : "Login"}
                    </h2>

                    {!isRegister && (
                        <form onSubmit={handleLogin}>
                            <input type="email" name="email" placeholder="Email" required
                                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onChange={handleChange} />
                            <input type="password" name="pass" placeholder="Password" required
                                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onChange={handleChange} />
                            <button type="submit"
                                className="w-full bg-yellow-500 text-black  p-2 rounded">
                                Login
                            </button>
                            <p className="mt-3 text-center">
                                Don't have an account?{" "}
                                <span className="text-black-500 cursor-pointer"
                                    onClick={() => setIsRegister(true)}>Register</span>
                            </p>
                        </form>
                    )}

                    {isRegister && (
                        <form onSubmit={handleRegister}>
                            <input type="text" name="name" placeholder="Full Name" required
                                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onChange={handleChange} />
                            <input type="email" name="email" placeholder="Email" required
                                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onChange={handleChange} />
                            <input type="password" name="pass" placeholder="Password (max 8 chars)" required
                                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                maxLength="8" onChange={handleChange} />
                            <input type="text" name="phoneNO" placeholder="Phone No" required
                                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onChange={handleChange} />

                    
                            <select name="work" required
                                className="w-full p-2 border rounded mb-2"
                                onChange={handleChange}>
                                <option value="">Select Work Role</option>
                                {workRoles.map((role, index) => (
                                    <option key={index} value={role}>{role}</option>
                                ))}
                            </select>

                            <button type="submit"
                                className="w-full bg-yellow-500 text-black p-2 rounded">
                                Register
                            </button>
                            <p className="mt-3 text-center">
                                Already have an account?{" "}
                                <span className="text-yellow-500 cursor-pointer"
                                    onClick={() => setIsRegister(false)}>Login</span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        )};

    export default LoginRegister;
