const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require('./user');
const WorkoutRoutine = require('./workoutRoutine');


class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // workout_routine_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },

  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    modelName: "like",
  }
);

module.exports = Like;
