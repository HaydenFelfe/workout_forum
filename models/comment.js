const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');
const WorkoutRoutine = require('./workoutRoutine');
const User = require('./user');


class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    workout_routine_id: {
      type: DataTypes.INTEGER,
      allowNUll: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

Comment.belongsTo(User, {foreignKey: "user_id"});
Comment.belongsTo(WorkoutRoutine, { foreignKey: 'workout_routine_id'});

module.exports = Comment;
