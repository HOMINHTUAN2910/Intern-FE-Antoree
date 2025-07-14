"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Tất cả");

  const dropdownRef = useRef();

  const priceRanges = [
    { label: "Tất cả", min: 0, max: Infinity },
    { label: "Dưới 500.000₫", min: 0, max: 500000 },
    { label: "500.000₫ - 1.000.000₫", min: 500000, max: 1000000 },
    { label: "1.000.000₫ - 2.000.000₫", min: 1000000, max: 2000000 },
    { label: "Trên 2.000.000₫", min: 2000000, max: Infinity },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Lỗi:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (range) => {
    setSelectedRange(range.label);
    setShowDropdown(false);
    if (range.label === "Tất cả") {
      setFiltered(products);
    } else {
      const result = products.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
      setFiltered(result);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Tất cả sản phẩm
        </h1>

        {/* DROPDOWN */}
        <div className="relative mb-10 flex justify-center" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="px-6 py-2 bg-[#00df9a] text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all"
          >
            Lọc theo giá: {selectedRange}
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                className="absolute top-14 w-60 bg-white rounded-xl shadow-lg z-50 border"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {priceRanges.map((range) => (
                  <div
                    key={range.label}
                    onClick={() => handleSelect(range)}
                    className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                      selectedRange === range.label
                        ? "text-[#00df9a] font-medium"
                        : ""
                    }`}
                  >
                    {range.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* GRID */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-300 flex flex-col"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1 min-h-[48px]">
                  {product.description}
                </p>
                <p className="text-pink-600 font-bold mt-3">
                  {product.price.toLocaleString("vi-VN")}₫
                </p>
                <button className="mt-auto bg-[#00df9a] hover:bg-green-700 text-white py-2 rounded-xl transition-all cursor-pointer">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
