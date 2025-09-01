import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./models/index.js";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.routers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL;

// CORS setup
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
if (FRONTEND_URL) allowedOrigins.push(FRONTEND_URL);

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize roles
const role = db.Role;
const initRole = async () => {
  await Promise.all([
    role.create({ id: 1, name: "user" }),
    role.create({ id: 2, name: "moderator" }),
    role.create({ id: 3, name: "admin" }),
  ]);
};

// Start server with DB sync
const startServer = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synced");

    await initRole();
    console.log("Roles initialized");

    // Routers
    app.use("/api/v1/restaurants", restaurantRouter);
    app.use("/api/v1/auth", authRouter);

    app.get("/", (req, res) => {
      res.send("Restaurant Restful API");
    });

    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
