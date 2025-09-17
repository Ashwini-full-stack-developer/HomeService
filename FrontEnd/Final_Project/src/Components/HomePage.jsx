import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import ServiceCard from './Nothing';
import Home from "./Home";
import PetService from "./PetService";

const images = [
  "/images/clean.jpg",
  "/images/cleaning.jpg",
  "/images/plumbing.jpg",
  "/images/Shifting.jpg",
  "/images/electric.jpg",
];

const HomePage = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/images/Animation - 1743057248114.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div className="w-full min-h-screen relative">
    

      {/* Hero Section with Background Slider */}
      <div className="w-full h-[90vh] relative">  {/* Add padding for fixed navbar */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
    
          loop={true}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overlay Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-6 bg-black/50 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">
            Better Care, Better Service
          </h1>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl">
            Because your home deserves the best! Experience top-notch home services at your convenience.
          </p>
         <Link to ="/userlogin"><button className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-md text-lg hover:bg-yellow-700 transition">
            Get Started
          </button></Link> 
        </div>
      </div>

      {/* Lottie Animation Section */}
      <div className="w-full flex justify-center items-center mt-8">
        {animationData ? (
          <div className="w-12 h-10">
            <Lottie animationData={animationData} loop={true} />
          </div>
        ) : (
          <p>Loading animation...</p>
        )}
      </div>

      {/* Additional Sections */}
      <ServiceCard />
      <PetService/>
      <Home/>
     
      
      
    </div>
  );
};

export default HomePage;
