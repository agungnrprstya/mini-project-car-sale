import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  function detail(product) {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  return (
    <>
      {product?.status === "loading" && (
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div className="flex items-center">
            <span className="text-3xl mr-4">Loading</span>
            <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <div className="mx-auto w-full max-w-screen-xl pb-[3rem] mb-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
            {product.data?.map((product, index) => (
              <div
                className="cursor-pointer bg-gray-100 rounded-lg shadow-lg p-8 h-full w-full hover:bg-gray-200 hover:scale-105 transition duration-500"
                key={`${product.id}_${index}`}
              >
                <div className="relative overflow-hidden group-hover:opacity-75 rounded-lg  ">
                  <img className="object-contain bg-gray-500 h-full w-full lg:h-48 lg:w-full object-center" src={product.carImage} alt="Product" />
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">{product.carName}</h3>
                <p className="text-gray-500 text-sm mt-2">{product.alt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-red-500 font-bold text-lg">${product.carPrice}</span>
                  <button onClick={() => detail(product)} className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
