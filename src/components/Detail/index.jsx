import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "../Modal";

function Detail({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [localId, setLocalId] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
  });

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
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      uid: localId,
      carName: product.productName,
      category: product.category,
      ...data,
    };
    console.log("Data yang dikirim:", formData);
  };

  useEffect(() => {
    const localIdFromCookie = Cookies.get("localId");

    if (localIdFromCookie) {
      setLocalId(localIdFromCookie);
    }
  }, []);

  return (
    <div className="max-w-screen-xl w-full mx-auto overflow-hidden py-11">
      <div className="bg-white px-4 py-4 lg:py-8 lg:pl-[2rem] lg:pr-[3rem]">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2 ">
            {modalOpen && <Modal selectedImage={selectedImage} closeModal={closeModal} />}
            <div className="overflow-hidden">
              <div className="relative border hover:border-blue-300 mb-6 lg:mb-10 lg:h-2/4 cursor-pointer">
                <img src={product.url} alt="" className="object-cover h-[20rem] w-full " onClick={() => openModal(product.url)} />
              </div>
              <div className="flex-wrap hidden md:flex justify-between">
                <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                  <a className="block border hover:border-blue-300">
                    <img src={product.url} alt="" className="object-cover w-full lg:h-[7rem]" onClick={() => openModal(product.url)} />
                  </a>
                </div>
                <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                  <a className="block border hover:border-blue-300">
                    <img src={product.url} alt="" className="object-cover w-full lg:h-[7rem]" onClick={() => openModal(product.url)} />
                  </a>
                </div>
                <div className="w-1/2 sm:w-[11rem] cursor-pointer">
                  <a className="block border hover:border-blue-300">
                    <img src={product.url} alt="" className="object-cover w-full lg:h-[7rem]" onClick={() => openModal(product.url)} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-4 px-[2rem] md:w-1/2 bg-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="max-w-xl mt-2 mb-1 text-2xl font-bold md:text-4xl">{product.productName}</h2>
              <span className="text-lg font-bold text-red-500">{product.category}</span>
              <p className="max-w-full mb-6 mt-6 text-gray-700 text-justify">
                Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem
                ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum
                ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum
              </p>
              <p className="inline-block text-4xl font-bold text-gray-700">
                <span>{product.price}</span>
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
            <div className="hidden my-6">
              <label htmlFor="uid" className="block mb-2 text-sm font-medium text-gray-900">
                UID
              </label>
              <input
                type="text"
                id="uid"
                name="uid"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={localId}
                disabled
                required
              />
            </div>
            <div className="my-6">
              <label htmlFor="carName" className="block mb-2 text-sm font-medium text-gray-900">
                Car Name
              </label>
              <input
                type="text"
                id="carName"
                name="carName"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={product.productName}
                disabled
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={product.category}
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
                value={data.name}
                onChange={handleInput}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
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
                value={data.email}
                onChange={handleInput}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
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
                value={data.address}
                onChange={handleInput}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
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
