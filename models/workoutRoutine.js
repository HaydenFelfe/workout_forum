const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Like = require('./like');
const Comment = require('./comment');



class WorkoutRoutine extends Model {}

WorkoutRoutine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bodyPart: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "workoutRoutine",
  }
);



module.exports = WorkoutRoutine;
