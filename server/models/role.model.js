import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

// Role.sync({ force: false })
//   .then(() => {
//     return Promise.all([
//       Role.create({ id: 1, name: "user", email: "user@example.com" }),
//       Role.create({ id: 2, name: "moderator", email: "moderator@example.com" }),
//       Role.create({ id: 3, name: "admin", email: "admin@example.com" }),
//     ]);
//   })
//   .catch((error) => {
//     console.log("Error creating table", error);
//   });

export default Role;
