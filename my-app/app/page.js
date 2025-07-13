import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Card from "./components/Card";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <ProductList />
      <Card />
      <Footer />
    </div>
  );
}
