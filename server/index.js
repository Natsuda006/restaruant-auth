import express from "express";
import dotenv from "dotenv";

import router from r
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Restaurant Restful API');
});

// ใช้ router
app.use("/api/v1/restaurant", restaurantRouter);

app.listen(PORT, () => {
  console.log("listening to http://localhost:" + PORT);
});
