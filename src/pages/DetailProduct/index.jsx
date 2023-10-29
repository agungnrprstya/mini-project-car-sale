import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetProductById, selectProduct } from "../../store/productSlice";
import { fetchGetProfileByUid, selectProfile } from "../../store/profileSlice";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Detail from "../../components/Detail";

function DetailProduct() {
  const { id } = useParams();
  const uid = Cookies.get("localId");
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    dispatch(fetchGetProfileByUid(uid));
  }, [dispatch, uid]);

  useEffect(() => {
    dispatch(fetchGetProductById(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Detail product={product?.data} profile={profile?.data[0]} uid={uid} />
      <Footer />
    </div>
  );
}

export default DetailProduct;
