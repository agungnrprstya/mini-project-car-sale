import React, { useState } from "react";
import { APIInvoices } from "../../apis/APIInvoices";
import { APIProfiles } from "../../apis/APIProfiles";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";

function Detail({ product, profile, uid }) {
  const initialValue = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  };
  const Navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialValue);

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledProfileData = profile;

    const invoiceData = {
      uid: uid,
      carName: product.carName,
      carCategory: product.carCategory,
      carImage: product.carImage,
      price: product.price,
      ...(filledProfileData ? { ...filledProfileData } : { ...formData }),
    };

    const profileData = {
      uid: uid,
      ...formData,
    };

    if (!filledProfileData) {
      await APIProfiles.addProfile(profileData);
    }

    const response = await APIInvoices.addInvoice(invoiceData);
    console.log("Data yang dikirim:", invoiceData);
    console.log("Response from addProduct:", response);
    Navigate("/my-order");
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto overflow-hidden py-11">
      <div className="bg-white px-4 py-4 lg:py-8 lg:pl-[2rem] lg:pr-[3rem]">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2 ">
            {modalOpen && <Modal selectedImage={selectedImage} closeModal={closeModal} />}
            <div className="overflow-hidden">
              <div className="relative border hover:border-blue-300 mb-6 lg:mb-10 lg:h-2/4 cursor-pointer">
                <img src={product?.carImage} alt="" className="object-cover h-[20rem] w-full " onClick={() => openModal(product.carImage)} />
              </div>
              <div className="flex-wrap hidden md:flex justify-between">
                <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                  <a className="block border hover:border-blue-300">
                    <img src={product?.url} alt="" className="object-cover w-full lg:h-[7rem]" onClick={() => openModal(product.url)} />
                  </a>
                </div>
                <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                  <a className="block border hover:border-blue-300">
                    <img
                      src="https://m.economictimes.com/thumb/height-450,width-600,imgsize-92902,msid-96559100/the-rimac-nevera-is-now-the-fastest-electric-car-in-the-world-image-rimac.jpg"
                      alt=""
                      className="object-cover w-full lg:h-[7rem]"
                      onClick={() =>
                        openModal(
                          "https://m.economictimes.com/thumb/height-450,width-600,imgsize-92902,msid-96559100/the-rimac-nevera-is-now-the-fastest-electric-car-in-the-world-image-rimac.jpg"
                        )
                      }
                    />
                  </a>
                </div>
                <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                  <a className="block border hover:border-blue-300">
                    <img src={product?.url} alt="" className="object-cover w-full lg:h-[7rem]" onClick={() => openModal(product.url)} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-4 px-[2rem] md:w-1/2 bg-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="max-w-xl mt-2 mb-1 text-2xl font-bold md:text-4xl">{product?.carName}</h2>
              <span className="text-lg font-bold text-red-500">{product?.carCategory}</span>
              <p className="max-w-full mb-6 mt-6 text-gray-700 text-justify">{product?.add}</p>
              <p className="inline-block text-4xl font-bold text-gray-700">
                <span>{product?.description}</span>
              </p>
              <p className="text-green-600 mt-2 mb-1">In Stock</p>
            </div>
            <div className="-mx-4 ">
              <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
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
          <form onSubmit={handleSubmit}>
            <div className="my-6">
              <label htmlFor="carName" className="block mb-2 text-sm font-medium text-gray-900">
                Car Name
              </label>
              <input
                type="text"
                id="carName"
                name="carName"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={product?.carName}
                disabled
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                Price
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={product?.price}
                disabled
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile?.name || formData.name}
                onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                className={`bg-${
                  profile ? "gray-200" : "white"
                } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                required
                disabled={profile ? true : false}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile?.email || formData.email}
                onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                className={`bg-${
                  profile ? "gray-200" : "white"
                } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                required
                disabled={profile ? true : false}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={profile?.phoneNumber || formData.phoneNumber}
                onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                className={`bg-${
                  profile ? "gray-200" : "white"
                } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                required
                disabled={profile ? true : false}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={profile?.address || formData.address}
                onChange={profile ? null : handleInput} // Hapus onChange jika profileData adalah true
                className={`bg-${
                  profile ? "gray-200" : "white"
                } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                required
                disabled={profile ? true : false}
              />
            </div>
            <div className="flex flex-row gap-3">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
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
  );
}

export default Detail;
