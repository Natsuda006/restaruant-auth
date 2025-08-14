import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import restaurantService from "../service/restautant.service";
import Swal from "sweetalert2";

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    title: '',
    type: '',
    img: '',
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await restaurantService.getRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        console.log("Error fetching restaurant:", err.message);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleSubmit = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this restaurant?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });
    if (!result.isConfirmed) return;

    try {
      await restaurantService.deleteRestaurant(id);
      await Swal.fire({
        icon: "success",
        title: "Restaurant deleted successfully.",
        ะtext: "The restaurant has been removed from the list.",
        timer: 1500,
        showConfirmButton:true
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error deleting restaurant.",
        text: error?.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="title text-3xl text-center m-5 p-5">
        Grab Restaurant Delete Confirmation
      </h1>

      {["title", "type", "img"].map((field) => (
        <div className="flex justify-center mb-4" key={field}>
          <fieldset className="fieldset w-full max-w-md">
            <legend className="fieldset-legend">Restaurant {field.charAt(0).toUpperCase() + field.slice(1)}:</legend>
            <input
              type="text"
              className="input w-full"
              value={restaurant[field]}
              disabled
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
        <button className="btn btn-outline btn-secondary" onClick={handleSubmit}>
          Delete
        </button>
        <button className="btn btn-outline btn-primary" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Delete;
