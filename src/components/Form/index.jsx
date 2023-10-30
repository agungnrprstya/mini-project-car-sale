import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Form({ data, handleInput, onSubmit, loading }) {
  const validationSchema = yup.object().shape({
    carName: yup
      .string()
      .required("Product Name is required")
      .max(25, "Product Name must not exceed 25 characters")
      .trim("Please enter a valid product name")
      .matches(/^[a-zA-Z0-9\s]*$/, "Product Name must not contain symbols"),
    carCategory: yup.string().required("Product Category is required"),
    carImage: yup.mixed().test("fileRequired", "Product Image is required", (value) => {
      return value && value.length > 0;
    }),
    carDescription: yup.string().required("Additional Description is required"),
    carPrice: yup.number().typeError("Product Price is required").min(0, "Product Price must be greater than 0"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

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
        <div className="px-[2rem] pt-[2rem] min-h-screen w-screen flex flex-col justify-between">
          <div className="mx-auto min-w-full px-6 py-6 bg-gray-100 border-0 shadow-lg sm:rounded-3xl">
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900">
                  Car Name
                </label>
                <input
                  {...register("carName")}
                  type="text"
                  id="carName"
                  name="carName"
                  onChange={handleInput}
                  value={data?.carName}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.carName ? "border-red-500" : ""
                  }`}
                />
                <p type="invalid" className="text-red-500">
                  {errors.carName?.message}
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="countries" className="block mb-2 text-lg font-medium text-gray-900">
                  Category
                </label>
                <select
                  {...register("carCategory")}
                  id="carCategory"
                  name="carCategory"
                  value={data?.carCategory}
                  onChange={handleInput}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.carCategory ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="Sport">Sport</option>
                  <option value="SUV">SUV</option>
                  <option value="MPV">MPV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
                <p type="invalid" className="text-red-500">
                  {errors.carCategory?.message}
                </p>
              </div>
              <div className="mb-6">
                <label className="mb-2 text-lg font-medium text-gray-900 " htmlFor="carImage">
                  Upload file
                </label>
                <input
                  {...register("carImage")}
                  type="file"
                  id="carImage"
                  name="carImage"
                  accept="image/*"
                  onChange={handleInput}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.carImage ? "border-red-500" : ""
                  }`}
                />
                <p type="invalid" className="text-red-500">
                  {errors.carImage?.message}
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900">
                  Car Description
                </label>
                <textarea
                  {...register("carDescription")}
                  id="carDescription"
                  name="carDescription"
                  rows="4"
                  onChange={handleInput}
                  value={data?.carDescription}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.carDescription ? "border-red-500" : ""
                  }`}
                ></textarea>
                <p type="invalid" className="text-red-500">
                  {errors.carDescription?.message}
                </p>
              </div>
              <div className="mb-6">
                <label htmlFor="text" className="block mb-2 text-lg font-medium text-gray-900">
                  Price
                </label>
                <input
                  {...register("carPrice")}
                  type="number"
                  id="carPrice"
                  name="carPrice"
                  onChange={handleInput}
                  value={data?.carPrice}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                    errors.carPrice ? "border-red-500" : ""
                  }`}
                />
                <p type="invalid" className="text-red-500">
                  {errors.carPrice?.message}
                </p>
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
      )}
    </>
  );
}

export default Form;
