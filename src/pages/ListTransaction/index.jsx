import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetInvoices, selectInvoices } from "../../store/invoicesSlice";

function ListTransaction() {
  const dispatch = useDispatch();
  const stateInvoices = useSelector(selectInvoices);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGetInvoices());
  }, [dispatch]);

  //Pagination
  const invoicesPerPage = 12;
  const startIndex = (currentPage - 1) * invoicesPerPage;
  const endIndex = startIndex + invoicesPerPage;
  const totalPages = Math.ceil(stateInvoices.data.length / invoicesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Display Product
  const invoicesToDisplay = {
    data: stateInvoices.data.slice(startIndex, endIndex),
  };

  return (
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
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {invoicesToDisplay.data.map((transaction) => (
              <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row" key={transaction.id}>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Car Name</span>
                  {transaction.carName}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Price</span>
                  {transaction.price}
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
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default ListTransaction;
