"use client";
import { ReactTyped } from "react-typed";
export default function Hero() {
  return (
    <div className="text-white bg-black mt-30">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] font-bold p-2">
          Find the best English teacher
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Find the best English
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-5xl sm:text-4xl text-xl font-bold py-4">
            Trust the nation's largest network for
            <ReactTyped
              className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
              strings={["English", "Japanese", "German"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
            tutor
          </p>
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Track your learning progress and boost your results with our
          intelligent language tools.
        </p>
        <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black cursor-pointer">
          Get Started
        </button>
      </div>
    </div>
  );
}
