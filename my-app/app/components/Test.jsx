{products.length > 4 && (
        <div className="mt-10 text-center">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-[#00df9a] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll ? "Thu gọn" : "Xem thêm sản phẩm"}
          </motion.button>
        </div>
      )}
