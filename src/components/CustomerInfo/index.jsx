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
            <div className="flex flex-row justify-center md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" />
              </svg>
              <p className="text-sm leading-5 text-gray-800">{profile?.email}</p>
            </div>
            <div className="flex flex-row justify-center md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M18.48 22.926l-1.193.658c-6.979 3.621-19.082-17.494-12.279-21.484l1.145-.637 3.714 6.467-1.139.632c-2.067 1.245 2.76 9.707 4.879 8.545l1.162-.642 3.711 6.461zm-9.808-22.926l-1.68.975 3.714 6.466 1.681-.975-3.715-6.466zm8.613 14.997l-1.68.975 3.714 6.467 1.681-.975-3.715-6.467z" />
              </svg>
              <p className="text-sm leading-5 text-gray-800">{profile?.phoneNumber}</p>
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
