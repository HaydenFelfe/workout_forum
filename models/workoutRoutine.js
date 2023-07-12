const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Like = require('./like');
const Comment = require('./comment');
const BodyPart = require('./bodyPart')



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
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "workoutRoutine",
  }
);

WorkoutRoutine.hasMany(Like, { foreignKey: "workout_routine_id"});
WorkoutRoutine.hasMany(Comment, { foreignKey: "workout_routine_id" });
WorkoutRoutine.belongsToMany(BodyPart, {
through: "WorkoutRoutineBodyPart",
foreignKey: "workout_routine_id",
});

module.exports = WorkoutRoutine;
