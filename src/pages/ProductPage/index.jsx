import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";

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
  {
    id: 8,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 9,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 10,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
  {
    id: 11,
    url: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    alt: "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    productName: "Earthen Bottle",
    price: "$48",
  },
];

const productsPerPage = 8;

function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // Get the products to display on the current page
  const productsToDisplay = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Navbar />
      <ProductCard products={productsToDisplay} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}

export default ProductPage;
