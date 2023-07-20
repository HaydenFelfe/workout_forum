const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Like = require('./like');
const Comment = require('./comment');
const User = require('./user');



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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
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
