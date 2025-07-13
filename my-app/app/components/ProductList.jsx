const products = [
  {
    id: 1,
    name: "Tai nghe không dây",
    description: "Chất lượng âm thanh tuyệt vời, thời lượng pin 12h.",
    price: 1290000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Chuột gaming RGB",
    description: "Thiết kế công thái học, DPI lên đến 12000.",
    price: 890000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Bàn phím cơ",
    description: "Switch đỏ, gõ êm tay, có đèn nền RGB.",
    price: 1450000,
    image: "https://via.placeholder.com/150",
  },
    {
    id: 3,
    name: "Bàn phím cơ",
    description: "Switch đỏ, gõ êm tay, có đèn nền RGB.",
    price: 1450000,
    image: "https://via.placeholder.com/150",
  },
];

export default function ProductList() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🌟 Sản phẩm nổi bật
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
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
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
