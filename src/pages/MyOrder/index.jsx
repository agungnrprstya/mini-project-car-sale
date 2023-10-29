import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoiceByUid, selectInvoice } from "../../store/invoiceSlice";
import { fetchGetProfileByUid, selectProfile } from "../../store/profileSlice";
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

  useEffect(() => {
    dispatch(fetchInvoiceByUid(uid));
    dispatch(fetchGetProfileByUid(uid));
  }, [dispatch, uid]);

  const invoiceLength = invoice.data?.length;

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <div className="bg-white max-w-screen-xl mx-auto w-full px-10 py-10 rounded-3xl my-[2rem]">
        <div className="flex flex-col xl:flex-row jusitfy-center items-stretch xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <CustomerInfo profile={profile} invoiceLength={invoiceLength} />
          <CustomerCart invoice={invoice} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyOrder;
