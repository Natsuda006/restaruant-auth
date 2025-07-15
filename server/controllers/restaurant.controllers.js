import Restaurant from "../models/restaurant.model.js";
const restaurantControllers = {};
//create and save a new restaurant
restaurantControllers.create = async (req, res) => {
  const { title, type, img } = req.body;
  //validate data
  if (!title || !type || !img) {
    res.status(400).send({ message: "Title, Type or Img can not be empty" });
    return;
  }

  await Restaurant.findOne({ where: { title: title } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({ message: "Restaurant already exists!" });
      return;
    }
    const newRestaurant = {
      title,
      type,
      img,
    };

    Restaurant.create(newRestaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error while creating the restaurant",
        });
      });
  });
};
export default restaurantControllers;