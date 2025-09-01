import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.routers.js";
import db from "./models/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ===== CORS =====
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
if (FRONTEND_URL) allowedOrigins.push(FRONTEND_URL);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"]
}));

// ===== Body Parser =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Roles =====
const role = db.Role;

const initRole = async () => {
  try {
    await Promise.all([
      role.create({ id: 1, name: "user" }),
      role.create({ id: 2, name: "moderator" }),
      role.create({ id: 3, name: "admin" })
    ]);
    console.log("Roles initialized ✅");
  } catch (err) {
    console.error("Error initializing roles ❌", err);
  }
};

// ===== Start Server =====
const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connection OK ✅");

    await db.sequelize.sync({ force: true });
    console.log("Database synced ✅");

    await initRole();

    // ===== Routers =====
    app.use("/api/v1/restaurants", restaurantRouter);
    app.use("/api/v1/auth", authRouter);

    app.get("/", (req, res) => res.send("Restaurant Restful API"));

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server ❌", err);
    process.exit(1);
  }
};

startServer();
