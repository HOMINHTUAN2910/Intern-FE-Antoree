"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        const uniqueCategories = [
          "Tất cả",
          ...new Set(res.data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "Tất cả") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === category));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Tất cả sản phẩm
          </h1>

          {/* FILTER */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`px-4 py-2 rounded-full border ${
                  selectedCategory === cat
                    ? "bg-[#00df9a] text-white border-[#00df9a]"
                    : "bg-white text-gray-800 border-gray-300"
                } transition-all shadow-sm hover:shadow-md`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* PRODUCT GRID */}
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
    </div>
  );
}
