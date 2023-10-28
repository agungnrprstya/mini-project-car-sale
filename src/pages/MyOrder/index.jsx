import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoiceByUid, selectInvoice } from "../../store/invoiceSlice";
import { fetchGetProfileByUid, selectProfile } from "../../store/profileSlice";
import Cookies from "js-cookie";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function MyOrder() {
  const uid = Cookies.get("localId");
  const dispatch = useDispatch();
  const invoice = useSelector(selectInvoice);
  const profile = useSelector(selectProfile);
  const profileData = profile.data[0];

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
          <div className="bg-gray-200 h-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col rounded-xl">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                  <div className=" flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">{profileData?.name}</p>
                    <p className="text-sm leading-5 text-gray-600">{invoiceLength} Orders</p>
                  </div>
                </div>
                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">{profileData?.email}</p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{profileData?.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start bg-gray-200 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-xl">
              <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
              {invoice.data?.map((invoice, index) => (
                <div className="bg-red-500 mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start w-full" key={`${invoice.id}_${index}`}>
                  <div className="w-full md:w-[20rem] mx-auto my-auto">
                    <img className="w-full md:block" src={invoice?.carImage} alt={invoice?.carName} />
                  </div>
                  <div className="h-full w-full flex flex-col">
                    <div className="md:flex-row flex-col flex justify-between items-start w-full space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-3">
                        <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{invoice?.carName}</h3>
                        <p className="text-md leading-none text-gray-800">{invoice?.carCategory}</p>
                      </div>
                      <div className="flex justify-end space-x-8 items-start w-full">
                        <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">${invoice?.price}</p>
                      </div>
                    </div>
                    <p className="text-justify pt-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus eos, explicabo exercitationem neque nulla quaerat quos
                      eveniet fugiat quae quidem eligendi, voluptas reiciendis distinctio numquam?
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyOrder;
