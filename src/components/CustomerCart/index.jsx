import React from "react";
import ProductImage from "../ProductImage";
import { isBrokenFirebaseStorageUrl, PLACEHOLDER_IMAGE } from "../../utils/cloudinary";

// Old invoices snapshot a carImage URL that may point at Firebase Storage,
// which is dead on the free plan. Fall back to the product's current image
// (looked up by productId) so order history stays intact.
const getInvoiceImage = (invoice, products) => {
  if (invoice?.carImage && !isBrokenFirebaseStorageUrl(invoice.carImage)) {
    return invoice.carImage;
  }
  const current = products?.find((p) => p.id === invoice?.productId);
  return current?.carImage || PLACEHOLDER_IMAGE;
};

const CustomerCart = ({ invoice, products }) => {
  return (
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start bg-gray-200 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-xl">
        <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
        {invoice.data?.map((invoice, index) => (
          <div
            className="border-2 rounded-lg border-gray-950  mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start w-full px-1"
            key={`${invoice.id}_${index}`}
          >
            <div className="w-full md:w-[20rem] h-40 mx-auto my-auto">
              <ProductImage
                className="w-full md:block h-full object-contain"
                src={getInvoiceImage(invoice, products)}
                alt={invoice?.carName}
              />
            </div>
            <div className="h-full w-full flex flex-col">
              <div className="md:flex-row flex-col flex justify-between items-start w-full space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-3">
                  <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{invoice?.carName}</h3>
                  <p className="text-md leading-none text-gray-800">{invoice?.carCategory}</p>
                </div>
                <div className="flex justify-end space-x-8 items-start w-full">
                  <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">${invoice?.carPrice}</p>
                </div>
              </div>
              <p className="text-justify pt-5">{invoice?.carDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerCart;
