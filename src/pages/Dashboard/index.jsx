import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetProducts, selectProducts } from "../../store/productsSlice";
import { APIProducts } from "../../apis/APIProducts";
import Swal from "sweetalert2";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateProducts = useSelector(selectProducts);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGetProducts());
  }, [dispatch]);

  //Pagination
  const productsPerPage = 5;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const totalPages = Math.ceil(stateProducts.data?.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Display Product
  const productsToDisplay = {
    data: stateProducts.data?.slice(startIndex, endIndex),
  };

  function detail(product) {
    navigate(`/product/${product.id}`, { state: { product } });
  }

  function edit(product) {
    navigate(`/edit-product/${product.id}`, { state: { product } });
  }

  return (
    <>
      {stateProducts?.status === "loading" && (
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
              {productsToDisplay.data?.map((product) => (
                <tr key={product.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                  <td
                    className="p-2 md:border md:border-grey-500 text-left block md:table-cell cursor-pointer hover:opacity-50"
                    onClick={() => detail(product)}
                  >
                    <span className="inline-block w-1/3 md:hidden font-bold">Name</span>
                    {product.carName}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Category</span>
                    {product.carCategory}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell w-[10rem]">
                    <span className="inline-block w-1/3 md:hidden font-bold">Image</span>
                    <img src={product.carImage} alt={product.alt} className="w-[10rem] h-20 object-contain" />
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Description</span>
                    {product.carDescription}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Price</span>
                    {product.carPrice}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                    <a className="font-medium text-blue-600 hover:underline mr-3 cursor-pointer" onClick={() => edit(product)}>
                      Edit
                    </a>
                    <a
                      className="font-medium text-red-600 hover:underline cursor-pointer"
                      // onClick={() => APIProducts.deleteProduct(product.id).then(() => navigate(0))}
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            APIProducts.deleteProduct(product.id);
                            Swal.fire({
                              icon: "success",
                              title: "Product Deleted Successfully",
                              showConfirmButton: false,
                              timer: 1500,
                            }).then(() => navigate(0));
                          }
                        });
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="relative pt-[2rem] right-[50%] transform translate-x-1/2">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
