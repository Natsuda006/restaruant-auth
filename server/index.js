import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

// import routers
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.routers.js";

// import sequelize
import sequelize from "./models/db.js"; // <-- แก้ตรงนี้

// import Role model (ถ้าใช้ Role.create)
import Role from "./models/role.model.js"; // path ตามจริง

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// สร้าง role หากยังไม่มี
const initRole = async () => {
  try {
    await Role.create({ id: "1", name: "user" });
    await Role.create({ id: "2", name: "moderator" });
    await Role.create({ id: "3", name: "admin" });
    console.log("Roles created.");
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

// sync database
sequelize.sync({ force: true }).then(async () => {
  console.log("Database synced");
  await initRole();
});

// Routes
app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
