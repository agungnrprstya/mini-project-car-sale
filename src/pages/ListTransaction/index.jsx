import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetInvoices, selectInvoices } from "../../store/invoicesSlice";
import { APIInvoices } from "../../apis/APIInvoices";
import Swal from "sweetalert2";

function ListTransaction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateInvoices = useSelector(selectInvoices);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGetInvoices());
  }, [dispatch]);

  //Pagination
  const invoicesPerPage = 12;
  const startIndex = (currentPage - 1) * invoicesPerPage;
  const endIndex = startIndex + invoicesPerPage;
  const totalPages = Math.ceil(stateInvoices.data?.length / invoicesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Display Product
  const invoicesToDisplay = {
    data: stateInvoices.data?.slice(startIndex, endIndex),
  };

  return (
    <>
      {stateInvoices?.status === "loading" && (
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
        <div className="px-[2rem] pt-[2rem] min-h-screen w-screen flex flex-col justify-between">
          <table className="h-auto w-full border-collapse md:table">
            <thead className="block md:table-header-group">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Car Name</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Price</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Customer Name</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Phone Number</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Address</th>
                <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Action</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {invoicesToDisplay.data?.map((transaction) => (
                <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row" key={transaction.id}>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Car Name</span>
                    {transaction.carName}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Price</span>
                    {transaction.carPrice}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Customer Name</span>
                    {transaction.name}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Email</span>
                    {transaction.email}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Phone Number</span>
                    {transaction.phoneNumber}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Address</span>
                    {transaction.address}
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                    <span className="inline-block w-1/3 md:hidden font-bold">Address</span>
                    <a
                      className="font-medium text-red-600 hover:underline mr-3 cursor-pointer"
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
                            APIInvoices.deleteInvoice(transaction.id);
                            Swal.fire({
                              icon: "success",
                              title: "Invoice Deleted Successfully",
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}

export default ListTransaction;
