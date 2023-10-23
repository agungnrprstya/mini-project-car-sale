import React from "react";

function ProductList({ displayedProducts }) {
  return (
    <>
      <div className="cursor-pointer mx-auto w-full max-w-screen-xl pb-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-5">
            {displayedProducts.map((product, index) => (
              <div
                className="bg-gray-100 rounded-lg shadow-lg p-8 h-full w-full hover:bg-gray-200 hover:scale-105 transition duration-500"
                key={index}
              >
                <div className=" relative overflow-hidden group-hover:opacity-75 rounded-lg  ">
                  <img className="object-cover h-64 w-64 object-center" src={product.url} alt="Product" />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">{product.productName}</h3>
                <p className="text-gray-500 text-sm mt-2">{product.alt}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-900 font-bold text-lg">{product.price}</span>
                  <button className="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Detail</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductList;
