import React, { useState } from "react";
import { initialTransaction } from "../../data/listTransaction";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";

function ListTransaction() {
  const transaction = initialTransaction;
  const itemsPerPage = 12; // Set the number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of products to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTransaction = transaction.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setCurrentPage(page);
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
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Address</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {displayedTransaction.map((transaction) => (
              <tr key={transaction.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Name</span>
                  {transaction.carName}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">User Name</span>
                  {transaction.price}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>
                  {transaction.name}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>
                  {transaction.email}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>
                  {transaction.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(transaction.length / itemsPerPage)} onPageChange={onPageChange} />
      </div>
    </div>
  );
}

export default ListTransaction;
