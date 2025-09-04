import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.routers.js";
import sequelize from "./models/db.js";
import Role from "./models/role.model.js";

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://restaruant-auth3.vercel.app";


app.use(cors({
  origin: ["http://localhost:5173", FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const initRole = async () => {
  try {
    const roles = ["user", "moderator", "admin"];
    for (let i = 0; i < roles.length; i++) {
      await Role.findOrCreate({ where: { name: roles[i] }, defaults: { id: i + 1 } });
    }
    console.log("Roles created.");
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

sequelize.sync({ alter: true }).then(async () => {
  console.log("Database synced");
  await initRole();
});


app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
