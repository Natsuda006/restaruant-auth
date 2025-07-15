import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Restaurant = sequelize.define("restaurant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,   // <-- แก้จาก allNull เป็น allowNull
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,   // <-- แก้จาก allNull เป็น allowNull
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,   // <-- แก้จาก allNull เป็น allowNull
  },
});

// สร้างตาราง ถ้ายังไม่มี หรือถ้ามีแล้วจะลบทิ้งและสร้างใหม่ (force:true)
Restaurant.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });

export default Restaurant;
