import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetProductById, selectProduct } from "../../store/productSlice";
import { fetchGetProfileByUid, selectProfile } from "../../store/profileSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Detail from "../../components/Detail";
import { APIInvoices } from "../../apis/APIInvoices";
import { APIProfiles } from "../../apis/APIProfiles";
import Swal from "sweetalert2";

function DetailProduct() {
  const initialValue = {
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  };
  const { id } = useParams();
  const uid = Cookies.get("localId");
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const profile = useSelector(selectProfile);
  const [formData, setFormData] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  // Check if profile.data exists and is not empty before mapping it
  const mapProfileData = profile?.data && profile.data?.length > 0 ? profile.data?.map((profile) => profile) : [];

  useEffect(() => {
    dispatch(fetchGetProfileByUid(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(fetchGetProductById(id));
  }, [dispatch, id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    const filledProfileData = mapProfileData[0];

    const invoiceData = {
      uid: uid,
      carName: product.data?.carName,
      carImage: product.data?.carImage,
      carCategory: product.data?.carCategory,
      carDescription: product.data?.carDescription,
      carPrice: product.data?.carPrice,
      ...(filledProfileData ? { ...filledProfileData } : { ...formData }),
    };

    const profileData = {
      uid: uid,
      ...formData,
    };

    try {
      setLoading(true);
      if (!filledProfileData) {
        await APIProfiles.addProfile(profileData);
      }
      await APIInvoices.addInvoice(invoiceData);
      Swal.fire({
        icon: "success",
        title: "Success to buy product!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to buy product!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
    Navigate("/my-order");
  };

  return (
    <>
      {product?.status === "loading" && (
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
      )}
      <div className="flex flex-col min-h-screen justify-between">
        <Navbar />
        <Detail
          product={product?.data}
          profile={mapProfileData[0]}
          formData={formData}
          handleInput={handleInput}
          onSubmit={onSubmit}
          loading={loading}
        />
        <Footer />
      </div>
    </>
  );
}

export default DetailProduct;
