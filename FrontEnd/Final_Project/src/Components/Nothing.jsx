import React from "react";

export default function ServiceCard() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl rounded-2xl flex flex-col md:flex-row justify-center items-center bg-yellow-100 overflow-hidden shadow-lg">
        {/* Image Section */}
        <div className="w-full md:w-2/3 h-64 md:h-[80%]">
          <img
            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            src="/images/Shifting.jpg"
            alt="Shifting"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/3 bg-white p-6 md:p-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Assembly</h2>
          <ul className="text-gray-700 text-base md:text-lg space-y-3">
            <li>✔ Assemble or disassemble furniture items by unboxing, building, and any cleanup.</li>
            <li>✔ Now Trending: Curved sofas, computer desks, and sustainable materials.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
