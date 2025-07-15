"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductModal from "./ProductModal";
import { motion } from "framer-motion";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Featured Products
      </h1>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-3 cursor-pointer my-5">
            <div
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 flex flex-col h-full"
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
                  Course details
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="mt-10 text-center">
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-[#00df9a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/productPage">View More</a>
        </motion.button>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
