import React from "react";
import Card from "./Card";
import { useAuthContext } from "../context/AuthContext";
const Restauants = ({restaurants}) => {
  const { user } = useAuthContext();
  return(
    <div className="flex">
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {restaurants && user &&
         restaurants.map((restaurant) => {
          return(
            <Card
              key = {restaurant.id}
              id = {restaurant.id}
              title = {restaurant.title} 
              type = {restaurant.type}
              img = {restaurant.img}
            />
          );
        })}
        {!user && (
          <div className="flex flex-col justify-center items-center w-full min-h-[300px]">
            <div className="alert alert-warning">
              <span>Please login to see restaurants.</span>
            </div>
          </div>
        )}
        {!restaurants && (
          <div className="alert alert-info">
            <span>No Content.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restauants;