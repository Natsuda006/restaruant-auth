import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import RestaurantService from "../service/restautant.service";
import Swal from "sweetalert2";
const Form = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState({
    title: '',
    type: '',
    img: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await RestaurantService.insertRestaurant(restaurant);
      await Swal.fire({
        icon: "success",
        title: "Restaurant added ",
        text: "added Successfully!",
        timer: 1500,
        showConfirmButton: true
      });
      setRestaurant({ title: '', type: '', img: '' });
      navigate("/"); // นำกลับไปหน้าหลัก
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error adding restaurant",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="title text-3xl text-center m-5 p-5">
        Grab Restaurant Add Form
      </h1>

      {["title", "type", "img"].map((field) => (
        <div className="flex justify-center mb-4" key={field}>
          <fieldset className="fieldset w-full max-w-md">
            <legend className="fieldset-legend">
              Restaurant {field.charAt(0).toUpperCase() + field.slice(1)}:
            </legend>
            <input
              type="text"
              className="input w-full"
              placeholder={`${field}...`}
              name={field}
              value={restaurant[field]}
              onChange={handleChange}
            />
          </fieldset>
        </div>
      ))}

      <div className="flex justify-center">
        {restaurant.img && (
          <img
            src={restaurant.img}
            alt="Restaurant preview"
            className="mt-4 max-w-xs max-h-64 object-contain border rounded"
            onError={(e) => {
              e.target.src = '';
            }}
          />
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button className="btn btn-outline btn-primary" onClick={handleSubmit}>
          Add
        </button>
        <button className="btn btn-outline btn-secondary" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Form;
