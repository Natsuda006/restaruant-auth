import api from "./api";
const RESTO_API = import.meta.env.VITE_RESTO_API;

const getAllRestaurants = async () => {
  const response = await api.get(RESTO_API);
  return response.data;
};

const getRestaurantById = async (id) => {
  const response = await api.get(`${RESTO_API}/${id}`);
  return response.data;
};

const editRestaurant = async (id, restaurant) => {
  const response = await api.put(`${RESTO_API}/${id}`, restaurant);
  return response.data;
};

const insertRestaurant = async (restaurant) => {
  const response = await api.post(RESTO_API, restaurant);
  return response.data;
};

const deleteRestaurant = async (id) => {
  const response = await api.delete(`${RESTO_API}/${id}`);
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
