"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiFilter } from "react-icons/fi";
import { FaSortAmountDown } from "react-icons/fa";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState("Tất cả");
  const [sortOption, setSortOption] = useState("default");

  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const dropdownRef = useRef();

  const priceRanges = [
    { label: "Tất cả", min: 0, max: Infinity },
    { label: "Dưới 500.000₫", min: 0, max: 500000 },
    { label: "500.000₫ - 1.000.000₫", min: 500000, max: 1000000 },
    { label: "1.000.000₫ - 2.000.000₫", min: 1000000, max: 2000000 },
    { label: "Trên 2.000.000₫", min: 2000000, max: Infinity },
  ];

  const sortOptions = [
    { label: "Mặc định", value: "default" },
    { label: "Giá tăng dần", value: "price-asc" },
    { label: "Giá giảm dần", value: "price-desc" },
    { label: "Tên A-Z", value: "name-asc" },
    { label: "Tên Z-A", value: "name-desc" },
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

  const applyFilters = (search, sort, rangeLabel) => {
    let result = [...products];

    const range =
      priceRanges.find((r) => r.label === rangeLabel) || priceRanges[0];
    if (range.label !== "Tất cả") {
      result = result.filter(
        (p) => p.price >= range.min && p.price <= range.max
      );
    }

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFiltered(result);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, sortOption, selectedRange);
  };

  const handleSelectRange = (range) => {
    setSelectedRange(range.label);
    setShowPriceDropdown(false);
    applyFilters(searchQuery, sortOption, range.label);
  };

  const handleSelectSort = (value) => {
    setSortOption(value);
    setShowSortDropdown(false);
    applyFilters(searchQuery, value, selectedRange);
  };

  return (
    <div>
      <Navbar showSearch={true} onSearch={handleSearch} />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Tất cả sản phẩm
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Sidebar lọc */}
            <div className="lg:col-span-1 space-y-6">
              {/* Dropdown Lọc theo giá */}
              <div className="bg-white p-4 rounded-xl shadow-md relative">
                <button
                  onClick={() => setShowPriceDropdown((prev) => !prev)}
                  className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2 text-gray-700">
                    <FiFilter className="text-[#00df9a]" />
                    Lọc theo giá: {selectedRange}
                  </span>
                  <span>▾</span>
                </button>

                <AnimatePresence>
                  {showPriceDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute mt-2 left-0 right-0 bg-white rounded-xl shadow-lg z-50 border"
                    >
                      {priceRanges.map((range) => (
                        <div
                          key={range.label}
                          onClick={() => handleSelectRange(range)}
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

              {/* Dropdown Sắp xếp */}
              <div className="bg-white p-4 rounded-xl shadow-md relative">
                <button
                  onClick={() => setShowSortDropdown((prev) => !prev)}
                  className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="flex items-center gap-2 text-gray-700">
                    <FaSortAmountDown className="text-[#00df9a]" />
                    Sắp xếp:{" "}
                    {sortOptions.find((opt) => opt.value === sortOption)?.label}
                  </span>
                  <span>▾</span>
                </button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute mt-2 left-0 right-0 bg-white rounded-xl shadow-lg z-50 border"
                    >
                      {sortOptions.map((opt) => (
                        <div
                          key={opt.value}
                          onClick={() => handleSelectSort(opt.value)}
                          className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                            sortOption === opt.value
                              ? "text-[#00df9a] font-medium"
                              : ""
                          }`}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Lưới sản phẩm */}
            <div className="lg:col-span-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
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
      </div>
    </div>
  );
}
