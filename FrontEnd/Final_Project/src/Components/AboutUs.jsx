import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="min-h-screen bg-black bg-cover bg-center flex items-center justify-center px-4 sm:px-6 md:px-10 py-10">
      <div className="bg-black bg-opacity-80 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 max-w-5xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">About Us</h1>

        <p className="text-white text-base sm:text-lg mb-4">
          Welcome to our website! We are passionate about providing excellent services and building innovative solutions.
        </p>

        <p className="text-white text-base sm:text-lg mb-4">
          This is your one-step solution to all your home-based service requirements. It has become a pioneer in the home service marketplace in Davanagere,
          by providing hassle-free home services to both professionals as well as consumers. We’ve found this platform for the entire town to get linked
          with diverse service providers.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 mt-6">Our Vision</h2>
        <p className="text-white text-base sm:text-lg mb-4">
          We have technology that simplifies the process of finding the right professional service as per our customers' needs.
          It is designed to reach a step ahead and enable the users to find and hire just the right professional fit for their job.
        </p>

        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2 mt-6">Our Mission</h2>
        <p className="text-white text-base sm:text-lg mb-4">
          Our mission is to provide the best services to thousands of Davanageriens in the most feasible and affordable manner.
          We aim to empower and authorize thousands of our service professionals and make them self-sustaining. For the same purpose,
          we provide related training to all our professionals before they start serving our valued customers.
          <br />
          We facilitate you with the technicians or service experts closest to your residence and available at your requested time slot.
        </p>

        <Link to="/contactpage">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-300 hover:text-white mt-6 underline text-center">
            Contact Us
          </h2>
        </Link>
      </div>
    </div>
  );
}

export default AboutUs;
