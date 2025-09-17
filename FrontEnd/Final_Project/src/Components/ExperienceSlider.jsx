import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay } from "swiper/modules";

const experiences = [
  { name: "Camping", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/camping.png" },
  { name: "Workshop", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/market.png" },
  { name: "Theatre", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/cinema.png" },
  { name: "Business Conclave", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/training.png" },
  { name: "Flea Market", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/market.png" },
  { name: "Music Festival", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/music%20(1).png" },
  { name: "Violin Classes", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/violin%20(1).png" },
  { name: "Home & Garden", img: "https://d2dgt4tr79mk87.cloudfront.net/dealcategory/home-new.png" }
];

export default function ExperienceSlider() {
  return (
    <div className="py-10 px-4 w-full max-w-screen-xl mx-auto bg-[url('\images\Gemini.jpg')]">
      <h2 className="text-3xl font-bold mb-4">EXPERIENCE ZONE</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={15}
        freeMode={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        modules={[FreeMode, Autoplay]} 
        className="w-full"
      >
        {experiences.map((exp, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <div className="w-24 h-24 p-4 shadow-lg rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-yellow-300">
              <img src={exp.img} alt={exp.name} className="w-full h-auto max-w-[80px] transition-opacity duration-300 hover:opacity-80" />
            </div>
            <p className="text-sm mt-2">{exp.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
