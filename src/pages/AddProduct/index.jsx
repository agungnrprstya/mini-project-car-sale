import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { APIProducts } from "../../apis/APIProducts";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";

function AddProduct() {
  const initialValue = {
    carName: "",
    carCategory: "",
    carImage: "",
    description: "",
    price: "",
  };

  const navigate = useNavigate();

  const [data, setData] = useState(initialValue);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...data,
    };
    try {
      await APIProducts.addProduct(formData);
      console.log("Data yang dikirim:", formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <Form data={data} handleInput={handleInput} handleSubmit={handleSubmit} />
    </div>
  );
}

export default AddProduct;
