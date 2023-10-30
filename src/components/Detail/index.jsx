import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { interiorImages } from "../../assets/image/image";
import Modal from "../Modal";

function Detail({ product, profile, onSubmit, loading, handleInput, formData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .max(25, "Name must not exceed 25 characters")
      .matches(/^[a-zA-Z0-9\s]*$/, "Name must not contain symbols")
      .trim(),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must not exceed 100 characters")
      .trim(),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^\d+$/, "Phone Number is invalid")
      .min(8, "Phone Number must be at least 8 characters")
      .max(15, "Phone Number must not exceed 15 characters")
      .trim(),
    address: yup.string().required("Address is required").max(100, "Address must not exceed 100 characters").trim(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const handleBuyClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  return (
    <>
      {loading ? (
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
      ) : (
        <div className="max-w-screen-xl w-full mx-auto overflow-hidden py-11">
          <div className="bg-white px-4 py-4 lg:py-8 lg:pl-[2rem] lg:pr-[3rem]">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/2 ">
                {modalOpen && <Modal selectedImage={selectedImage} closeModal={closeModal} />}
                <div className="overflow-hidden">
                  <div className="relative border hover:border-blue-300 mb-6 lg:mb-10 lg:h-2/4 cursor-pointer">
                    <img src={product?.carImage} alt="" className="object-contain h-[20rem] w-full " onClick={() => openModal(product.carImage)} />
                  </div>
                  <div className="flex-wrap hidden md:flex justify-between">
                    <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                      <a className="block border hover:border-blue-300">
                        <img
                          src={interiorImages[0]}
                          alt=""
                          className="object-cover w-full lg:h-[7rem]"
                          onClick={() => openModal(interiorImages[0])}
                        />
                      </a>
                    </div>
                    <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                      <a className="block border hover:border-blue-300">
                        <img
                          src={interiorImages[1]}
                          alt=""
                          className="object-cover w-full lg:h-[7rem]"
                          onClick={() => openModal(interiorImages[1])}
                        />
                      </a>
                    </div>
                    <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                      <a className="block border hover:border-blue-300">
                        <img
                          src={interiorImages[2]}
                          alt=""
                          className="object-cover w-full lg:h-[7rem]"
                          onClick={() => openModal(interiorImages[2])}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full py-4 px-[2rem] md:w-1/2 bg-gray-100 flex flex-col justify-between">
                <div>
                  <h2 className="max-w-xl mt-2 mb-1 text-2xl font-bold md:text-4xl">{product?.carName}</h2>
                  <span className="text-lg font-bold text-red-500">{product?.carCategory}</span>
                  <p className="max-w-full mb-6 mt-6 text-gray-700 text-justify">{product?.carDescription}</p>
                </div>
                <div className="-mx-4 ">
                  <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                    <p className="inline-block text-4xl font-bold text-gray-700">
                      <span>${product?.carPrice}</span>
                    </p>
                    <p className="text-green-600 mt-2 mb-3">In Stock</p>
                    <button
                      className="items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100"
                      onClick={handleBuyClick}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            {showForm && (
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="my-6">
                  <label htmlFor="carName" className="block mb-2 text-sm font-medium text-gray-900">
                    Car Name
                  </label>
                  <input
                    type="text"
                    id="carName"
                    name="carName"
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={product?.carName}
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                    Price
                  </label>
                  <input
                    type="text"
                    id="carPrice"
                    name="carPrice"
                    className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    defaultValue={product?.carPrice}
                    disabled
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                    Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={profile?.name || formData.name}
                    onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                    className={`bg-${
                      profile ? "gray-200" : "white"
                    } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    required
                  />
                  <p type="invalid" className="text-red-500">
                    {errors.name?.message}
                  </p>
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={profile?.email || formData.email}
                    onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                    className={`bg-${
                      profile ? "gray-200" : "white"
                    } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    required
                  />
                  <p type="invalid" className="text-red-500">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="mb-6">
                  <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber")}
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    defaultValue={profile?.phoneNumber || formData.phoneNumber}
                    onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                    className={`bg-${
                      profile ? "gray-200" : "white"
                    } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    required
                  />
                  <p type="invalid" className="text-red-500">
                    {errors.phoneNumber?.message}
                  </p>
                </div>
                <div className="mb-6">
                  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    type="text"
                    id="address"
                    name="address"
                    defaultValue={profile?.address || formData.address}
                    onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                    className={`bg-${
                      profile ? "gray-200" : "white"
                    } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                    required
                  />
                  <p type="invalid" className="text-red-500">
                    {errors.address?.message}
                  </p>
                </div>
                <div className="flex flex-row gap-3">
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Submit
                  </button>
                  <button
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;
