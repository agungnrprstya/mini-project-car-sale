import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { shuffle } from "lodash";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts, selectProducts } from "../../store/productsSlice";

function LandingPage() {
  const stateProducts = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [dispatch]);

  // Clone the stateProducts object
  const shuffledProducts = { ...stateProducts };

  // Shuffle the data array within the cloned object
  shuffledProducts.data = shuffle(shuffledProducts.data);

  // Slice the first 4 shuffled products
  const displayedProducts = { ...shuffledProducts };
  displayedProducts.data = displayedProducts.data?.slice(0, 3);

  console.log(displayedProducts);

  return (
    <div className="flex flex-col min-h-screen justify-between">
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
    </div>
  );
}

export default LandingPage;
