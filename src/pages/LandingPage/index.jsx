import React from "react";
import { initialProduct } from "../../data/productData";
import { Link } from "react-router-dom";
import { shuffle } from "lodash";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/Card";

const getRandomProducts = () => {
  const shuffledProducts = shuffle(initialProduct);
  return shuffledProducts.slice(0, 4);
};

// Call the function to get the random products
const displayedProducts = getRandomProducts();

function LandingPage() {
  return (
    <>
      <Navbar />
      <Carousel />
      <div className="mx-auto w-full max-w-screen-xl flex justify-between">
        <h2 className="text-xl font-bold text-gray-900">Our Recommendation</h2>
        <Link to="/product">
          <h2 className="text-xl font-bold text-blue-500">View All</h2>
        </Link>
      </div>
      <ProductCard product={displayedProducts} />
      <Footer />
    </>
  );
}

export default LandingPage;
