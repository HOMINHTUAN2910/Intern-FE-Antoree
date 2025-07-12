import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Card from "./components/Card";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Card />
      <Footer />
    </div>
  );
}
