import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoiceByUid, selectInvoice } from "../../store/invoiceSlice";
import { fetchGetProfileByUid, selectProfile } from "../../store/profileSlice";
import Pagination from "../../components/Pagination";
import Cookies from "js-cookie";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CustomerCart from "../../components/CustomerCart";
import CustomerInfo from "../../components/CustomerInfo";

function MyOrder() {
  const uid = Cookies.get("localId");
  const dispatch = useDispatch();
  const invoice = useSelector(selectInvoice);
  const profile = useSelector(selectProfile);
  const invoiceLength = invoice.data?.length;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInvoiceByUid(uid));
    dispatch(fetchGetProfileByUid(uid));
  }, [dispatch, uid]);

  //Pagination
  const productsPerPage = 2;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const totalPages = Math.ceil(invoice.data?.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const data = { ...invoice };

  const productsToDisplay = {
    ...data,
    data: data.data?.slice(startIndex, endIndex),
  };

  return (
    <>
      {invoice?.status === "loading" && (
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
      <div className="flex flex-col min-h-screen justify-between">
        <Navbar />
        <div className="bg-white max-w-screen-xl mx-auto w-full px-10 py-10 rounded-3xl my-[2rem]">
          <div className="flex flex-col xl:flex-row jusitfy-center items-stretch xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <CustomerInfo profile={profile} invoiceLength={invoiceLength} />
            <CustomerCart invoice={productsToDisplay} />
          </div>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <Footer />
      </div>
    </>
  );
}

export default MyOrder;
