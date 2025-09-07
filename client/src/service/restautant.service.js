import api from "./api";
const RESTO_API = import.meta.env.VITE_RESTO_API; 

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

const getAllRestaurants = async () => {
  const response = await api.get(RESTO_API, getAuthHeader());
  return response.data;
};

const getRestaurantById = async (id) => {
  const response = await api.get(`${RESTO_API}/${id}`, getAuthHeader());
  return response.data;
};

const editRestaurant = async (id, restaurant) => {
  const response = await api.put(`${RESTO_API}/${id}`, restaurant, getAuthHeader());
  return response.data;
};

const insertRestaurant = async (restaurant) => {
  const response = await api.post(RESTO_API, restaurant, getAuthHeader());
  return response.data;
};

const deleteRestaurant = async (id) => {
  const response = await api.delete(`${RESTO_API}/${id}`, getAuthHeader());
  return response.data;
};

const RestaurantService = {
  getAllRestaurants,
  getRestaurantById,
  editRestaurant,
  insertRestaurant,
  deleteRestaurant,
};

export default RestaurantService;
