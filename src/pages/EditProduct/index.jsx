import React, { useEffect, useState } from "react";
import { APIProducts } from "../../apis/APIProducts";
import { fetchGetProductById, selectProduct } from "../../store/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";
import Swal from "sweetalert2";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    carName: product.data?.carName,
    carCategory: product.data?.carCategory,
    carImage: product.data?.carImage,
    carDescription: product.data?.carDescription,
    carPrice: product.data?.carPrice,
  });

  useEffect(() => {
    dispatch(fetchGetProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setData({
      carName: product.data?.carName,
      carCategory: product.data?.carCategory,
      carImage: product.data?.carImage,
      carDescription: product.data?.carDescription,
      carPrice: product.data?.carPrice,
    });
  }, [product]);

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

  // Handle form submission
  const onSubmit = async () => {
    try {
      setLoading(true);
      await APIProducts.editProduct(id, {
        carName: data?.carName,
        carCategory: data?.carCategory,
        carImage: data?.carImage,
        carDescription: data?.carDescription,
        carPrice: data?.carPrice,
      });
      Swal.fire({
        icon: "success",
        title: "Edit Product successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Edit product failed!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <Form data={data} product={product} handleInput={handleInput} onSubmit={onSubmit} loading={loading} />
    </div>
  );
}

export default EditProduct;
