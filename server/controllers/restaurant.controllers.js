import { where } from "sequelize";
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
restaurantControllers.getAll = async (req, res) => {
  await Restaurant.findAll().then((data)=>{
    res.send(data)
  }).catch((error)=>{
  
        res.status(500).send({
          message:
            error.message || "Something error while getting All the restaurant",
        });
  });
};

restaurantControllers.getById = async (req, res) => {
  const id = req.params.id;

  await Restaurant.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Restaurant with id: " + id });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Something went wrong while retrieving the restaurant.",
      });
    });
};

restaurantControllers.update = async (req, res) => {
  const id = req.params.id;
  const {title,type,img} = req.body;
  //validate data
  if(!title && !type && !img){
    res.status(400).send({message: "Title, Type or ImageUri can not be empty!"});
    return;
  }
  await Restaurant.update({title, type, img},
    {where:{id:id}}
  ).then((num)=>{
    if(num==1){
      res.send({message: "Update restaurant successfully"})
    }else{
      res.status(404).send({message: "Cannot update Restaurant with id: ${id}. Maybe Restaurant was not found or req.body is empty"})
    }
  }).catch((error)=>{
        res.status(500).send({
          message:
            error.message || "Something error while getting All the restaurant",
    });
  });
};

// Delete restaurant by ID
restaurantControllers.deleteById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).send({ message: "id is missing" });
    return;
  }

  await Restaurant.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Restaurant deleted successfully!" });
      } else {
        res.status(404).send({ message: "Restaurant not found with id: " + id });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "Could not delete restaurant with id " + id,
      });
    });
};


export default restaurantControllers;