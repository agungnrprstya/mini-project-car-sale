import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetProductById, selectProduct } from "../../store/productSlice";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Detail from "../../components/Detail";

function DetailProduct() {
  const { id } = useParams();
  // const id = "2rAEdn3VAyYRiHqIy8PG";
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);

  useEffect(() => {
    dispatch(fetchGetProductById(id));
  }, [dispatch, id]);

  console.log(product);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Detail product={product.data} />
      <Footer />
    </div>
  );
}

export default DetailProduct;
