import React from "react";
import { APIAuth } from "../../apis/APIAuth";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";

const logout = async () => {
  await APIAuth.signOut();
};

const products = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$45",
  },
  {
    id: 2,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 3,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 4,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 5,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 6,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 7,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
];

const displayedProducts = products.slice(0, 4);

function LandingPage() {
  return (
    <>
      <Navbar logout={logout} />
      <Carousel />
      <div className="mx-auto w-full max-w-screen-xl flex justify-between">
        <h2 className="text-xl font-bold text-gray-900">Introducing Our Latest Product</h2>
        <Link to="/product">
          <h2 className="text-xl font-bold text-blue-500">View All</h2>
        </Link>
      </div>
      <ProductCard products={displayedProducts} />
      <Footer />
    </>
  );
}

export default LandingPage;
