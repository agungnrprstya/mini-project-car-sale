import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { APIProducts } from "../../apis/APIProducts";

function AddProduct() {
  const initialValue = {
    carName: "",
    carCategory: "",
    carImage: "",
    description: "",
    price: "",
  };

  const [data, setData] = useState(initialValue);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleInput = (e) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setData({ ...data, carImage: file });
    } else {
      const value = e.target.value;
      setData({ ...data, [name]: value });
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update the selected category state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...data,
      carCategory: selectedCategory,
    };
    const response = await APIProducts.addProduct(formData);
    console.log("Data yang dikirim:", formData);
    console.log("Response from addProduct:", response);
    console.log("Data yang dikirim:", formData);
    setData(initialValue);
    setSelectedCategory("");
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="px-[2rem] pt-[2rem] min-h-screen w-screen flex flex-col justify-between">
        <div className="mx-auto min-w-full px-6 py-6 bg-gray-100 border-0 shadow-lg sm:rounded-3xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900">
                Car Name
              </label>
              <input
                type="text"
                id="carName"
                name="carName"
                onChange={handleInput}
                value={data.carName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="countries" className="block mb-2 text-lg font-medium text-gray-900">
                Category
              </label>
              <select
                id="carCategory"
                name="carCategory"
                value={selectedCategory} // Set the selected category value
                onChange={handleCategoryChange} // Handle category change
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              >
                <option value="">Select Category</option>
                <option value="Sport">Sport</option>
                <option value="SUV">SUV</option>
                <option value="MPV">MPV</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 text-lg font-medium text-gray-900 " htmlFor="carImage">
                Upload file
              </label>
              <input
                type="file"
                id="carImage"
                name="carImage"
                onChange={handleInput}
                className="w-full text-gray-900 border border-gray-300 cursor-pointer bg-gray-50"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                onChange={handleInput}
                value={data.description}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={handleInput}
                value={data.price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
