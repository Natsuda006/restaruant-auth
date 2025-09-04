import express from "express";
import restaurantControllers from "../controllers/restaurant.controllers.js";
import authMiddleware from "../middleware/authjwt.js";

const router = express.Router();

// POST http://localhost:5001/api/v1/restaurants
router.post("/",authMiddleware.verifyToken,authMiddleware.isModOrAdmin, restaurantControllers.create);

// GET http://localhost:5000/api/v1/restaurants
router.get("/",authMiddleware.verifyToken, restaurantControllers.getAll);

// GET http://localhost:5000/api/v1/restaurants/:id
router.get("/:id", authMiddleware.verifyToken,restaurantControllers.getById);

// PUT http://localhost:5000/api/v1/restaurants/:id
router.put("/:id", authMiddleware.verifyToken,authMiddleware.isModOrAdmin,restaurantControllers.update);

// DELETE http://localhost:5000/api/v1/restaurants/:id
router.delete("/:id",authMiddleware.verifyToken,authMiddleware.isAdmin, restaurantControllers.deleteById);

export default router;

