import React from "react";

const CustomerInfo = ({ profile, invoiceLength }) => {
  return (
    <div className="bg-gray-200 h-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col rounded-xl">
      <h3 className="text-xl font-semibold leading-5 text-gray-800">Customer</h3>
      {profile.data?.map((profile, index) => (
        <div
          className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0"
          key={`${profile.id}_${index}`}
        >
          <div className="flex flex-col justify-start items-start flex-shrink-0">
            <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
              <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
              <div className=" flex justify-start items-start flex-col space-y-2">
                <p className="text-base font-semibold leading-4 text-left text-gray-800">{profile?.name}</p>
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
              <p className="cursor-pointer text-sm leading-5 text-gray-800">{profile?.email}</p>
            </div>
          </div>
          <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
              <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{profile?.address}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerInfo;
