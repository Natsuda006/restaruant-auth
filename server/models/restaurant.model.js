import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,   // แก้จาก autoincrement เป็น autoIncrement
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,       // แก้จาก allNull เป็น allowNull
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,       // แก้จาก allNull เป็น allowNull
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,       // แก้จาก allNull เป็น allowNull
  },
});

// สร้างตาราง (ถ้าไม่มี) โดยไม่ลบทิ้ง (force: false)
Restaurant.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });

export default Restaurant;   // แก้ชื่อที่ export ให้ตรงกับ const
