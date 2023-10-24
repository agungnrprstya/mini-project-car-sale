import React from "react";
import { useLocation } from "react-router-dom";

function DetailProduct() {
  const location = useLocation();
  const product = location.state.product;

  return (
    <>
      <h1>Detail Product</h1>
      <p>ID Produk: {product.id}</p>
      <p>Nama Produk: {product.productName}</p>
    </>
  );
}

export default DetailProduct;
