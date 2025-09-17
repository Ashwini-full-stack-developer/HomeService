import React, { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("All fields are required!");
      return;
    }

    // Simulating form submission (replace with actual API call)
    setTimeout(() => {
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

      <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
        <input type="hidden" name="access_key" value="605c373d-3703-4314-8a17-9beec00e31c1" />
        
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full  m-2  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full  m-2  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message"
            rows="4"
            className="w-full  m-2  px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-600 text-black font py-2 rounded-md hover:bg-yellow-700 transition"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
