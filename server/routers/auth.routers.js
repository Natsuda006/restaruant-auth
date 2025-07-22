import express from "express";
const router = express.Router();
import authControllers from "../controllers/auth.controllers.js";

// POST http://localhost:5000/api/v1/auth/signup
router.post("/signup", authControllers.signUp);

export default router;
