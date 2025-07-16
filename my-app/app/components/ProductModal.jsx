import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoClose
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold cursor-pointer"
          />
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-pink-600 font-bold text-lg mt-4">
            {product.price.toLocaleString("vi-VN")}₫
          </p>
          <button className="mt-4 w-full bg-[#00df9a] hover:bg-green-700 text-white py-2 rounded-xl transition-all cursor-pointer">
            <a href={`productDetail/${product.id}`}>Course details</a>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
