import express from "express";
const app = express();
import dotenv from "dotenv";
feature/authentication
dotenv.config();
const PORT = process.env.PORT || 5000;
import restaurantRouter from "./routers/restaurant.router.js";
import authRouter from "./routers/auth.routers.js";
import cors from "cors";

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "x-access-token"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import db from "./models/index.js";
const role = db.Role;

const initRole = async () => {

   role.create({ id: 1, name: "user" });
   role.create({ id: 2, name: "moderator" });
   role.create({ id: 3, name: "admin" });

};

// db.sequelize.sync({ force: true }).then(async () => {  // ใช้ force: true เพื่อสร้างตารางใหม่ (ถ้าอยากล้างข้อมูลเก่า)
//   console.log("Database synced");
//    initRole();  // เรียกใช้และรอสร้าง role
//  });


dotenv.config()
const PORT = process.env.PORT || 5000;
import restaurantRouter from "./routers/restaurant.router.js"
import cors from "cors"
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

 main
app.get("/", (req, res) => {
  res.send("Restaurant Restful API");
});

 feature/authentication
// use routers
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});

//use router
app.use("/api/v1/restaurants", restaurantRouter);

app.listen(PORT,()=>{
    console.log("Listening to http://localhost:" + PORT);
})
 main
