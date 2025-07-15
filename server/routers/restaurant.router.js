import express from "express";
import restaurantControllers from "../controllers/restaurant.controllers.js"; // ✅ ชื่อไฟล์ถูกต้อง

const router = express.Router();

// POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantControllers.create); // ✅ ชื่อตัวแปรถูกต้อง

export default router;
