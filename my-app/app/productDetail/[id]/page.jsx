"use client";

import {
  FaStar,
  FaChevronUp,
  FaChevronDown,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaRegHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoLogoPinterest } from "react-icons/io5";
import axios from "axios";

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const path = window.location.pathname;
        const segments = path.split("/");
        const id = segments[segments.length - 1];
        const res = await fetch(`http://localhost:3000/product?id=${id}`);
        const data = await res.json();
        setProduct(data);
        console.log(data[0].name);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-10 font-['Poppins']">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col items-center">
          <img
            src={`../../../${product[0].image}`}
            // src="../../../"
            alt={product[0].name}
            className="w-full h-[450px] object-cover rounded-xl"
          />

          {/* <div className="mt-6 grid grid-cols-4 gap-3">
            <img
              src={product[0].image}
              className="w-20 h-20 object-cover rounded border hover:border-green-600"
              alt=""
            />
          </div> */}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold text-gray-800">
                {product[0].name}
              </h1>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                In Stock
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-2">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className="ml-2">4 Reviews</span>
              <span className="mx-2">|</span>
              <span>SKU: 251594</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <p className="text-gray-400 line-through text-lg">100.000d</p>
              <p className="text-green-600 text-2xl font-bold">
                {product[0].price.toLocaleString("vi-VN")}₫
              </p>
              <span className="bg-red-100 text-red-500 text-sm px-3 py-1 rounded-full">
                64% Off
              </span>
            </div>

            <p className="mt-5 text-gray-600 text-sm leading-relaxed">
              {product[0].description ?? "No description provided."}
            </p>

            <div className="mt-6 flex items-center gap-6">
              <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all">
                <FaShoppingBag />
                Add to Cart
              </button>

              <button className="text-red-500 hover:text-red-700 text-xl">
                <FaRegHeart />
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-700 space-y-1">
              <div>
                <span className="font-medium">Category:</span>{" "}
                <span className="text-gray-500">IELTS</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="font-medium">Tags:</span>
                <span className="text-gray-500">Fast</span>
                <span className="text-gray-500">Quick Learn</span>
                <span className="text-gray-500 underline">Flexiable</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4 items-center">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <div className="flex gap-3 text-white">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"
                >
                  <IoLogoPinterest />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
        <div className="flex gap-6 border-b border-gray-200">
          <button
            className={`pb-3 text-sm font-semibold ${
              activeTab === "description"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Thông tin sản phẩm
          </button>
          <button
            className={`pb-3 text-sm font-semibold ${
              activeTab === "reviews"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá
          </button>
          <button
            className={`pb-3 text-sm font-semibold ${
              activeTab === "related"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("related")}
          >
            Gợi ý sản phẩm
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description ??
                "Không có mô tả sản phẩm. Đây là nơi hiển thị chi tiết, thành phần, nguồn gốc hoặc hướng dẫn sử dụng..."}
            </p>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              <div className="border p-4 rounded">
                <p className="text-sm font-semibold text-gray-800">
                  Nguyễn Văn A
                </p>
                <p className="text-xs text-gray-500 mb-1">★★★★★</p>
                <p className="text-sm text-gray-600">
                  Sản phẩm rất tốt, rau tươi và đóng gói kỹ lưỡng. Giao hàng
                  nhanh.
                </p>
              </div>
              <div className="border p-4 rounded">
                <p className="text-sm font-semibold text-gray-800">
                  Trần Thị B
                </p>
                <p className="text-xs text-gray-500 mb-1">★★★★☆</p>
                <p className="text-sm text-gray-600">
                  Hàng đúng mô tả, nhưng hơi ít hơn mong đợi.
                </p>
              </div>
            </div>
          )}

          {activeTab === "related" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="border p-3 rounded hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt="related"
                    className="h-40 w-full object-cover rounded"
                  />
                  <h3 className="mt-3 text-sm font-semibold text-gray-800">
                    Sản phẩm {n}
                  </h3>
                  <p className="text-sm text-green-600 font-bold">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
