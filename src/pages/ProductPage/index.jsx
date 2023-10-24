import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/Card";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/Filter";
import { initialProduct } from "../../data/productData";

function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  //Pagination
  const productsPerPage = 8;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const totalPages = Math.ceil(initialProduct.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //Product Filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredProducts = selectedCategory === "All" ? initialProduct : initialProduct.filter((product) => product.category === selectedCategory);

  //Display Product
  const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ProductCard product={productsToDisplay} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}

export default ProductPage;
