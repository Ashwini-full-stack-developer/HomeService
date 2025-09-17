
import { Link } from "react-router-dom";
import React, { useEffect,useState } from "react";




export default function UserBillForm() {
  const [data,setdata]=useState([]);
  const userID = "";

useEffect(() => { 
  async function fetchdata() {

    const response = await fetch("https://localhost:7281/api/Address/GetAllLocations", {
      method: "GET",
      headers: {

        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    setdata(data);

   


  }
  fetchdata();
}, []);

  
    const [location, setLocation] = useState({
      AddressId: "",
        userId: "",
        latitude: "",
        longitude: "",
        city: "",
        area: "",
        ward: "",
        landmark: "",
        street: "",
        fullAddress: ""
    });

    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const API_KEY = "-YhDbfNafIskIuNvIwxROK-QzrdRjwHdJBTtjL893Qg"; 
    useEffect(() => {
      const storedUserID = localStorage.getItem("userID");
      if (userID) {
        setLocation((prev) => ({ ...prev, userId: userID }));
      } else if (storedUserID) {
        setLocation((prev) => ({ ...prev, userId: storedUserID }));
      }
    }, [userID]);
    const getAddress = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${API_KEY}`
            );
            const data = await response.json();

            if (data.items.length > 0) {
                const addr = data.items[0].address;

                setLocation((prev) => ({
                    ...prev,
                    latitude,
                    longitude,
                    fullAddress: `${addr.label || "Unknown location"}`,
                    city: addr.city || "",
                    area: addr.district || "",
                    ward: addr.county || "",
                    landmark: addr.houseNumber || "",
                    street: addr.street || ""
                }));

                setShowModal(true);
            } else {
                setError("No address found.");
            }
        } catch {
            setError("Could not fetch address.");
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        setError("");
        setLoading(true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords;
                    setLocation((prev) => ({ ...prev, latitude: latitude.toString(), longitude: longitude.toString() }));
                    getAddress(latitude, longitude);
                    console.log(latitude,longitude)
                },
                () => {
                    setError("Location access denied.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation not supported.");
            setLoading(false);
        }
    };

    const saveLocationToDB = async () => {
        if (!location.userId || !location.fullAddress) {
            setError("User ID and Full Address are required.");
            return;
        }

        try {
            const response = await fetch("https://localhost:7281/api/Address/SaveFull", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
            
                    userId: location.userId,              
                     Addressid: location.AddressId,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    city: location.city,
                    area: location.area,
                    ward: location.ward,
                    landmark: location.landmark,
                    street: location.street,
                    fullAddress: location.fullAddress
                }),
            });
             
            const result = await response.json();
            console.log(location)
            console.log("Server Response:", result);
            alert("Location saved successfully!");
        } catch (error) {
            console.error("Error saving location:", error);
            setError("Failed to save location.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg ">
{              console.log("Fetched Users:", data)}
            <h2 className="text-xl font-semibold mb-4">Enter Your Location</h2>


            <label className="block mb-2">User ID:</label>
            <input
                className="border p-2 rounded w-full"
                type="number"
                value={location.userId}
                onChange={(e) => setLocation({ ...location, userId: e.target.value })}
                placeholder="Enter your User ID"
            />


            <label className="block mt-4 mb-2">Full Address:</label>
            <input
                className="border p-2 rounded w-full"
                type="text"
                value={location.fullAddress}
                onChange={(e) => setLocation({ ...location, fullAddress: e.target.value })}
                placeholder="Enter address manually or use GPS"
            />


            <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={getLocation} disabled={loading}>
                    {loading ? "Fetching..." : "Get Current Location"}
                </button>
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveLocationToDB} disabled={!location.userId || !location.fullAddress}>
                    Save Location
                </button>
            </div>


            {error && <p className="text-red-500 mt-2">{error}</p>}


            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
                        <h2 className="text-lg font-bold mb-2">Location Found 📍</h2>
                        <p className="mb-4">{location.fullAddress}</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
              Confirm Address
                        </button>
                      
                    </div>
                  
                </div>

            )}
              
              <div className="mt-8 flex justify-start">
    <Link to="/billgeneration" className="bg-blue-500 rounded text-white py-1 px-2 text-lg">
        Next
    </Link>
</div>


            
                
         
    
        </div>
    );
}
