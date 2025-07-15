"use client";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import React, { useEffect, useState } from "react";

export default function Navbar({ showSearch = false, onSearch }) {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full z-50 transition duration-300 ${
        scrolled
          ? "bg-black backdrop-blur-md shadow-md text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center h-14 max-w-[1240px] mx-auto px-3">
        <h1 className="text-3xl font-bold text-[#00df9a]">HMT</h1>
            {/* {showSearch && (
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-72 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
          />
        )} */}
        <ul className="hidden md:flex">
          <li className="p-4 cursor-pointer">Home</li>
          <li className="p-4 cursor-pointer">Teachers</li>
          <li className="p-4 cursor-pointer">Community</li>
          <li className="p-4 cursor-pointer">About</li>
          <li className="p-4 cursor-pointer">Student Reviews</li>
        </ul>
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
    
        <ul
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
              : "fixed left-[-100%] top-0 ease-in-out duration-500"
          }
        >
          <h1 className="text-3xl font-bold text-[#00df9a] m-4">HMT</h1>
          <li className="p-4 border-b border-gray-600">Home</li>
          <li className="p-4 border-b border-gray-600">Company</li>
          <li className="p-4 border-b border-gray-600">Resources</li>
          <li className="p-4 border-b border-gray-600">About</li>
          <li className="p-4">Contact</li>
        </ul>
      </div>
    </div>
  );
}
