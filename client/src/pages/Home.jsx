import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Restaurant from "../components/Restauant";
import RestaurantService from "../service/restautant.service";
import Swal from "sweetalert2";

const Home = () => {
 feature/authentication
  const [restaurants, setRestaurants] = useState([]);
  const [filterRestaurants, setFilterRestaurants] = useState([]);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      setFilterRestaurants(restaurants);
      return;
    }

    const result = restaurants.filter((restaurant) =>

const [restaurants, setRestaurants] = useState([]);
const [filterRestaurants, setFilterRestaurants] = useState([]);
const handleSearch = (keyword) =>{
  if(keyword === ""){
      setFilterRestaurants(restaurants)
    return;
  }
  const result = restaurants.filter((restaurant) =>{
    return (
 main
      restaurant.title.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.type.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilterRestaurants(result);
  };

  useEffect(() => {
 feature/authentication
    const getAllRestaurants = async () => {
      try {
        const data = await RestaurantService.getAllRestaurants();
        setRestaurants(data);
        setFilterRestaurants(data);
      } catch (error) {
        Swal.fire({
          title: "Get All Restaurants",
          icon: "error",
          text:
            error?.response?.data?.message ||
            error.message,
        });
      }
    };

    getAllRestaurants();
  }, []);


    //call api: getAllRestaurants
    fetch("http://localhost:5000/api/v1/restaurants/").then((res)=>{
      //convert to json
      return res.json()
    }).then((Response)=>{
      //save to state
      setRestaurants(Response)
      setFilterRestaurants(Response)
    }).catch((err)=> {
      //catch error
      console.log(err.message);
    }); 
  },[])
 main
  return (
    <div className="container mx-auto">
      <Navbar />
      <h1 className="title text-3xl text-center m-5 p-5">Grab Restaurant</h1>
      <div className="mb-5 flex justify-center items-center">
        <label className="input flex items-center gap-2 w-2xl">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
 feature/authentication
          <input
            type="search"
            name="keyword"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search"
          />

          <input type="search" name = "keyword" onChange={(e) => handleSearch(e.target.value)} required placeholder="Search"/>
 main
        </label>
      </div>
      <Restaurant restaurants={filterRestaurants} />
    </div>
  );
};

export default Home;
