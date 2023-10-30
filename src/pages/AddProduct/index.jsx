import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { APIProducts } from "../../apis/APIProducts";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import Swal from "sweetalert2";

function AddProduct() {
  const initialValue = {
    carName: "",
    carCategory: "",
    carImage: "",
    carDescription: "",
    carPrice: "",
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialValue);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "carImage") {
      const file = e.target.files[0];
      setData({ ...data, carImage: file });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const onSubmit = async () => {
    const formData = {
      ...data,
    };
    try {
      setLoading(true);
      await APIProducts.addProduct(formData);
      Swal.fire({
        icon: "success",
        title: "Add product successful!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Add product failed!",
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
      <Form data={data} handleInput={handleInput} onSubmit={onSubmit} loading={loading} />
    </div>
  );
}

export default AddProduct;
