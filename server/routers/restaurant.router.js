import express from "express";
import restaurantControllers from "../controllers/restaurant.controllers.js";

const router = express.Router();

// POST http://localhost:5000/api/v1/restaurants
router.post("/", restaurantControllers.create);

// GET http://localhost:5000/api/v1/restaurants
router.get("/", restaurantControllers.getAll);

// GET http://localhost:5000/api/v1/restaurants/:id
router.get("/:id", restaurantControllers.getById);

// PUT http://localhost:5000/api/v1/restaurants/:id
router.put("/:id", restaurantControllers.update);

// DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete("/:id", restaurantControllers.deleteById);

export default router;

