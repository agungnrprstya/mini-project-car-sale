import React, { useState } from "react";
import { initialProduct } from "../../data/productData";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProduct);
  const itemsPerPage = 5; // Set the number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of products to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  function deleteProduct(product) {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${product.productName}?`);
    if (confirmDelete) {
      const updatedProducts = products.filter((p) => p.id !== product.id);
      setProducts(updatedProducts);
      navigate("/dashboard");
    }
  }

  function detail(product) {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  function edit(product) {
    navigate(`/edit-product/${product.id}`, { state: { product } });
  }

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="px-[2rem] min-h-screen w-screen">
        <div className="mt-[2rem] pb-4">
          <Link to="/add-product">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Add New Product
            </button>
          </Link>
        </div>
        <table className="h-auto w-full border-collapse md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Category</th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Image</th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Description</th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Price</th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {displayedProducts.map((product) => (
              <tr key={product.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                <td
                  className="p-2 md:border md:border-grey-500 text-left block md:table-cell cursor-pointer hover:opacity-50"
                  onClick={() => detail(product)}
                >
                  <span className="inline-block w-1/3 md:hidden font-bold">Name</span>
                  {product.productName}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">User Name</span>
                  {product.category}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Image</span>
                  <img src={product.url} alt={product.alt} className="w-[10rem] h-20 object-cover" />
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>
                  {product.alt}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>
                  {product.price}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                  <a className="font-medium text-blue-600 hover:underline mr-3 cursor-pointer" onClick={() => edit(product)}>
                    Edit
                  </a>
                  <a className="font-medium text-red-600 hover:underline cursor-pointer" onClick={() => deleteProduct(product)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="relative pt-[2rem] right-[50%] transform translate-x-1/2">
          <Pagination currentPage={currentPage} totalPages={Math.ceil(products.length / itemsPerPage)} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
