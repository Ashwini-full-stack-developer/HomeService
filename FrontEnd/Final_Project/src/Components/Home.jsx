import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from './Nothing';
import PetService from './PetService';
const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const images = [
    { id: 1, src: "/images/Home1.webp", alt: "Carpentry Service" },
    { id: 2, src: "/images/homerepairs.jpg", alt: "Home Repair" },
    { id: 3, src: "/images/Maintenance Work.jpg", alt: "Maintenance Work" },
    { id: 4, src: "/images/customwoods.jpg", alt: "Custom Woodworking" },
    { id: 5, src: "/images/homerenovation.jpg", alt: "Home Renovation" },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);
  // Add observer for reviews section animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setReviewsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      observer.observe(reviewsSection);
    }
    return () => {
      if (reviewsSection) {
        observer.unobserve(reviewsSection);
      }
    };
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    setShowLoginForm(false);
    setEmail('');
    setPassword('');
  };
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <>
     
    
     
      <div className="flex justify-center items-center py-12 bg-white">
  <div className="flex flex-col md:flex-row max-w-6xl w-full shadow-lg">
    {/* Image Section */}
    <div className="w-full md:w-3/4 h-64 md:h-auto">
      <img
        src="/images/Home1.webp"
        alt="Home Repair"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Content Section */}
    <div className="w-full md:w-2/5 bg-yellow-500 flex flex-col justify-center items-center p-6 md:p-12">
      <h1 className="text-2xl md:text-3xl font-bold text-black text-center leading-snug mb-6">
        YOUR HOME<br />
        REPAIR<br />
        SOLUTION.
      </h1>
     <Link to ="userlogin"> <button className="bg-black text-white px-6 py-3 uppercase tracking-wider hover:bg-gray-800 transition">
        Book Online
      </button></Link>
    </div>
  </div>
</div>

      <div className="bg-yellow-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl text-yellow-700 tracking-widest mb-10">SERVICES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4">CARPENTRY</h3>
              <p className="text-gray-700">
                Woodworking is my first trade. I have worked on numerous projects,
                from homes to businesses. Please view my portfolio for all my work.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">REPAIR</h3>
              <p className="text-gray-700 mb-6">
                Is Google not giving you the answers that you need? Whether it's a
                light fixture, runny toilet or worn-down appliance, I have you covered.
              </p>
              <Link to ="/userlogin"><button className="bg-yellow-400 text-black font-bold px-6 py-2 hover:bg-yellow-500">
                BOOK NOW
              </button></Link>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">MAINTENANCE</h3>
              <p className="text-gray-700">
                Don't risk further damaging your home with letting yearly maintenance
                fall by the wayside. Schedule a free consultation now!
              </p>
            </div>
          </div>
          
          {/* <ServiceCard/> */}
          {/* <PetService/> */}

          <div id="reviews-section" className="mt-20">
            <h2 className="text-xl text-yellow-700 tracking-widest mb-10 text-center">REVIEWS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`bg-yellow-100 p-6 rounded-lg shadow-md transform transition-all duration-700 ${reviewsVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`}
                style={{ transitionDelay: '100ms' }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-500 text-black rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Honey-do Help</h3>
                </div>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="text-gray-700 italic">
                    "I always use these guys for my honey-do list. The get it done right and on time so I don't have to worry about it!"
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Cat L - 2/19/2019</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`bg-yellow-100 p-6 rounded-lg shadow-md transform transition-all duration-700 ${reviewsVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`}
                style={{ transitionDelay: '300ms' }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-500 text-black rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Help With A Build</h3>
                </div>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="text-gray-700 italic">
                    "I installed the electrical on my new addition, but it just wasn't right. Called these guys out and it was fixed in two hours!"
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Jarrod J - 4/8/2019</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={`bg-yellow-100 p-6 rounded-lg shadow-md transform transition-all duration-700 ${reviewsVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                  }`}
                style={{ transitionDelay: '500ms' }}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-yellow-500 text-black rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Fair and Fastidious</h3>
                </div>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <p className="text-gray-700 italic">
                    "Starting with the free consult, this is one company you can trust with whatever you need! Customer for life!"
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Anonymous</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;