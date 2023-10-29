import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/Card";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts, selectProducts } from "../../store/productsSlice";

function ProductPage() {
  const dispatch = useDispatch();
  const stateProducts = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [dispatch]);

  //Pagination
  const productsPerPage = 8;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const totalPages = Math.ceil(stateProducts.data?.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Product Filter
  const handleCategoryChange = (carCategory) => {
    setSelectedCategory(carCategory);
    setCurrentPage(1);
  };

  // Display Product
  const data = { ...stateProducts }; // Clone the data object

  const filteredProducts =
    selectedCategory === "All"
      ? data
      : {
          ...data,
          data: data.data?.filter((product) => product.carCategory === selectedCategory),
        };
  const productsToDisplay = {
    ...filteredProducts,
    data: filteredProducts.data?.slice(startIndex, endIndex),
  };

  console.log(productsToDisplay);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ProductCard product={productsToDisplay} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </div>
  );
}

export default ProductPage;
