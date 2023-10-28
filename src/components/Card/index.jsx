import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  function detail(product) {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl pb-[3rem] mb-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-5">
            {product.data.map((product, index) => (
              <div
                className="cursor-pointer bg-gray-100 rounded-lg shadow-lg p-8 h-full w-full hover:bg-gray-200 hover:scale-105 transition duration-500"
                key={`${product.id}_${index}`}
              >
                <div className="relative overflow-hidden group-hover:opacity-75 rounded-lg  ">
                  <img className="object-contain bg-blue-100 h-full w-full lg:h-64 lg:w-64 object-center" src={product.carImage} alt="Product" />
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">{product.carName}</h3>
                <p className="text-gray-500 text-sm mt-2">{product.alt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-900 font-bold text-lg">{product.price}</span>
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
