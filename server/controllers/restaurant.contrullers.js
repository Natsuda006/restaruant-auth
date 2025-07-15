import Restaurant from "../models/restaurant.model.js";

const restaurantControllers = {};

// Create and save a new restaurant
restaurantControllers.create = async (req, res) => {
  const { name, type, imageUrl } = req.body;

  // Validate data
  if (!name || !type || !imageUrl) {
    return res.status(400).send({ message: "Name, Type or ImageUrl cannot be empty!" });
  }

  try {
    // Check if restaurant already exists
    const restaurant = await Restaurant.findOne({ where: { name } });

    if (restaurant) {
      return res.status(400).send({ message: "Restaurant already exists!" });
    }

    // Create new restaurant
    const newRestaurant = await Restaurant.create({ name, type, imageUrl });

    return res.status(201).send(newRestaurant);

  } catch (error) {
    return res.status(500).send({
      message: error.message || "Something went wrong while creating the restaurant",
    });
  }
};

export default restaurantControllers;
