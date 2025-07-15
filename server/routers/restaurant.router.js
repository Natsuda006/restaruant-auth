import express from "express";
import restaurantControllers from "../controllers/restaurant.controllers.js"; // แก้ชื่อไฟล์และตัวแปร

const router = express.Router();

// POST http://localhost:5000/api/v1/restaurant
router.post("/", restaurantControllers.create);

export default router;  // export router ตัวนี้ไปใช้ใน index.js
