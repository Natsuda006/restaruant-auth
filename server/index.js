import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.routers.js";
import db from "./models/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: Role initialization (uncomment if needed)
// const role = db.Role;
// const initRole = async () => {
//   await role.create({ id: 1, name: "user" });
//   await role.create({ id: 2, name: "moderator" });
//   await role.create({ id: 3, name: "admin" });
// };
// db.sequelize.sync({ force: true }).then(async () => {
//   console.log("Database synced");
//   await initRole();
// });

app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
