import React, { useEffect, useState } from "react";
import { APIProducts } from "../../apis/APIProducts";
import { fetchGetProductById, selectProduct } from "../../store/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar";
import Form from "../../components/Form";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  console.log(product);

  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      carName: product.data?.carName,
      carCategory: product.data?.carCategory,
      carImage: product.data?.carImage,
      description: product.data?.description,
      price: product.data?.price,
    });
  }, [product]);

  useEffect(() => {
    dispatch(fetchGetProductById(id));
  }, [dispatch, id]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await APIProducts.editProduct(id, {
        carName: data.carName,
        carCategory: data.carCategory,
        carImage: data.carImage,
        description: data.description,
        price: data.price,
      });
      console.log("Data yang dikirim:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <Form data={data} handleInput={handleInput} handleSubmit={handleSubmit} />
    </div>
  );
}

export default EditProduct;
