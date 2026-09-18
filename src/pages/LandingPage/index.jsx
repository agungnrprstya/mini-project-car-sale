import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { shuffle } from "lodash";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts, selectProducts } from "../../store/productsSlice";

const RECOMMENDATION_COUNT = 3;

function LandingPage() {
  const stateProducts = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [dispatch]);

  // Diacak sekali per perubahan data, bukan tiap render, supaya urutan rekomendasi
  // tidak berubah saat komponen re-render karena hal lain.
  const recommendations = useMemo(
    () => shuffle(stateProducts.data ?? []).slice(0, RECOMMENDATION_COUNT),
    [stateProducts.data]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="shell grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="lg:col-span-5">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Cars for sale</h1>
            <p className="mt-4 text-base text-ink-soft">
              Bandar Mobil lists every car with the photo, the category, and the price. Open the catalog to filter by body type and read the
              full description.
            </p>
            <Link
              to="/product"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-signal px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-signal-strong"
            >
              Browse all cars
            </Link>
          </div>
          <div className="lg:col-span-7">
            <Carousel />
          </div>
        </section>

        <section className="shell pb-12 lg:pb-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-paper-line pb-4">
            <h2 className="text-xl font-semibold text-ink">Our Recommendation</h2>
            <Link
              to="/product"
              className="text-sm font-medium text-ink-soft underline decoration-ink-mute underline-offset-4 transition-colors duration-200 hover:text-ink"
            >
              View all cars
            </Link>
          </div>
          <div className="mt-8">
            <ProductCard product={{ ...stateProducts, data: recommendations }} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
