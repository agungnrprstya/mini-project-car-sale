import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Detail from "../../components/Detail";
function DetailProduct() {
  const location = useLocation();
  const product = location.state.product;

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Detail product={product} />
      <Footer />
    </div>
  );
}

export default DetailProduct;
