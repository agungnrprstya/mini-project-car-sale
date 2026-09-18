import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductCard from "../../components/Card";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts, selectProducts } from "../../store/productsSlice";

const PRODUCTS_PER_PAGE = 9;

function ProductPage() {
  const dispatch = useDispatch();
  const stateProducts = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const data = stateProducts.data ?? [];
    return selectedCategory === "All" ? data : data.filter((product) => product.carCategory === selectedCategory);
  }, [stateProducts.data, selectedCategory]);

  // Jumlah halaman ikut hasil filter, bukan seluruh data, supaya halaman kosong
  // tidak muncul saat kategori dipersempit.
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const activePage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;
  const startIndex = (activePage - 1) * PRODUCTS_PER_PAGE;
  const productsToDisplay = {
    ...stateProducts,
    data: filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE),
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const isLoaded = stateProducts.status === "success";
  const emptyMessage =
    isLoaded && filteredProducts.length === 0
      ? selectedCategory === "All"
        ? "No cars are listed yet."
        : `No ${selectedCategory} cars are listed right now.`
      : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="shell py-12 lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-paper-line pb-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">All cars</h1>
              {isLoaded && (
                <p className="mt-2 text-sm text-ink-mute">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "car" : "cars"}
                  {selectedCategory === "All" ? "" : ` in ${selectedCategory}`}
                </p>
              )}
            </div>
            <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
          </div>
          <h2 className="sr-only">Listings</h2>
          <div className="mt-8">
            <ProductCard product={productsToDisplay} emptyMessage={emptyMessage} />
          </div>
          {isLoaded && totalPages > 1 && <Pagination currentPage={activePage} totalPages={totalPages} onPageChange={handlePageChange} />}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
